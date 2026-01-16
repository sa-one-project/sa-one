import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import Home from "./home/Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import OwnerMain from "./pages/owner/OwnerMain";
import EmployeeMain from "./pages/employee/EmployeeMain";
import MyPage from "./pages/MyPage";


function App() {
    return (
        <BrowserRouter>
            {/* 페이지 상단 */}
            <Header />

            <Routes>
                {/* 로그인 하지 않은 사용자도 볼 수 있는 메인 */}
                <Route path="/" element={<Home />} />

                {/* 로그인, 회원가입 페이지 */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                {/* 사장님, 직원 전용 메인 */}
                <Route path="/owner" element={<OwnerMain />} />
                <Route path="/employee" element={<EmployeeMain />} />

                {/* 사장님, 직원 공용 기능 */}
                <Route path="/mypage" element={<MyPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;