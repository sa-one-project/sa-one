import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
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
                const token = response.data.accessToken;
                localStorage.setItem("AccessToken", token);

                alert("로그인 성공");
                navigate("/"); // 로그인 성공 시 메인 화면으로 다시 돌아감. (대신 로그인 하지 않은 사람과 다르게 사이드바 메뉴가 활성화 됨.)
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