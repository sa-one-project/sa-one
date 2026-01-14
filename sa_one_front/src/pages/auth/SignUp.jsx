import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
    const navigate = useNavigate();

    // 소셜 로그인 경로로 진입했는지 여부 확인
    const [isSocial, setIsSocial] = useState(false);

    // 회원가입 입력 필드 상태 관리
    const [roleId, setRoleId] = useState(2);    // 기본 역할: 사장(2)
    const [id, setId] = useState('');           // 사용자 ID (username)
    const [password, setPassword] = useState(''); 
    const [name, setName] = useState('');       
    const [gender, setGender] = useState('남');  
    const [birth, setBirth] = useState('');      
    const [phone, setPhone] = useState('');     
    const [email, setEmail] = useState('');     
    const [msg, setMsg] = useState('');         

    // 컴포넌트 마운트 시 소셜 가입용 임시 데이터가 있는지 체크
    useEffect(() => {
        // 소셜 인증 후 리다이렉트된 경우 저장된 프로필 정보를 불러옴
        const socialData = JSON.parse(localStorage.getItem("tempSocialData"));
        
        if (socialData) {
            setIsSocial(true);
            setId(socialData.username || '');  // 제공된 정보가 있으면 자동 완성 및 수정 방지
            setName(socialData.name || '');    
            setEmail(socialData.email || '');  
        }
    }, []);

    // 가입 버튼 클릭 시 유효성 검사 및 API 호출
    const checkSignUp = async () => {
        // 정규표현식: 아이디(영문/숫자 5~20자), 비밀번호(영 대/소문자, 숫자, 특수문자 조합)
        const idReg = /^[a-z0-9_-]{5,20}$/;
        const pwReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

        // 1. 아이디 기본 유효성 검사
        if (id === "") {
            setMsg("아이디를 입력해주세요.");
            return; 
        }

        if (!idReg.test(id)) {
            setMsg("아이디는 5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.");
            return;
        }
        
        // 2. 일반 가입일 경우에만 비밀번호 검증 수행 (소셜 가입은 비번 생략)
        if (!isSocial) {
            if (password === "") {
                setMsg("비밀번호를 입력해주세요.");
                return;
            }
            if (!pwReg.test(password)) {
                setMsg("비밀번호는 8~20자의 영문 대/소문자, 숫자, 특수문자를 포함해야 합니다.");
                return;
            }
        }

        // 3. 필수 항목 체크
        if (email === "") {
            setMsg("이메일은 필수 입력 항목입니다.");
            return;
        }

        // 서버 전송 데이터 객체 생성
        const signUpData = {
            username: id,
            // 소셜 가입은 별도 비번 설정이 없으므로 더미값 처리 후 서버에서 난수화 권장
            password: isSocial ? "OAUTH_USER_RANDOM_PW" : password, 
            roleId: roleId,
            name: name,
            gender: gender,
            birthDate: birth === "" ? null : birth,
            phone: phone,
            email: email,
            provider: isSocial ? "SOCIAL" : "LOCAL"
        };

        try {
            // 회원가입 API 호출
            const response = await axios.post("http://localhost:8080/api/auth/local/signup", signUpData);
            
            if (response.status >= 200 && response.status < 300) {
                alert("회원가입 성공!");
                // 가입 완료 후 임시 세션 데이터 정리
                localStorage.removeItem("tempSocialData"); 
                navigate("/login");
            }
        } catch (error) {
            // 서버 에러 메시지 바인딩
            setMsg(error.response?.data?.message || "회원가입 중 에러가 발생했습니다.");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>회원가입 {isSocial && "(소셜 계정 연동)"}</h2>
            
            {/* 가입 권한 선택 구역 */}
            <div style={{ marginBottom: "15px" }}>
                <label>가입 유형: </label>
                <input 
                    type="radio" 
                    name="role" 
                    checked={roleId === 2} 
                    onChange={() => setRoleId(2)} 
                /> 사장 | 매니저
                <input 
                    type="radio" 
                    name="role" 
                    checked={roleId === 3} 
                    style={{ marginLeft: "10px" }}
                    onChange={() => setRoleId(3)} 
                /> 직원
            </div>

            {/* 입력 폼 영역 */}
            <table style={{ borderSpacing: "0 10px" }}>
                <tbody>
                    <tr>
                        <td>아이디</td>
                        <td>
                            <input 
                                type="text" 
                                value={id} 
                                onChange={(e) => setId(e.target.value)} 
                                disabled={isSocial} // 소셜 계정은 ID 고정
                                placeholder="5~20자 소문자, 숫자"
                            />
                        </td>
                    </tr>
                    {!isSocial && ( // 일반 가입 시에만 비밀번호 입력창 노출
                        <tr>
                            <td>비밀번호</td>
                            <td>
                                <input 
                                    type="password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    placeholder="8~20자 대소문자+특수문자"
                                />
                            </td>
                        </tr>
                    )}
                    <tr>
                        <td>이름 / 성별</td>
                        <td>
                            <input 
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                disabled={isSocial && name !== ""} 
                            />
                            <select 
                                value={gender} 
                                onChange={(e) => setGender(e.target.value)}
                                style={{ marginLeft: "5px" }}
                            >
                                <option value="남">남</option>
                                <option value="여">여</option>
                                <option value="기타">기타</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>생년월일</td>
                        <td><input type="date" value={birth} onChange={(e) => setBirth(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>전화번호</td>
                        <td><input type="text" value={phone} placeholder="010-0000-0000" onChange={(e) => setPhone(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>이메일</td>
                        <td>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                disabled={isSocial} 
                            />
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* 하단 버튼 제어 */}
            <div style={{ marginTop: "20px" }}>
                <button onClick={checkSignUp} style={{ marginRight: "10px" }}>등록</button>
                <button onClick={() => navigate(-1)}>취소</button>
            </div>
            
            {/* 유효성 검사 에러 메시지 출력 */}
            {msg && <p style={{ color: "red", fontSize: "0.9rem" }}>{msg}</p>}
        </div>
    );
}

export default SignUp;