/** @jsxImportSource @emotion/react */
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import * as S from "./styles"; 

function Login() {
    const navigate = useNavigate();
    const { login } = useAuthStore();

    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    });

    const [selectedRole, setSelectedRole] = useState("owner");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({...loginData, [name]: value});
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:8080/api/auth/local/signin", loginData);
            if (response.status === 200) {
                const { accessToken, user } = response.data;
                // 백엔드에서 user 객체를 안 줄 경우를 대비한 방어 코드
                const roleId = user ? user.roleId : (selectedRole === "owner" ? 1 : 2);

                console.log("로그인한 사용자의 roleId:", roleId);

                // 역할 검증 로직
                if (selectedRole === "owner" && Number(roleId) !== 1) {
                    alert("사장님 계정이 아닙니다."); return;
                }
                if (selectedRole === "employee" && Number(roleId) !== 2) {
                    alert("직원 계정이 아닙니다."); return;
                }

                login(accessToken, roleId);
                alert("로그인 성공");
                navigate(Number(roleId) === 1 ? "/owner" : "/employee");
            }
        } catch (error) {
            alert(error.response?.data?.message || "로그인 실패");
        }
    };

    return (
        <div css={S.startPageContainer}>
            <div css={S.startModal}>
                <div css={S.loginLayout}>
                    {/* 1. 왼쪽: 역할 선택 사이드바 */}
                    <div css={S.roleSidebar}>
                        <label className={selectedRole === "owner" ? "active" : ""}>
                            <input type="radio" name="role" value="owner" 
                                   onChange={() => setSelectedRole("owner")} checked={selectedRole === "owner"} />
                            사장 | 매니저 로그인
                        </label>
                        <label className={selectedRole === "employee" ? "active" : ""}>
                            <input type="radio" name="role" value="employee" 
                                   onChange={() => setSelectedRole("employee")} checked={selectedRole === "employee"} />
                            직원 로그인
                        </label>
                        <label className={selectedRole === "admin" ? "active" : ""}>
                            <input type="radio" name="role" value="admin" disabled />
                            관리자 로그인
                        </label>
                    </div>

                    {/* 2. 오른쪽: 로그인 입력 폼 */}
                    <div css={S.formContainer}>
                        <h2 css={S.startLogo}>SA : ONE</h2>
                        
                        <div css={S.inputGroup}>
                            <div css={S.inputField}>
                                <div className="label-tag">ID</div>
                                <input name="username" type="text" placeholder="아이디를 입력하세요" onChange={handleChange} />
                            </div>
                            <div css={S.inputField}>
                                <div className="label-tag">PW</div>
                                <input name="password" type="password" placeholder="비밀번호를 입력하세요" onChange={handleChange} />
                            </div>
                        </div>
                        
                        <button css={S.loginBtn} onClick={handleLogin}>로그인</button>

                        <div css={S.socialBox}>
                            <button type="button">카카오</button>
                            <button type="button">네이버</button>
                            <button type="button">구글</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;