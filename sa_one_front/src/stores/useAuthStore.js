import { create } from "zustand";

function roleNameToRoleId(role) {
    if (role === "ADMIN" || role === "ROLE_ADMIN") return 1;
    if (role === "OWNER" || role === "ROLE_OWNER") return 2;
    return 3;
}

export const useAuthStore = create((set) => ({
    accessToken: localStorage.getItem("accessToken") || null,
    role: localStorage.getItem("role") || null,
    roleId: localStorage.getItem("roleId") ? Number(localStorage.getItem("roleId")) : null,
    isLoggedIn: !!localStorage.getItem("accessToken"),

    login: (token, roleName) => {
        const rid = roleNameToRoleId(roleName);

        localStorage.setItem("accessToken", token);
        localStorage.setItem("role", roleName);
        localStorage.setItem("roleId", String(rid));

        set({
            accessToken: token,
            role: roleName,
            roleId: rid,
            isLoggedIn: true,
        });
    },

    logout: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("role");
        localStorage.removeItem("roleId");
        set({ accessToken: null, role: null, roleId: null, isLoggedIn: false });
    },
}));