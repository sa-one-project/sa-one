import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import Home from "../home/Home"; 

function AuthRoute() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<SignUp />} />
            <Route path="*" element={<Home />} />
        </Routes>
    );
}

export default AuthRoute;