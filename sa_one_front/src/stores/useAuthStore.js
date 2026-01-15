import { create } from "zustand";

// 로그인 상태 보관함
export const useAuthStore = create((set) => ({
    // 초기 상태. localStorage 에 토큰이 있는지 확인해서 있으면 true, 없으면 false
    isLoggedIn: !!localStorage.getItem("accessToken"),

    // 역할(role) 상태 추가 (새로고침을 해도 역할을 읽어서 각자의 메뉴를 유지할 수 있게.)
    userRole: localStorage.getItem("userRole") || null,

    // 로그인 상태로 변경 => 토큰과 역할을 함께 받기
    login: (token, role) => {
        localStorage.setItem("accessTokne", token);
        localStorage.setItem("userRole", role); // 역할 저장
        set({
            isLoggedIn: true,
            userRole: role
        });
    },

    // 반대로 로그아웃 상태로 변경 => 역할 정보 삭제
    logout: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userRole");
        set({ 
            isLoggedIn: false,
            userRole: null
        });
    },
}));