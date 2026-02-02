/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as S from "./DeleteAccountModalStyle";

function DeleteAccountModal({ isOpen, onClose, onConfirm }) {
    const [password, setPassword] = useState("");

    if (!isOpen) return null;

    const handleConfirm = () => {
        if (!password) {
            alert("비밀번호를 입력하세요.");
            return;
        }

        onConfirm(password);
        setPassword("");
    };

    return (
        <div css={S.overlay} onClick={onClose}>
            <div css={S.container} onClick={(e) => e.stopPropagation()}>
                <h3>회원 탈퇴 확인</h3>
                <p>비밀번호를 입력하세요.</p>
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호"
                    onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
                />
                <div className="btn-group">
                    <button className="cancel-btn" onClick={onClose}>취소</button>
                    <button className="confirm-btn" onClick={handleConfirm}>확인</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteAccountModal;