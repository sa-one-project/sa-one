package com.korit.sa_one_back.security;

import com.korit.sa_one_back.entity.UserEntity;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Map;

@Getter
public class PrincipalUser implements OAuth2User {

    private final Map<String, Object> attributes;
    private final Long userId;
    private final String oauth2Id;
    private final String provider;
    private final String email;

    private final UserEntity user;

    public PrincipalUser(Map<String, Object> attributes,
                         String oauth2Id,
                         String provider,
                         String email,
                         UserEntity user) {

        this.attributes = attributes;
        this.userId = user != null ? user.getUserId() : null;
        this.oauth2Id = oauth2Id;
        this.provider = provider;
        this.email = email;
        this.user = user;
    }

    public boolean isRegistered() {
        return user != null;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (isRegistered()) {
            String role = RoleType.fromId(user.getRoleId());
            return java.util.List.of((GrantedAuthority) () -> role);
        }
        return java.util.List.of((GrantedAuthority) () -> "ROLE_GUEST");
    }

    @Override
    public String getName() {
        return oauth2Id != null ? oauth2Id : "";
    }
}
