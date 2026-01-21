import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PasswordReset() {
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleConfirm = () => {
        if (newPassword !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        alert("변경 요청 완료");
        navigate(-1);
    };

    return (
        <div>
            <h1>비밀번호 재설정</h1>
            <hr />

            <div>
                <label>새 비밀번호</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>

            <div>
                <label>새 비밀번호 확인</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            
            <button onClick={handleConfirm}>확인</button>
        </div>
    );
};

export default PasswordReset;