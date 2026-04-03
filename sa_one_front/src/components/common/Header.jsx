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

    // 관리자(1)=파랑 / 사장(2), 직원(3)=보라
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
                        {Number(roleId) === 1 && (
                            <>
                                <Link 
                                    to="/admin/dashboard"
                                    style={getActiveStyle("/admin/dashboard")}
                                >
                                    관리자 대시보드
                                </Link>

                                <Link 
                                    to="/admin/inquiries"
                                    style={getActiveStyle("/admin/inquiries")}
                                >
                                    문의함
                                </Link>
                            </>
                        )}

                        {Number(roleId) === 2 && (
                            <>
                                <Link 
                                    to="/signup/employee"
                                    style={getActiveStyle("/signup/employee")}
                                >
                                    직원 추가
                                </Link>

                                <Link 
                                    to="/owner/inquiries"
                                    style={getActiveStyle("/owner/inquiries")}
                                >
                                    문의함
                                </Link>
                            </>
                        )}

                        {Number(roleId) === 3 && (
                            <Link 
                                to="/employee/inquiries"
                                style={getActiveStyle("/employee/inquiries")}
                            >
                                문의함
                            </Link>
                        )}

                        <Link to="/calendar" style={getActiveStyle("/calendar")}>직원 캘린더</Link>
                        <Link to="/status" style={getActiveStyle("/status")}>출근 현황</Link>
                        <Link to="/salary" style={getActiveStyle("/salary")}>급여명세서</Link>
                        <Link to="/mypage" style={getActiveStyle("/mypage")}>마이페이지</Link>
                        
                        <button onClick={handleLogout} className="logout-btn">
                            로그아웃
                        </button>
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