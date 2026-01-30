package com.korit.sa_one_back.security;

import lombok.Getter;

public enum RoleType {
    ADMIN(1, "ROLE_ADMIN"),
    OWNER(2, "ROLE_OWNER"),
    STAFF(3, "ROLE_STAFF"),
    GUEST(0, "ROLE_GUEST");

    private final int id;
    @Getter
    private final String roleName;

    RoleType(int id, String roleName) {
        this.id = id;
        this.roleName = roleName;
    }

    public static RoleType fromId(long id) {
        for (RoleType role : values()) {
            if (role.id == id) return role;
        }
        return GUEST;
    }

    public long getId() {
        return id;
    }
}
