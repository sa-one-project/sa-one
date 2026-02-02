package com.korit.sa_one_back.service;

import com.korit.sa_one_back.dto.request.*;
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
    private final MailService mailService;

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

    public void deleteUser(long userId, String rawPassword) throws IllegalAccessException {
        UserEntity user = userMapper.findByUserId(userId);

        if (user == null || user.isDeleted()) {
            throw new IllegalAccessException("이미 탈퇴한 사용자 입니다.");
        }

        boolean isOauthUser = user.getProvider() != null && !user.getProvider().isBlank()
                && user.getOauth2Id() != null && !user.getOauth2Id().isBlank();

        // Local 유저면 비번 검증
        if (!isOauthUser) {
            if (rawPassword == null || rawPassword.isBlank()) {
                throw new BadCredentialsException("비밀번호를 입력해주세요.");
            }
            if (user.getPassword() == null || !passwordEncoder.matches(rawPassword, user.getPassword())) {
                throw new BadCredentialsException("비밀번호가 일치하지 않습니다.");
            }
        }

        int result = userMapper.softDelete(userId);
        if (result == 0) {
            throw new IllegalAccessException("회원탈퇴 처리 실패");
        }
    }

    /**
     * 마이페이지 정보 조회 (사장 / 직원 공통)
     * 1) userId로 user_tb 조회 (공통 정보)
     * 2) role_tb join해서 role_name 조회
     * 3) role에 따라 필요한 정보만 추가 조회
     * - EMPLOYEE → employeeInfo
     * - OWNER / MANAGER → ownerInfo (매장 목록 + 선택 매장)
     * 4) 하나의 Response DTO로 조립해서 반환
     */
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

    /**
     * 마이페이지 수정

     * 1) 로그인 userId를 서버에서 확정한다 (프론트가 바꾸게 두면 안 됨)
     * 2) PATCH이므로 넘어온 값만 Entity에 담는다
     * 3) mapper update 실행
     * 4) 반영된 row가 0이면 예외(유저 없음 등)
     */
    public void updateMyPage(Long userId, UpdateMyPageReqDto dto) {

        UserEntity user = new UserEntity();
        user.setUserId(userId);

        // PATCH: null/빈문자면 수정하지 않도록 mapper에서 if 처리함
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());
        user.setImgUrl(dto.getImgUrl());

        int result = userMapper.updateMyPage(user);

        if (result == 0) {
            throw new RuntimeException("회원 정보 수정에 실패했습니다.");
        }
    }

    public void findUsernameAndSendMail(FindUsernameReqDto dto) {
        String username = userMapper.findUsernameByNameAndEmail(dto.getName(), dto.getEmail());

        if (username == null || username.isBlank()) return;

        String masked = maskingUsername(username);
        mailService.sendMarkedUsername(dto.getEmail(), masked);
    }

    private String maskingUsername(String username) {
        int n = username.length();
        if (n <= 1) return "*";
        if (n == 2) return username.charAt(0) + "*";
        if (n <= 4) return username.substring(0, 1) + "**" + username.substring(n - 1);
        return username.substring(0,2) + "***" + username.substring(n - 2);
    }
}

