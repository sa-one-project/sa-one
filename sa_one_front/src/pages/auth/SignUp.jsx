import axios from "axios";
import { useState, useRef } from "react";
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

    // 사진 파일과 미리보기 URL 상태 추가
    const [profileFile, setProfileFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef();
    

    // 입력값이 바뀔 때마다 실행되는 함수
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignUpData({
            ...signUpData,
            [name]: value
        });
    };

    // 사진 선택 시 미리보기 처리
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    }

    // 아이디 중복 확인 요청
    const handleCheckUsername = async () => {
        if (!signUpData.username) {
            alert("아이디를 입력해주세요.");
            return;
        }
        // ★ 백엔드에 해당 API가 없어 알림창만 띄우고 실제 호출은 주석 처리함
        alert("현재 백엔드에 중복 확인 기능이 준비되지 않았습니다.");
        /* try {
            const response = await axios.get(`http://localhost:8080/api/auth/check-username?username=${signUpData.username}`);
            // ... 생략
        } catch (error) {
            alert("중복 확인 중 오류가 발생했습니다.");
        }
        */
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
        <div style={{ padding: "40px" }}>
            <h2>회원가입</h2>
            <hr />

            <div style={{ display: "flex", gap: "50px", marginTop: "20px" }}>
                {/* 왼쪽: 이미지 업로드 영역 (뼈대) */}
                <div style={{ textAlign: "center" }}>
                    <div style={{ width: "150px", height: "180px", border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px", overflow: "hidden" }}>
                        {/* 미리보기 이미지가 있으면 보여주고 없으면 "사진" 글자 표시 */}
                        {previewUrl ? (
                            <img src={previewUrl} alt="미리보기" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> // ★
                        ) : (
                            "사진"
                        )}
                    </div>
                    {/* 숨겨진 실제 input file 태그 */}
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} accept="image/*" /> {/* ★ */}
                    {/* 버튼 클릭 시 위의 input file이 클릭되도록 연결 */}
                    <button type="button" onClick={() => fileInputRef.current.click()}>사진 등록</button> {/* ★ */}
                </div>

                {/* 오른쪽: 입력 폼 영역 (뼈대) */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                    <div>
                        <label>아이디: </label>
                        <input name="username" placeholder="아이디" onChange={handleChange} style={{ width: "200px" }} />
                        {/* 아이디 중복 확인 버튼 추가 */}
                        <button type="button" onClick={handleCheckUsername} style={{ marginLeft: "10px" }}>중복 확인</button> {/* ★ */}
                    </div>

                    <div>
                        <label>비밀번호: </label>
                        <input name="password" type="password" placeholder="비밀번호" onChange={handleChange} style={{ width: "200px" }} />
                    </div>

                    <div>
                        <label>이름: </label>
                        <input name="name" placeholder="이름" onChange={handleChange} style={{ width: "100px" }} />
                        
                        <label style={{ marginLeft: "20px" }}>성별: </label>
                        <select name="gender" onChange={handleChange}>
                            {/* DB 참고 */}
                            <option value="남">남성</option>
                            <option value="여">여성</option>
                            <option value="기타">기타</option>
                        </select>
                    </div>

                    <div>
                        <label>생년월일: </label>
                        <input name="birthDate" type="date" onChange={handleChange} />
                    </div>

                    <div>
                        <label>전화번호: </label>
                        <input name="phone" placeholder="전화번호" onChange={handleChange} style={{ width: "200px" }} />
                    </div>

                    <div>
                        <label>이메일: </label>
                        <input name="email" type="email" placeholder="이메일" onChange={handleChange} style={{ width: "200px" }} />
                    </div>

                    {/* 가입 버튼 영역 */}
                    <div style={{ marginTop: "20px" }}>
                        <button onClick={handleSignUp} style={{ padding: "10px 20px" }}>가입하기</button>
                        <p style={{ color: "red" }}>{errorMsg}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;