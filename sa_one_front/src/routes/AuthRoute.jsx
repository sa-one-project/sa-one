import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import Home from "../home/Home"; 

import { useMeQuery } from "../react-query/queries/usersQueries";

function AuthRoute() {
    const navigate = useNavigate(); 
    const location = useLocation();
    const { pathname } = location;
    const meQuery = useMeQuery();

    useEffect(() => {
        const { isLoading, data } = meQuery;
        const hasToken = localStorage.getItem("AccessToken");

        // 로딩 다 끝났을 때만 돌게 함
        if (!isLoading) {
            // 토큰도 없고 서버 status도 200 아니면 로그인 안 된 거니까 로그인 페이지로 튕김
            if (!hasToken && data?.status !== 200) {
                // 주소가 /auth로 시작 안 할 때만 navigate 시킴 (무한 루프 방지)
                if (!pathname.startsWith("/auth")) {
                    navigate("/auth/login", { replace: true });
                }
            } 
            // 로그인 되어 있으면 /auth 쪽 주소 못 들어가게 막고 메인으로 보냄
            else {
                if (pathname.startsWith("/auth")) {
                    navigate("/", { replace: true });
                }
            }
        }
    }, [pathname, meQuery.data, meQuery.isLoading, navigate]);

    // 로딩 중일 땐 그냥 로딩 글자만 띄움
    if (meQuery.isLoading) {
        return <div>로딩 중...</div>;
    }

    const hasToken = localStorage.getItem("AccessToken");

    // 로그인 안 된 상태면 로그인/회원가입 라우트만 열어줌
    if (meQuery.data?.status !== 200 && !hasToken) {
        return (
            <Routes>
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/signup" element={<SignUp />} />
                <Route path="*" element={<Login />} />
            </Routes>
        );
    }

    // 로그인 성공했을 때 보여줄 라우트 (메인 페이지 등)
    return (
        <Routes>
            <Route path="/*" element={<Home />} />
            {/* 이상한 주소로 들어오면 일단 홈으로 던짐 */}
            <Route path="*" element={<Home />} />
        </Routes>
    );
}

export default AuthRoute;