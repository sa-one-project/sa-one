package com.korit.sa_one_back.service;

import com.korit.sa_one_back.entity.UserEntity;
import com.korit.sa_one_back.mapper.UserMapper;
import com.korit.sa_one_back.security.PrincipalUser;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class OAuth2UserService extends DefaultOAuth2UserService {

    private final UserMapper userMapper;

    @Override
    public PrincipalUser loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oauth2User = super.loadUser(userRequest);

        String provider = userRequest.getClientRegistration().getRegistrationId().toUpperCase();

        OAuthInfo info = extractOAuthInfo(provider, oauth2User.getAttributes());

        UserEntity user = userMapper.findByOauth2IdAndProvider(provider, info.oauth2Id);

        return new PrincipalUser(
                oauth2User.getAttributes(),
                info.oauth2Id,
                provider,
                info.email,
                info.name,
                user // null 가능 (미가입)
        );
    }

    private OAuthInfo extractOAuthInfo(String provider, Map<String, Object> attrs) {
        String oauth2Id = null;
        String email = null;
        String name = null;

        if ("GOOGLE".equals(provider)) {
            oauth2Id = str(attrs.get("sub"));
            email = str(attrs.get("email"));
            name = str(attrs.get("name"));
        } else if ("KAKAO".equals(provider)) {
            oauth2Id = str(attrs.get("id"));

            Map<String, Object> kakaoAccount = map(attrs.get("kakao_account"));
            if (kakaoAccount != null) {
                email = str(kakaoAccount.get("email"));

                Map<String, Object> profile = map(kakaoAccount.get("profile"));
                if (profile != null) name = str(profile.get("nickname"));
            }

            if (name == null) {
                Map<String, Object> props = map(attrs.get("properties"));
                if (props != null) name = str(props.get("nickname"));
            }
        } else if ("NAVER".equals(provider)) {
            Map<String, Object> resp = map(attrs.get("response"));
            if (resp != null) {
                oauth2Id = str(resp.get("id"));
                email = str(resp.get("email"));
                name = str(resp.get("name"));
            }
        } else {
            // fallback: 가능한 키를 최대한 시도
            oauth2Id = str(attrs.get("sub"));
            if (oauth2Id == null) oauth2Id = str(attrs.get("id"));
            email = str(attrs.get("email"));
            name = str(attrs.get("name"));
        }

        if (oauth2Id == null || oauth2Id.isBlank()) {
            throw new OAuth2AuthenticationException("Missing oauth2Id for provider=" + provider);
        }

        return new OAuthInfo(oauth2Id, email, name);
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> map(Object o) {
        return (o instanceof Map) ? (Map<String, Object>) o : null;
    }

    private String str(Object o) {
        return o == null ? null : String.valueOf(o);
    }

    private static class OAuthInfo {
        final String oauth2Id;
        final String email;
        final String name;

        OAuthInfo(String oauth2Id, String email, String name) {
            this.oauth2Id = oauth2Id;
            this.email = email;
            this.name = name;
        }
    }
}
