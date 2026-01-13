import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    // 사용자 입력값 관리를 위한 state
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // 로그인 로직 처리
    const handleLogin = () => {
        // 유효성 검사: 아이디/비밀번호 빈값 체크
        if (id === "" || password === "") {
            alert("아이디와 비밀번호를 모두 입력해주세요.");
            return;
        }

        /**
         * TODO: 백엔드 API 연결 후 실제 인증 로직으로 교체 예정
         * 현재는 메인 페이지(Home) 진입 확인을 위해 임시 토큰 발행 처리함
         */
        localStorage.setItem("AccessToken", "temp-token-1234");
        
        alert("로그인 성공");
        
        /**
         * navigate("/") 대신 replace를 사용하여 히스토리를 남기지 않고 메인으로 이동
         * 로그인 성공 후 뒤로가기 방지 및 전체 인증 상태 갱신을 위해 window.location 사용
         */
        window.location.replace("/");
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>로그인</h2>
            {/* 아이디 입력부 */}
            <input 
                type="text" 
                placeholder="아이디" 
                value={id}
                onChange={(e) => setId(e.target.value)} 
            />
            
            <div style={{ marginTop: "10px" }}>
                {/* 비밀번호 입력부 */}
                <input 
                    type="password" 
                    placeholder="비밀번호" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                />
            </div>

            {/* 로그인 실행 버튼 */}
            <button 
                onClick={handleLogin} 
                style={{ marginTop: "10px", cursor: "pointer" }}
            >
                로그인
            </button>
        </div>
    );
}

export default Login;