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
import ChatPage from "./pages/chat/ChatPage.jsx";
import PayrollDetailPage from "./pages/payroll/PayrollDetailPage.jsx";
import AdminInquiriesPage from "./pages/inquiries/AdminInquiriesPage.jsx";
import AdminInquiryDetailPage from "./pages/inquiries/AdminInquiryDetailPage.jsx";
import MyInquiriesPage from "./pages/inquiries/MyInquiriesPage.jsx";
import MyInquiryDetailPage from "./pages/inquiries/MyInquiryDetailPage.jsx";
import PayrollListPage from "./pages/payroll/PayrollListPage.jsx";
import AdminRouteGuard from "./routes/AdminRouteGuard.jsx";
import MyInquiryCreatePage from "./pages/inquiries/MyInquiryCreatePage.jsx";
import OAuth2CallbackPage from "./pages/auth/OAuth2CallbackPage.jsx";
import OAuth2SignupPage from "./pages/auth/OAuth2SignupPage.jsx";
import AdminDashboardPage from "./pages/AdminDashboardPage.jsx";

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

                {/* 2. 사장님 전용 페이지 */}
                <Route path="/owner" element={<OwnerMain />} />
                <Route path="/signup/employee" element={<EmployeeAdd />} />
                <Route path="/employee-add" element={<EmployeeAdd />} />

                {/* 3. 직원 전용 페이지 */}
                <Route path="/employee" element={<EmployeeMain />} />
                <Route path="/status" element={<AttendancePage />} />
                <Route path="/calendar" element={<EmployeeCalendarPage />} />
                <Route path="/employee/calendar" element={<EmployeeCalendarPage />} />

                {/* 4. 공통 페이지 */}
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/change-password" element={<PasswordReset />} />

                {/* 5. 추가 기능 (급여 및 채팅) */}
                <Route path="/salary" element={<PayrollDetail />} />
                <Route path="/chat" element={<ChatPage />} />

                <Route path="/payrolls" element={<PayrollListPage />} />
                <Route path="/payrolls/:yyyyMM" element={<PayrollDetailPage />} />
                
                <Route element={<AdminRouteGuard />}>
                    <Route path="/admin/inquiries" element={<AdminInquiriesPage />} />
                    <Route path="/admin/inquiries/:id" element={<AdminInquiryDetailPage />}/>
                </Route>

                <Route path="/employee/inquiries" element={<MyInquiriesPage />} />
                <Route path="/employee/inquiries/new" element={<MyInquiryCreatePage />} />
                <Route path="/employee/inquiries/:id" element={<MyInquiryDetailPage />} />

                <Route path="/owner/inquiries" element={<MyInquiriesPage />} />
                <Route path="/owner/inquiries/new" element={<MyInquiryCreatePage />} />
                <Route path="/owner/inquiries/:id" element={<MyInquiryDetailPage />} />

                <Route path="/oauth2/callback" element={<OAuth2CallbackPage />} />
                <Route path="/oauth2/signup" element={<OAuth2SignupPage />} />

                <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;