import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import Home from "./home/Home";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* 로그인 하지 않은 사용자도 볼 수 있는 메인 */}
                <Route path="/" element={<Home />} />

                {/* 로그인, 회원가입 페이지 */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;