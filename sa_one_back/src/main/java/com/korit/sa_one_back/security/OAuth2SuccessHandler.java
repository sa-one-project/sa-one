package com.korit.sa_one_back.security;

import com.korit.sa_one_back.entity.UserEntity;
import com.korit.sa_one_back.jwt.JwtTokenProvider;
import com.korit.sa_one_back.mapper.UserMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserMapper userMapper;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication)
            throws IOException {

//        PrincipalUser principalUser = (PrincipalUser) authentication.getPrincipal();
//        UserEntity oauthUser = principalUser.getUser();
//
//        // 1️⃣ DB에 이미 있는 소셜 유저인지 확인
//        UserEntity foundUser =
//                userMapper.findByOauth2IdAndProvider(oauthUser);
//
//        if (foundUser != null) {
//            // 2️⃣ 이미 가입됨 → JWT 발급 → 로그인 완료
//            String token = jwtTokenProvider.createToken(foundUser);
//            response.sendRedirect(
//                    "http://localhost:5173/auth/login/oauth2?accessToken=" + token
//            );
//            return;
//        }
//
//        // 3️⃣ 신규 유저 → 가입유형 선택 필요
//        // (프론트에서 roleId 선택 후 /api/auth/oauth2/signup 호출)
//        response.sendRedirect(
//                "http://localhost:5173/auth/signup/oauth2"
//        );

        PrincipalUser principal = (PrincipalUser) authentication.getPrincipal();

        // 이미 가입된 사용자
        if (principal.isRegistered()) {
            String token = jwtTokenProvider.createToken(principal.getUser());
            response.sendRedirect(
                    "http://localhost:5173/auth/login/oauth2?accessToken=" + token
            );
            return;
        }

        // 신규 OAuth2 사용자
        response.sendRedirect(
                "http://localhost:5173/auth/signup/oauth2"
        );
    }
}
