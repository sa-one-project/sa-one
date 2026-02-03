package com.korit.sa_one_back.security;

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
    private final String baseurl;

    public OAuth2SuccessHandler(JwtTokenProvider jwtTokenProvider, @Value("${app.frontend.baseurl}") String baseurl) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.baseurl = baseurl;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication)
            throws IOException {

        PrincipalUser principal = (PrincipalUser) authentication.getPrincipal();

        if (principal.isRegistered()) {
            String token = jwtTokenProvider.createToken(principal.getUser());
            response.sendRedirect(baseurl + "/oauth2/callback?accessToken=" + token);
            return;
        }

        String tempToken = jwtTokenProvider.createOAuth2TempToken(
                principal.getOauth2Id(),
                principal.getProvider(),
                principal.getEmail(),
                principal.getName()
        );

        response.sendRedirect(baseurl + "/oauth2/signup?tempToken=" + tempToken);
    }
}
