import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { useAuthStore } from "../../stores/useAuthStore";

function SignUp() {
    const navigate = useNavigate(); // 이게 선언 되어야 회원가입 성공 시 로그인창X 바로 메인 화면이 뜸.
    
    const { login } = useAuthStore();

    // SignUpReqDto 기반으로 이름을 맞춤
    const [signUpData, setSignUpData] = useState({
        username: "",
        password: "",
        name: "",
        email: "",
        phone: "",
        gender: "남",
        birthDate: "",
        roleId: 1 // 일반 사용자 역할 번호 임의 부여
    });

    const [errorMsg, setErrorMsg] = useState("");

    // 입력값이 바뀔 때마다 실행되는 함수
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignUpData({
            ...signUpData,
            [name]: value
        });
    };

    // 데이터를 백엔드로 전송함. AuthController 주소 기반
    const handleSignUp = async () => {
        try {
            const response = await axios.post("http://localhost:8080/api/auth/local/signup", signUpData);

            if (response.status === 200) {
                // 백엔드가 준 토큰 꺼내고
                const token = response.data;

                // localStorage 에 토큰을 저장함. 인증된 사용자라 증명할 수 있음!! => 직접 저장하는 코드X
                // localStorage.setItem("accessToken", token);
                login(token);
                alert("회원가입 성공!")

                // 한 번 더 로그인을 하는 게 아니라 바로 메인 페이지로 이동.
                navigate("/");
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMsg(String(error.response.data));
            }
        }
    };

    return (
        <div>
        <h2>회원가입</h2>
        
        <input name="username" placeholder="아이디" onChange={handleChange} />
        <input name="password" type="password" placeholder="비밀번호" onChange={handleChange} />
        <input name="name" placeholder="이름" onChange={handleChange} />
        <input name="email" type="email" placeholder="이메일" onChange={handleChange} />
        <input name="phone" placeholder="전화번호" onChange={handleChange} />

        <select name="gender" onChange={handleChange}>
            {/* DB 참고 */}
            <option value="남">남성</option>
            <option value="여">여성</option>
            <option value="기타">기타</option>
        </select>

        <input name="birthDate" type="date" onChange={handleChange} />

        <button onClick={handleSignUp}>가입하기</button>

        <p>{errorMsg}</p>
    </div>
    );
}

export default SignUp;