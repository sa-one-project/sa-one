import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import Home from "../home/Home"; 

/**
 * 서비스 전체의 인증 라우팅을 관리하는 컴포넌트
 * 로그인 여부(토큰)에 따라 접근 가능한 페이지를 분기 처리함
 */
function AuthRoute() {
    const { pathname } = useLocation();
    
    // 로컬 스토리지에서 인증 토큰 확인
    const hasToken = localStorage.getItem("AccessToken");

    useEffect(() => {
        /**
         * 이미 로그인된 사용자가 로그인/회원가입 페이지로 접근할 경우
         * 강제로 메인('/') 페이지로 이동시켜 중복 인증 방지
         */
        if (hasToken && pathname.startsWith("/auth")) {
            window.location.replace("/");
        }
    }, [pathname, hasToken]);

    /**
     * 1. 비로그인 상태 (토큰 없음)
     * 인증이 필요한 페이지 접근 시 로그인 페이지로 유도하거나, 
     * /auth 관련 경로만 오픈함
     */
    if (!hasToken) {
        return (
            <Routes>
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/signup" element={<SignUp />} />
                {/* 인증되지 않은 모든 접근은 로그인 페이지로 리다이렉트 */}
                <Route path="*" element={<Login />} />
            </Routes>
        );
    }

    /**
     * 2. 로그인 완료 상태 (토큰 존재)
     * 메인 페이지 및 서비스 내부 페이지 렌더링
     */
    return (
        <Routes>
            {/* 기본 루트 경로를 Home 컴포넌트에 연결 */}
            <Route path="/" element={<Home />} />
            {/* 정의되지 않은 경로 접근 시 홈으로 이동 */}
            <Route path="*" element={<Home />} />
        </Routes>
    );
}

export default AuthRoute;