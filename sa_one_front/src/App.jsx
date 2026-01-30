import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/common/Header";
import Home from "./home/Home.jsx";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import OwnerMain from "./pages/owner/OwnerMain";
import EmployeeMain from "./pages/employee/EmployeeMain";
import MyPage from "./pages/MyPage";
import EmployeeAdd from "./pages/auth/EmployeeAdd";
import StartPage from "./pages/auth/StartPage";
import AttendancePage from "./pages/employee/AttendancePage";
import EmployeeCalendarPage from "./pages/employee/EmployeeCalendarPage";
import PasswordReset from "./pages/auth/PasswordReset";
import ChatPage from "./pages/chat/ChatPage.jsx";

// 헤더 노출 여부를 제어하는 별도의 컴포넌트
function HeaderWrapper() {
    const location = useLocation();
    
    // 헤더를 지우고 싶은 경로를 여기에 등록
    const hideHeaderPaths = ["/start"]; 
    
    // 현재 경로가 숨김 리스트에 포함되어 있으면 null을 반환해서 안 보이게 함
    if (hideHeaderPaths.includes(location.pathname)) {
        return null;
    }

    return <Header />;
}


function App() {
    return (
        <BrowserRouter>
            {/* 페이지 상단 */}
            <HeaderWrapper />

            <Routes>
                {/* 로그인 하지 않은 사용자도 볼 수 있는 메인 */}
                <Route path="/" element={<Home />} />

                {/* 시작하기 버튼을 눌렀을 때의 선택 페이지 (헤더 숨김) */}
                <Route path="/start" element={<StartPage />} />
 
                {/* 로그인, 회원가입 페이지 */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                {/* 사장님, 직원 전용 메인 */}
                <Route path="/owner" element={<OwnerMain />} />
                <Route path="/employee" element={<EmployeeMain />} />

                {/* 사장님, 직원 공용 기능 */}
                <Route path="/mypage" element={<MyPage />} />
                {/* ★ 비밀번호 변경 경로 추가 */}
                <Route path="/change-password" element={<PasswordReset />} />

                {/* 사장님 전용 기능 (직원 추가) */}
                <Route path="employee-add" element={<EmployeeAdd />} />

                {/* 직원 전용 기능 (출근 페이지) */}
                <Route path="/status" element={<AttendancePage />} />

                {/* 직원 전용 기능 (캘린더 페이지) 추가 */}
                <Route path="/employee/calendar" element={<EmployeeCalendarPage />} />

                <Route path="/chat" element={<ChatPage />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;