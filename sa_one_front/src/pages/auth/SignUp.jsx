import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function SignUp() {
    // 데이터 공간
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    const navigate = useNavigate();

    // 아이디, 비밀번호 검사 로직
    const checkSignUp = () => {
        const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

        if (id === "") {
            setMsg("아이디를 입력해주세요.");
            return;
        }

        if (reg.test(password)) {
            alert("성공적으로 회원가입 되었습니다.");
            navigate("/login"); // 성공 알람 창 닫으면 로그인 페이지로 화면 전환
        } else {
            setMsg("비밀번호 형식이 틀렸습니다.");
        }
    };

    // 2. 이 함수(SignUp)의 바로 아래에 return을 둡니다.
    return (
        <div>
            <h2>회원가입</h2>
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
            <button onClick={checkSignUp}>가입하기</button>
            <p style={{ color: 'red' }}>{msg}</p>
        </div>
    );
}

export default SignUp;