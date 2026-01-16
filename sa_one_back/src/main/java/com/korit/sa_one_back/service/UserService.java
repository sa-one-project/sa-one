package com.korit.sa_one_back.service;

import com.korit.sa_one_back.dto.request.OAuth2SignUpReqDto;
import com.korit.sa_one_back.dto.request.SignInReqDto;
import com.korit.sa_one_back.dto.request.SignUpReqDto;
import com.korit.sa_one_back.dto.request.UpdateMyPageReqDto;
import com.korit.sa_one_back.dto.response.UserMeRespDto;
import com.korit.sa_one_back.entity.UserEntity;
import com.korit.sa_one_back.jwt.JwtTokenProvider;
import com.korit.sa_one_back.mapper.MyPageMapper;
import com.korit.sa_one_back.mapper.UserMapper;
import com.korit.sa_one_back.security.PrincipalUser;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService extends DefaultOAuth2UserService {

    private final UserMapper userMapper;
    private final JwtTokenProvider jwtTokenProvider;
    private final BCryptPasswordEncoder passwordEncoder;
    private final MyPageMapper myPageMapper;

//    public void createOauth2User(OAuth2SignUpReqDto dto) {
//        UserEntity user = UserEntity.builder()
//                .oauth2Id(dto.getOauth2Id())
//                .provider(dto.getProvider())
//                .name(dto.getName())
//                .email(dto.getEmail())
//                .imgUrl(dto.getImgUrl())
//                .imgPath(null)
//                .roleId(dto.getRoleId()) // 사장/직원
//                .build();
//
//        userMapper.insert(user);
//    }
//
//    public void createLocalUser(SignUpReqDto dto) {
//        UserEntity userEntity = dto.toEntity(passwordEncoder);
//        userMapper.insert(userEntity);
//    }

    // Local 회원 생성
    public void createLocalUser(SignUpReqDto dto) {
        UserEntity user = dto.toLocalEntity(passwordEncoder);
        userMapper.insertLocalUser(user);
    }

    // OAuth2 회원 생성
    public void createOauth2User(OAuth2SignUpReqDto dto) {
        String password = UUID.randomUUID().toString();
        String encodedPassword = passwordEncoder.encode(password);
        UserEntity user = dto.toOauth2Entity(encodedPassword);
        userMapper.insertOauth2User(user);
    }

    public String signin(SignInReqDto dto) {
        final String username = dto.getUsername();
        final String password = dto.getPassword();
        final String defaultMessage = "사용자 정보를 확인하세요.";

        UserEntity foundUser = userMapper.findUserByUsername(username);
        if (foundUser == null) {
            throw new UsernameNotFoundException(defaultMessage);
        }
        if (!passwordEncoder.matches(password, foundUser.getPassword())) {
            throw new BadCredentialsException(defaultMessage);
        }
        // 토큰 생성
        final String accessToken = jwtTokenProvider.createToken(foundUser);

        return accessToken;
    }

    public void delete(long userId) throws IllegalAccessException {
        UserEntity user = userMapper.findByUserId(userId);

        if (user == null || user.isDeleted()) {
            throw new IllegalAccessException("이미 탈퇴한 사용자 입니다.");
        }

        userMapper.softDelete(userId);
    }

    public UserMeRespDto getMyPage(Long userId, Long storeId) {

        // 공통 유저 정보
        UserEntity user = userMapper.findByUserId(userId);

        // role 이름 (OWNER / MANAGER / EMPLOYEE)
        String roleName = userMapper.findRoleNameByUserId(userId);

        // role별 추가 정보 (기본 null)
        UserMeRespDto.EmployeeInfo employeeInfo = null;
        UserMeRespDto.OwnerInfo ownerInfo = null;

        // 직원인 경우
        if ("EMPLOYEE".equals(roleName)) {
            employeeInfo = myPageMapper.findEmployeeInfoByUserId(userId);

            // 사장 / 매니저인 경우
        } else if ("OWNER".equals(roleName) || "MANAGER".equals(roleName)) {

            // (1) 내 사업장 목록
            List<UserMeRespDto.StoreInfo> storeList =
                    myPageMapper.findMyStoreList(userId);

            // (2) 선택된 storeId 결정
            // - 프론트에서 storeId 안 주면 첫 번째 매장 자동 선택
            Long resolvedStoreId = storeId;
            if (resolvedStoreId == null) {
                resolvedStoreId = myPageMapper.findFirstStoreId(userId);
            }

            // (3) 선택된 사업장 상세
            UserMeRespDto.StoreInfo selectedStore = null;
            if (resolvedStoreId != null) {
                selectedStore =
                        myPageMapper.findMyStoreDetail(userId, resolvedStoreId);
            }

            ownerInfo = UserMeRespDto.OwnerInfo.builder()
                    .storeList(storeList)
                    .selectedStore(selectedStore)
                    .build();
        }
        // 최종 응답 DTO 조립
        return UserMeRespDto.builder()
                .userId(user.getUserId())
                .role(roleName)
                .username(user.getUsername())

                .email(user.getEmail())
                .phone(user.getPhone())
                .imgUrl(user.getImgUrl())

                .name(user.getName())
                .gender(user.getGender())
                .birthDate(user.getBirthDate())

                .employeeInfo(employeeInfo)
                .ownerInfo(ownerInfo)
                .build();
    }

    // 마이페이지 수정

    public void updateMyPage(Long userId, UpdateMyPageReqDto updateMyPageReqDto) {

        UserEntity user = userMapper.findByUserId(userId);

        if (user == null) {
            throw new RuntimeException("존재하지 않는 사용자 입니다");

        }

        UserEntity updateUser = updateMyPageReqDto.toEntity(user);

        int result = userMapper.updateMyPage(updateUser);

        if(result == 0 ) {
            throw new RuntimeException("회원 정보 수정 실패");
        }
    }
}

