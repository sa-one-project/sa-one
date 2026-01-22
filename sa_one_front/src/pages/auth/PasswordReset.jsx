import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

function PasswordReset() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    // 이메일 링크의 ?token=... 또는 로그에서 복사한 토큰을 읽습니다.
    const tokenFromUrl = searchParams.get("token");

    const [email, setEmail] = useState(""); 
    const [passwords, setPasswords] = useState({
        newPassword: "",
        confirmPassword: ""
    });
    const [message, setMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPasswords({ ...passwords, [name]: value });
    };

    // 1. 메일 발송 요청 (백엔드 requestPasswordReset 호출)
    const handleRequestMail = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/account/password/reset-request", { email });
            alert("재설정 링크를 입력한 메일로 보냈습니다.");
        } catch (error) {
            setMessage("요청 실패: " + (error.response?.data?.message || "이메일을 확인해주세요."));
        }
    };

    // 2. 실제 비밀번호 변경 (백엔드 confirmPasswordReset 호출)
    const handlePasswordReset = async (e) => {
        e.preventDefault();

        if (passwords.newPassword !== passwords.confirmPassword) {
            alert("새 비밀번호와 확인용 비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8080/api/account/password/reset", 
                {
                    token: tokenFromUrl, // URL에서 읽은 토큰
                    newPassword: passwords.newPassword,
                    newPasswordConfirm: passwords.confirmPassword
                }
            );

            if (response.status === 200) {
                alert("비밀번호가 성공적으로 변경되었습니다.");
                navigate("/login");
            }
        } catch (error) {
            setMessage(error.response?.data?.message || "유효하지 않거나 만료된 토큰입니다.");
        }
    };

    return (
        <div>
            <h2>비밀번호 관리</h2>

            {/* 이메일 입력창 표시 */}
            {!tokenFromUrl ? (
                <div>
                    <p>비밀번호를 변경하려면 인증 메일을 먼저 받아야 합니다.</p>
                    <form onSubmit={handleRequestMail}>
                        <label>이메일 주소</label><br />
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="example@email.com"
                            required 
                        />
                        <button type="submit">재설정 메일 받기</button>
                    </form>
                </div>
            ) : (
                /* 새 비밀번호 입력창 표시 */
                <form onSubmit={handlePasswordReset}>
                    <p>본인 인증이 확인되었습니다. 새 비밀번호를 입력하세요.</p>
                    <div>
                        <label>새 비밀번호</label><br />
                        <input 
                            type="password" 
                            name="newPassword" 
                            value={passwords.newPassword} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label>새 비밀번호 확인</label><br />
                        <input 
                            type="password" 
                            name="confirmPassword" 
                            value={passwords.confirmPassword} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                    <button type="submit">비밀번호 변경 완료</button>
                </form>
            )}

            {message && <p style={{ color: "red" }}>{message}</p>}
        </div>
    );
}

export default PasswordReset;