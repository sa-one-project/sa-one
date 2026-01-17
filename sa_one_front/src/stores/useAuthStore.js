import { create } from "zustand";

// 로그인 상태 보관함
export const useAuthStore = create((set) => ({
    // 초기 상태. localStorage 에 토큰이 있는지 확인해서 있으면 true, 없으면 false
    isLoggedIn: !!localStorage.getItem("accessToken"),

    // 역할(role) 상태 추가 (새로고침을 해도 역할을 읽어서 각자의 메뉴를 유지할 수 있게.)
    roleId: localStorage.getItem("roleId") || null,

    // 로그인 상태로 변경 => 토큰과 역할을 함께 받기
    login: (token, roleId) => {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("roleId", roleId); // 역할 저장
        set({
            isLoggedIn: true,
            roleId: roleId
        });
    },

    // 반대로 로그아웃 상태로 변경 => 역할 정보 삭제
    logout: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("roleId");
        set({ 
            isLoggedIn: false,
            roleId: null
        });
    },
}));