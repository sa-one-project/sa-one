import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import { createMyInquiry } from "../../apis/myInquiriesApi";

export default function MyInquiryCreatePage() {
    const navigate = useNavigate();
    const { roleId } = useAuthStore();

    const [storeId, setStoreId] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        if (!title.trim() || !content.trim()) {
            alert("제목/내용을 입력해주세요");
            return;
        }

        setLoading(true);
        try {
            await createMyInquiry(roleId, {
                storeId: storeId ? Number(storeId) : null,
                title,
                content,
            });
            alert("문의 등록 완료");
            navigate("..");
        } catch (e) {
            alert(e.response?.data?.message || "문의 등록 실패");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>문의 작성</h2>

            <div>
                <input
                    value={storeId}
                    onChange={(e) => setStoreId(e.target.value)}
                    placeholder="storeId (선택)"
                />

                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목" />

                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="내용"
                    rows={10}
                />

                <div>
                    <button onClick={() => navigate(-1)}>취소</button>
                    <button disabled={loading} onClick={onSubmit}>
                        {loading ? "등록중..." : "등록"}
                    </button>
                </div>
            </div>
        </div>
    );
}