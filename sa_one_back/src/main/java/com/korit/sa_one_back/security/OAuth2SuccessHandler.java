package com.korit.sa_one_back.security;

import com.korit.sa_one_back.config.FrontendConfig;
import com.korit.sa_one_back.jwt.JwtTokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;
    private final FrontendConfig frontendConfig;
    private final String baseurl;

    public OAuth2SuccessHandler(JwtTokenProvider jwtTokenProvider, FrontendConfig frontendConfig, @Value("${app.frontend.baseurl}") String baseurl) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.frontendConfig = frontendConfig;
        this.baseurl = baseurl;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication)
            throws IOException {

        PrincipalUser principal = (PrincipalUser) authentication.getPrincipal();

        String baseurl = frontendConfig.getBaseurl();

        // 이미 가입된 사용자
        if (principal.isRegistered()) {
            String token = jwtTokenProvider.createToken(principal.getUser());
            response.sendRedirect(
                    baseurl + "/auth/login/oauth2?accessToken=" + token
            );
            return;
        }

        // 신규 OAuth2 사용자
        response.sendRedirect(
                baseurl + "/auth/signup/oauth2"
        );
    }
}
