package com.korit.sa_one_back.service;

import com.korit.sa_one_back.dto.request.OAuth2SignUpReqDto;
import com.korit.sa_one_back.dto.request.SignInReqDto;
import com.korit.sa_one_back.dto.request.SignUpReqDto;
import com.korit.sa_one_back.entity.UserEntity;
import com.korit.sa_one_back.jwt.JwtTokenProvider;
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

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService extends DefaultOAuth2UserService {

    private final UserMapper userMapper;
    private final JwtTokenProvider jwtTokenProvider;
    private final BCryptPasswordEncoder passwordEncoder;

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
        userMapper.insertUser(user);
    }

    // OAuth2 회원 생성
    public void createOauth2User(OAuth2SignUpReqDto dto) {
        String password = UUID.randomUUID().toString();
        String encodedPassword = passwordEncoder.encode(password);
        UserEntity user = dto.toOauth2Entity(encodedPassword);
        userMapper.insertUser(user);
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
}

