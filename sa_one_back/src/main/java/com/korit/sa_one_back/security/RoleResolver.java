package com.korit.sa_one_back.security;

import org.springframework.stereotype.Component;

@Component
public class RoleResolver {

    public String resolveRoleName(long roleId) {
<<<<<<< HEAD
        if (roleId == 1) return "ROLE_ADMIN"; // 관리자
        if (roleId == 2) return "ROLE_OWNER"; // 사장
        if (roleId == 3) return "ROLE_STAFF"; // 직원
        return "ROLE_GUEST"; // 기본값 (예: role_id가 0이거나 비정상일 때)
=======
        return RoleType.fromId(roleId).getRoleName();
>>>>>>> origin/main
    }
}
