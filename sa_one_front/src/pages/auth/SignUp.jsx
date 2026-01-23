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
        // roleId는 숫자로 저장되도록 처리
        setSignUpData({
            ...signUpData,
            [name]: name === "roleId" ? Number(value) : value
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
    };

    // 데이터를 백엔드로 전송함. AuthController 주소 기반
    const handleSignUp = async () => {
        // 전송 전 유효성 검사 (401 방지)
        if(!signUpData.username || !signUpData.password || !signUpData.birthDate) {
            alert("아이디, 비밀번호, 생년월일은 필수입니다.");
            return;
        }

        // ★ 변수에 담을 때 아예 숫자로 못박기
        const selectedRoleId = Number(signUpData.roleId);

        try {
            // ★ axios 인스턴스의 헤더 간섭을 피하기 위해 설정을 초기화하여 전송
            const response = await axios({
                method: "POST",
                url: "http://localhost:8080/api/auth/local/signup",
                data: {
                    ...signUpData,
                    // 백엔드 DTO 필드명과 정확히 일치하는지 재확인 필요
                    roleId: selectedRoleId 
                },
                headers: {
                    "Authorization": "", // 기존 토큰 삭제
                    "Content-Type": "application/json"
                }
            });

            // 200번대 응답(성공)이 오면 무조건 실행
            if (response.status === 200 || response.status === 201) {
                // ★ 백엔드 응답이 객체인지 문자열인지 확인 후 처리
                const token = typeof response.data === 'object' ? response.data.token : response.data;

                if (token) {
                    // ★ store의 login 함수에 숫자형 roleId를 정확히 전달
                    login(token, selectedRoleId);
                }
                
                alert("회원가입 성공!");

                // ★ 지연 없이 바로 이동하도록 설정
                navigate("/", { replace: true });
            }
        } catch (error) {
            console.error("SignUp Error:", error);
            if (error.response && (error.response.status === 401 || error.response.status === 500)) {
                setErrorMsg("중복된 아이디이거나 서버 오류가 발생했습니다.");
            } else {
                setErrorMsg("가입 처리 중 문제가 발생했습니다.");
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
                        {previewUrl ? (
                            <img src={previewUrl} alt="미리보기" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                            "사진"
                        )}
                    </div>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} accept="image/*" />
                    <button type="button" onClick={() => fileInputRef.current.click()}>사진 등록</button>
                </div>

                {/* 오른쪽: 입력 폼 영역 (뼈대) */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                    <div style={{ marginBottom: "5px" }}>
                        <label>가입 유형: </label>
                        <input type="radio" name="roleId" value="1" checked={Number(signUpData.roleId) === 1} onChange={handleChange} /> 사장/매니저
                        <input type="radio" name="roleId" value="2" style={{ marginLeft: "15px" }} checked={Number(signUpData.roleId) === 2} onChange={handleChange} /> 직원
                    </div>

                    <div>
                        <label>아이디: </label>
                        <input name="username" placeholder="아이디" onChange={handleChange} style={{ width: "200px" }} />
                        <button type="button" onClick={handleCheckUsername} style={{ marginLeft: "10px" }}>중복 확인</button>
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