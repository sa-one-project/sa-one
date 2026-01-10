import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    // 데이터 공간
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate(); // *이동 기능

    // 로그인 버튼 클릭하면 실행
    const handleLogin = () => {
        // 아이디 or 비밀번호 공란 체크
        if (id === "" || password === "") {
            alert("아이디와 비밀번호를 모두 입력해주세요.")
            return;
        }

        // 공란이 아니며 성공적으로 로그인 되었을 시에 띄울 알람
        alert("로그인 성공")
        navigate("/") // *성공 알람 클릭 시 메인 화면으로 이동
    };

    return (
        <div>
            <h2>로그인</h2>
            <input
                type="text"
                placeholder="아이디" 
                onChange={(e) => setId(e.target.value)}  
            />
            <div>
                <input 
                    type="password"
                    placeholder="비밀번호"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick={handleLogin}>로그인</button>
        </div>
    );
}

export default Login;