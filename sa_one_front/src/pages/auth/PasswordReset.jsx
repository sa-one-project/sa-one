/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as S from "./PasswordResetStyle";
import axiosInstance from "../../apis/axiosInstance";

function PasswordReset() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const tokenFromUrl = searchParams.get("token");

    const [email, setEmail] = useState("");
    const [passwords, setPasswords] = useState({
        newPassword: "",
        confirmPassword: "",
    });

    const [message, setMessage] = useState("");
    const [isMismatch, setIsMismatch] = useState(false);

    // 실시간 비밀번호 일치 확인
    useEffect(() => {
        if (!passwords.confirmPassword) {
            setIsMismatch(false);
            return;
        }
        setIsMismatch(passwords.newPassword !== passwords.confirmPassword);
    }, [passwords.newPassword, passwords.confirmPassword]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPasswords((prev) => ({ ...prev, [name]: value }));
    };

    // 메일 발송 요청
    const handleRequestMail = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            alert("이메일 주소를 입력해주세요.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("올바른 이메일 형식이 아닙니다.");
            return;
        }

        try {
            await axiosInstance.post("/api/account/password/reset-request", { email });
            alert("재설정 링크를 입력한 메일로 보냈습니다.");
            setMessage("");
        } catch (error) {
            setMessage(
                "요청 실패: " + (error.response?.data?.message || "이메일을 확인해주세요.")
            );
        }
    };

    // 비밀번호 변경
    const handlePasswordReset = async (e) => {
        e.preventDefault();

        // 토큰 없는 상태에서 재설정 폼이 보이면 바로 막기(방어코드)
        if (!tokenFromUrl) {
            setMessage("유효한 토큰이 없습니다. 재설정 메일을 다시 요청해주세요.");
            return;
        }

        if (!passwords.newPassword || !passwords.confirmPassword) {
            alert("비밀번호를 입력해주세요.");
            return;
        }

        if (isMismatch) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const response = await axiosInstance.post("/api/account/password/reset", {
                token: tokenFromUrl,
                newPassword: passwords.newPassword,
                newPasswordConfirm: passwords.confirmPassword,
            });

            if (response.status === 200) {
                alert("비밀번호가 성공적으로 변경되었습니다.");
                navigate("/login");
            }
        } catch (error) {
            setMessage(error.response?.data?.message || "유효하지 않거나 만료된 토큰입니다.");
        }
    };

    return (
        <div css={S.container}>
            <div css={S.card}>
                <h2 css={S.title}>{!tokenFromUrl ? "비밀번호 관리" : "비밀번호 재설정"}</h2>

                {!tokenFromUrl ? (
                    <form css={S.form} onSubmit={handleRequestMail}>
                        <p css={S.description}>
                            비밀번호를 변경하려면 인증 메일을 먼저 받아야 합니다.
                        </p>

                        <div css={S.inputGroup}>
                            <label>이메일 주소</label>
                            <div className="input-wrapper">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="example@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" css={S.actionBtn}>
                            재설정 메일 받기
                        </button>
                    </form>
                ) : (
                    <form css={S.form} onSubmit={handlePasswordReset}>
                        <p css={S.description}>
                            본인 인증이 확인되었습니다.<br />
                            새 비밀번호를 입력하세요.
                        </p>

                        <div css={S.inputGroup}>
                            <label>새 비밀번호</label>
                            <div className="input-wrapper">
                                <input
                                    type="password"
                                    name="newPassword"
                                    placeholder="*******"
                                    value={passwords.newPassword}
                                    onChange={handleInputChange}
                                    className={isMismatch ? "error-border" : ""}
                                    required
                                />
                            </div>
                        </div>

                        <div css={S.inputGroup}>
                            <label>새 비밀번호 확인</label>
                            <div className="input-wrapper">
                                {isMismatch && (
                                    <span className="error-msg">
                                        비밀번호가 다릅니다. 다시 확인해주세요.
                                    </span>
                                )}
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="*****"
                                    value={passwords.confirmPassword}
                                    onChange={handleInputChange}
                                    className={isMismatch ? "error-border" : ""}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" css={S.actionBtn} disabled={isMismatch}>
                            확인
                        </button>
                    </form>
                )}

                {message && <div css={S.messageBox}>{message}</div>}
            </div>
        </div>
    );
}

export default PasswordReset;