import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";

function Header() {
    const navigate = useNavigate();

    // Store 에서 로그인상태, 로그아웃 기능만 빼옴
    const { isLoggedIn, roleId, logout } = useAuthStore();

    // 로그아웃 버튼용. (토큰 지우고 비로그인 메인으로 전송)
    const handleLogout = () => {
        logout(); // 상태 false 로 변경
        alert("로그아웃 되었습니다.");
        navigate("/"); // 메인으로 이동
    };

    return (
        <header>
            {/* 로고 영역 - 나중에 h3 대신 img 태그를 사용해 로고 그림으로 수정 */}
            <Link to="/"><h3>SA-ONE</h3></Link> 

            <nav>
                {isLoggedIn ? (
                    <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                        {/* 사장님 전용 메뉴 */}
                        {roleId === 1 && (
                            <Link to="/signup/employee" style={{ fontWeight: "bold", color: "blue" }}>
                                직원 추가
                            </Link>
                        )}
                        
                        {/* 공통 메뉴 */}
                        <Link to="/calender">직원 캘린더</Link>
                        <Link to="/status">출근 현황</Link>
                        <Link to="/salary">급여명세서</Link>
                        <Link to="/mypage">마이페이지</Link>
                        <button onClick={handleLogout}>로그아웃</button>
                    </div>
                ) : (
                    <div style={{ display: "flex", gap: "15px" }}>
                        <Link to="/login">로그인</Link>
                        {/* 시작하기 버튼의 경로를 /singup => /start (StartPage) 로 변경 */}
                        <Link to="/start">시작하기</Link>
                    </div>
                )}
            </nav>
            {/* 잠깐 구분을 위해 넣어둠... */}
            <hr /> 
        </header>
    );
}

export default Header;