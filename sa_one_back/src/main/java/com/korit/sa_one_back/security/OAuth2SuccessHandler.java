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
