import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";

function Header() {
    const navigate = useNavigate();

    // Store 에서 로그인상태, 로그아웃 기능만 빼옴
    const { isLoggedIn, logout } = useAuthStore();

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
                {/* 로그인 상태에 따라 메뉴를 다르게 보여줌 */}
                {isLoggedIn ? (
                    // 로그인 후 사장/직원 공통 메뉴 (피그마 기반)
                    <>
                        {/* 사장(OWNER)인 경우에만 추가로 보여짐 */}
                        {role === "OWNER" && (
                            <Link to="/signup/employee">직원 추가</Link>
                        )}
                        
                        <Link to="/calender">직원 캘린더</Link>
                        <Link to="/status">출근 현황</Link>
                        <Link to="/salary">급여명세서</Link>
                        <Link to="/mypage">마이페이지</Link>
                        <button onClick={handleLogout}>로그아웃</button>
                    </>
                ) : (
                    // 비로그인 메인 화면 메뉴 (피그마 기반)
                    <>
                        <Link to="/login">로그인</Link>
                        {/* 시작하기 버튼은 바로 회원가입 페이지로 연결 */}
                        <Link to="/signup">시작하기</Link>
                    </>
                )}
            </nav>
            {/* 잠깐 구분을 위해 넣어둠... */}
            <hr /> 
        </header>
    );
}

export default Header;