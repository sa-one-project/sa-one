/** @jsxImportSource @emotion/react */
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; 
import { useAuthStore } from "../../stores/useAuthStore";
import * as ss from "./SignUpStyle"; 
import axiosInstance from "../../apis/axiosInstance";

function SignUp() {
    const navigate = useNavigate();
    const { login } = useAuthStore();

    const [signUpData, setSignUpData] = useState({
        username: "",
        password: "",
        name: "",
        email: "",
        phone: "",
        gender: "남",
        birthDate: "",
        roleId: 2,
    });

    const [errorMsg, setErrorMsg] = useState("");
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignUpData((prev) => ({
            ...prev,
            [name]: name === "roleId" ? Number(value) : value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) setPreviewUrl(URL.createObjectURL(file));
    };

    const handleCheckUsername = () => {
        if (!signUpData.username) {
            alert("아이디를 입력해주세요.");
            return;
        }
        alert("현재 백엔드에 중복 확인 기능이 준비되지 않았습니다.");
    };

    const handleSignUp = async () => {
        setErrorMsg("");

        const usernameRegex = /^[a-z0-9_-]{5,20}$/;
        const passwordRegex =
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])[A-Za-z0-9^A-Za-z0-9\W]{8,16}$/;

        if (!usernameRegex.test(signUpData.username)) {
            setErrorMsg("5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.");
            return;
        }

        if (!passwordRegex.test(signUpData.password)) {
            setErrorMsg("8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.");
            return;
        }

        if (!signUpData.name || !signUpData.birthDate) {
            setErrorMsg("이름과 생년월일은 필수입니다.");
            return;
        }

        try {
            const res = await axiosInstance.post("/api/auth/local/signup", {
                ...signUpData,
                roleId: Number(signUpData.roleId),
            });

            const token = typeof res.data === "object" ? res.data?.token : res.data;

            if (token) {
                login(token, Number(signUpData.roleId));
            }
            console.log("signup roleId =", signUpData.roleId);
            alert("회원가입 성공!");
            navigate("/", { replace: true });
        } catch (error) {
            console.error(error);

            const msg =
                error.response?.data?.message ||
                (typeof error.response?.data === "string" ? error.response.data : null) ||
                "가입 처리 중 문제가 발생했습니다.";

            setErrorMsg(msg);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f2f7fc' }}>
            <div style={{ width: '950px', padding: '60px', background: 'white', border: '1px solid #e0e0e0', borderRadius: '30px', position: 'relative' }}>
                <h2 style={{ color: '#a4b8c4', marginBottom: '40px', fontSize: '24px' }}>회원가입</h2>
                
                <div style={{ display: 'flex', gap: '60px', marginBottom: '60px' }}>
                    <div css={ss.photoArea}>
                        <div className="img-box">
                            {previewUrl ? <img src={previewUrl} alt="p" style={{width:'100%', height:'100%', objectFit:'cover'}} /> : "NO IMAGE"}
                        </div>
                        <input type="file" ref={fileInputRef} hidden onChange={handleFileChange} accept="image/*" />
                        <button type="button" onClick={() => fileInputRef.current.click()}>이미지 등록</button>
                    </div>

                    <div css={ss.tableContainer}>
                        <div className="label">가입 유형</div>
                        <div className="content">
                            <div className="role-selector">
                                <label><input type="radio" name="roleId" value="2" checked={Number(signUpData.roleId) === 2} onChange={handleChange} /> 사장 | 매니저</label>
                                <label><input type="radio" name="roleId" value="3" checked={Number(signUpData.roleId) === 3} onChange={handleChange} /> 직원</label>
                            </div>
                        </div>

                        <div className="label">아이디</div>
                        <div className="content" style={{ justifyContent: 'space-between' }}>
                            <input name="username" onChange={handleChange} style={{ flex: 1 }} />
                            <span onClick={handleCheckUsername} style={{ fontSize: '12px', color: '#aaa', cursor: 'pointer', whiteSpace: 'nowrap', marginLeft: '10px' }}>중복 확인</span>
                        </div>

                        <div className="label">비밀번호</div>
                        <div className="content"><input name="password" type="password" onChange={handleChange} /></div>

                        <div className="label">이름</div>
                        <div className="split-row">
                            <input name="name" onChange={handleChange} />
                            <div className="sub-label">성별</div>
                            <select name="gender" value={signUpData.gender} onChange={handleChange}>
                                <option value="남">남성</option>
                                <option value="여">여성</option>
                                <option value="기타">기타</option>
                            </select>
                        </div>

                        <div className="label">생년월일</div>
                        <div className="content"><input name="birthDate" type="date" onChange={handleChange} /></div>
                        <div className="label">전화번호</div>
                        <div className="content"><input name="phone" placeholder="'-' 제외 입력" onChange={handleChange} /></div>
                        <div className="label">이메일</div>
                        <div className="content"><input name="email" type="email" onChange={handleChange} /></div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                    <button onClick={handleSignUp} css={ss.actionButton}>등록</button>
                    <button onClick={() => navigate(-1)} css={ss.actionButton} style={{ background: '#e0f2ed' }}>취소</button>
                </div>
                {errorMsg && <p style={{ color: "red", marginTop: "15px", textAlign: "right", fontSize: "12px" }}>{errorMsg}</p>}
            </div>
        </div>
    );
}

export default SignUp;