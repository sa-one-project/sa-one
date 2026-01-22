import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuthStore(); // 로그인 함수 가져옴

    const [loginData, setLoginData] = useState({
        username: "", // SignInReqDto 필드명
        password: ""
    });

    // 사용자가 왼쪽에서 선택한 로그인 유형 상태 (기본값: 사장)
    const [selectedRole, setSelectedRole] = useState("owner");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({...loginData, [name]: value});
    };

    // 라디오 버튼 선택 시 실행됨
    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:8080/api/auth/local/signin", loginData);

            if (response.status === 200) {

                // 백엔드에 응답해서 토큰과 유저 정보를 가져옴
                const { accessToken, user } = response.data;
                
                // 만약 백엔드에서 user 객체를 안 주면 선택된 라디오 버튼에 따라 임시 roleId 부여
                const roleId = user ? user.roleId : (selectedRole === "owner" ? 1 : 2);
                
                // Test용... 콘솔 체크
                console.log("로그인한 사용자의 roleId:", roleId);

                // 선택한 로그인 버튼 유형과 실제 DB의 roleId 가 맞는지 체크함.
                // 사장 선택 시 roleId = 1, 직원 선택 시 roleId = 2 
                if (selectedRole === "owner" && roleId !== 1) {
                    alert("사장님 계정이 아닙니다. 로그인 유형을 확인해주세요.")
                    return;
                }
                
                if (selectedRole === "employee" && roleId !== 2) {
                    alert("직원 계정이 아닙니다. 로그인 유형을 확인해주세요.")
                    return;
                }

                login(accessToken, roleId);
                alert("로그인 성공");

                if (roleId === 1) {
                    navigate("/owner")
                } else {
                    navigate("/employee")
                }
            }
            // if 에서 토큰이 확인되지 않으면 아래의 캐치로 넘어가서 에러 메세지를 띄움.
        } catch (error) {
            const errorMsg = error.response?.data?.message || "로그인 실패";
            alert(errorMsg);
        }
    };


    // 아래로는 스타일.js를 나중에 파서 고치면 될 부분... 피그마 디자인 기반 뼈대
    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "100px", gap: "100px" }}>
            
            {/* 1. 왼쪽: 로그인 유형 선택 영역 (피그마 디자인) */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", justifyContent: "center" }}>
                <label>
                    <input 
                        type="radio" 
                        name="loginType" 
                        value="owner" 
                        onChange={handleRoleChange} 
                        checked={selectedRole === "owner"} 
                    /> 사장 로그인
                </label>
                <label>
                    <input 
                        type="radio" 
                        name="loginType" 
                        value="employee" 
                        onChange={handleRoleChange} 
                        checked={selectedRole === "employee"} 
                    /> 직원 로그인
                </label>
                <label>
                    <input 
                        type="radio" 
                        name="loginType" 
                        value="admin" 
                        onChange={handleRoleChange} 
                        checked={selectedRole === "admin"} 
                    /> 관리자 로그인
                </label>
            </div>

            {/* 2. 오른쪽: 실제 입력 및 로직 영역 */}
            <div style={{ textAlign: "center" }}>
                <h2>SA : ONE</h2>
                
                <div style={{ marginBottom: "10px" }}>
                    {/* 사용자 입력칸 */}
                    <input
                        name="username"
                        type="text"
                        placeholder="아이디"
                        onChange={handleChange}
                        style={{ width: "250px", padding: "10px" }}
                    />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <input 
                        name="password"
                        type="password"
                        placeholder="비밀번호"    
                        onChange={handleChange}
                        style={{ width: "250px", padding: "10px" }}
                    />
                </div>
                
                <div>
                    <button onClick={handleLogin} style={{ width: "275px", padding: "10px" }}>로그인</button>
                </div>

                {/* 소셜 로그인 버튼 (뼈대) */}
                <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "20px" }}>
                    <button type="button">카카오</button>
                    <button type="button">네이버</button>
                    <button type="button">구글</button>
                </div>
            </div>

        </div>
    );
}

export default Login;