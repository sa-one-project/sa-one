import { useState } from "react";

function DeleteAccountModal({ isOpen, onClose, onConfirm }) {
    const [password, setPassword] = useState("");

    if (!isOpen) return null; // 열려있지 않으면 아무것도 안 보임

    const handleConfirm = () => {
        if (!password) {
            alert("비밀번호를 입력하세요.");
            return;
        }

        // [TODO] DB 복구 되면 여기서 백엔드 비번 검증 로직 연결
        onConfirm(password);
        setPassword("");
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>회원 탈퇴 확인</h3>
                <p>비밀번호를 입력하세요.</p>
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div>
                    <button onClick={onClose}>취소</button>
                    <button onClick={handleConfirm}>확인</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteAccountModal;