import { create } from "zustand";

function roleNameToRoleId(role) {
    if (role === "ADMIN" || role === "ROLE_ADMIN") return 1;
    if (role === "OWNER" || role === "ROLE_OWNER") return 2;
    if (role === "STAFF" || role === "ROLE_STAFF") return 3;
    return 3;
}

function roleIdToRoleName(roleId) {
  if (roleId === 1) return "ADMIN";
  if (roleId === 2) return "OWNER";
  return "STAFF";
}

export const useAuthStore = create((set) => ({
    accessToken: localStorage.getItem("accessToken") || null,
    role: localStorage.getItem("role") || null,
    roleId: localStorage.getItem("roleId") ? Number(localStorage.getItem("roleId")) : null,
    isLoggedIn: !!localStorage.getItem("accessToken"),

    login: (token, roleOrRoleId) => {
        const rid =
            typeof roleOrRoleId === "number"
                ? roleOrRoleId
                : roleNameToRoleId(roleOrRoleId);

        const roleName =
            typeof roleOrRoleId === "number"
                ? roleIdToRoleName(roleOrRoleId)
                : roleOrRoleId;

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