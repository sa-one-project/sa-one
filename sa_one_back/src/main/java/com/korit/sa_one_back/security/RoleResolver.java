package com.korit.sa_one_back.security;

import org.springframework.stereotype.Component;

@Component
public class RoleResolver {

    public String resolveRoleName(long roleId) {
        return RoleType.fromId(roleId).getRoleName();
    }
}
