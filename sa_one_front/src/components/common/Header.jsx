/** @jsxImportSource @emotion/react */
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import * as S from "./HeaderStyle";

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const { isLoggedIn, roleId, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        alert("로그아웃 되었습니다.");
        navigate("/");
    };

    // 사장님(roleId === 1)이면 파란색, 그 외(직원)는 보라색 스타일 적용
    const getActiveStyle = (path) => {
        if (location.pathname !== path) return {};
        return { color: Number(roleId) === 1 ? "#599afd" : "#9370DB" };
    };

    return (
        <header css={S.header}>
            <Link to="/" css={S.logo}>SA : ONE</Link> 

            <nav css={S.nav}>
                {isLoggedIn ? (
                    <>
                        {/* 사장님 전용 메뉴 */}
                        {Number(roleId) === 1 && (
                            <Link 
                                to="/signup/employee" 
                                className={location.pathname === "/signup/employee" ? "active" : ""}
                                style={getActiveStyle("/signup/employee")}
                            >
                                직원 추가
                            </Link>
                        )}
                        
                        <Link to="/calendar" className={location.pathname === "/calendar" ? "active" : ""} style={getActiveStyle("/calendar")}>직원 캘린더</Link>
                        <Link to="/status" className={location.pathname === "/status" ? "active" : ""} style={getActiveStyle("/status")}>출근 현황</Link>
                        <Link to="/payrolls" className={location.pathname === "/payrolls" ? "active" : ""} style={getActiveStyle("/payrolls")}>급여명세서</Link>
                        <Link to="/mypage" className={location.pathname === "/mypage" ? "active" : ""} style={getActiveStyle("/mypage")}>마이페이지</Link>
                        
                        <button onClick={handleLogout} className="logout-btn">로그아웃</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">로그인</Link>
                        <Link to="/start" css={S.startBtn}>시작하기</Link>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Header;