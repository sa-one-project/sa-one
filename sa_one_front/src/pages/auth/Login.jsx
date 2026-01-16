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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({...loginData, [name]: value});
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:8080/api/auth/local/signin", loginData);

            if (response.status === 200) {

                // 백엔드에 응답해서 토큰과 유저 정보를 가져옴
                const { accessToken, user } = response.data;
                const roleId = user.roleId;

                console.log("로그인한 사용자의 roleId:", roleId);

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

    return (
        <div>
            <h2>로그인</h2>
            <div>
                {/* 사용자 입력칸 */}
                <input
                    name="username"
                    type="text"
                    placeholder="아이디"
                    onChange={handleChange}
                />
            </div>
            <div>
                <input 
                    name="password"
                    type="password"
                    placeholder="비밀번호"    
                    onChange={handleChange}
                />
            </div>
            <div>
                <button onClick={handleLogin}>로그인</button>
            </div>
        </div>
    );
}

export default Login;