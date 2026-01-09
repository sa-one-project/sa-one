package com.korit.sa_one_back.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    // 인증 예외 처리
    // 원래라면 에러가 터졌을 때 로그인창으로 보내는데, 404가 뜨면 404 그대로 주고 , 다른 에러면 401에러를 준다
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        if (response.getStatus() == HttpServletResponse.SC_NOT_FOUND) {
            response.sendError(HttpServletResponse.SC_NOT_FOUND);
        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "인증 실패");
        }
    }
}