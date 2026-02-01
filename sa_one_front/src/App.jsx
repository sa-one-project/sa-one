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
import PayrollDetail from "./pages/PayrollDetail.jsx";

// 헤더 노출 여부를 제어하는 별도의 컴포넌트
function HeaderWrapper() {
    const location = useLocation();
    
    // 헤더를 지우고 싶은 경로
    const hideHeaderPaths = ["/start"]; 
    
    if (hideHeaderPaths.includes(location.pathname)) {
        return null;
    }

    return <Header />;
}

function App() {
    return (
        <BrowserRouter>
            <HeaderWrapper />

            <Routes>
                {/* 1. 메인 및 기본 페이지 */}
                <Route path="/" element={<Home />} />
                <Route path="/start" element={<StartPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                {/* 2. 사장님 전용 페이지 (콘솔 에러 발생했던 경로 수정) */}
                <Route path="/owner" element={<OwnerMain />} />
                <Route path="/signup/employee" element={<EmployeeAdd />} /> {/* 에러 해결용 */}
                <Route path="/employee-add" element={<EmployeeAdd />} />     {/* 기존 경로 유지 */}

                {/* 3. 직원 전용 페이지 */}
                <Route path="/employee" element={<EmployeeMain />} />
                <Route path="/status" element={<AttendancePage />} />
                <Route path="/calendar" element={<EmployeeCalendarPage />} />
                <Route path="/employee/calendar" element={<EmployeeCalendarPage />} />

                {/* 4. 공통 페이지 */}
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/change-password" element={<PasswordReset />} />

                {/* 5. 급여 명세서 */}
                <Route path="/salary" element={<PayrollDetail />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;