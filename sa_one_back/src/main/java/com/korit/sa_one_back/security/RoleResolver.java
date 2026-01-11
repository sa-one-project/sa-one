package com.korit.sa_one_back.security;

import org.springframework.stereotype.Component;

/**
 * ✅ Spring Security는 권한을 문자열로 관리하는 게 일반적임
 * - 예: ROLE_OWNER, ROLE_STAFF
 *
 * ✅ 근데 너 DB는 role_id(숫자)만 있음
 * => 그래서 서버에서 숫자를 문자열로 "변환"하는 도구가 필요함
 *
 * ⚠️ 여기 role_id 값(1,2)은 너희 DB/정책에 맞게 수정하면 됨
 */
@Component
public class RoleResolver {

    public String resolveRoleName(long roleId) {
        if (roleId == 1L) return "ROLE_OWNER"; // 사장
        if (roleId == 2L) return "ROLE_STAFF"; // 직원
        return "ROLE_GUEST"; // 기본값 (예: role_id가 0이거나 비정상일 때)
    }
}
