package com.korit.sa_one_back.security;

import com.korit.sa_one_back.entity.User;
import com.korit.sa_one_back.jwt.JwtTokenProvider;
import com.korit.sa_one_back.service.UserService;
import jakarta.servlet.ServletException;
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
    private final UserService userService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        // 로그인하면 이까지 넘어옴
        System.out.println(authentication);
//        DefaultOAuth2User oAuth2User = (DefaultOAuth2User) authentication.getPrincipal();
//        oAuth2User.getAttributes().get("id");
        // 이 과정을 getName으로 압축시킴
        User foundUser = userService.findUserByOauth2Id(authentication.getName());

        // 데이터베이스에서 User 정보 조회
//        User foundUser = User.builder()
//                .userId(10)
//                .build();
        if (foundUser == null) {
            // 회원가입
            foundUser = userService.createUser(authentication);
        }
        String accessToken = jwtTokenProvider.createToken(foundUser);
        response.sendRedirect("http://localhost:5173/auth/login/oauth2?accessToken=" + accessToken);
    }
}