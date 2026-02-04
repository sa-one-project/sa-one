import React, { useEffect, useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import { addMyInquiryComment, fetchMyInquiryDetail } from "../../apis/myInquiriesApi";

export default function MyInquiryDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { roleId } = useAuthStore();

    const [detail, setDetail] = useState(null);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const load = useCallback(async () => {
        if (!id) return;

        setLoading(true);
        setError("");
        try {
            const res = await fetchMyInquiryDetail(roleId, id);
            setDetail(res);
        } catch (e) {
            setError(e.response?.data?.message || "문의 상세 조회 실패");
        } finally {
            setLoading(false);
        }
    }, [id, roleId]);

    useEffect(() => {
        load();
    }, [load]);

    const onAddComment = async () => {
        if (!id) return;
        if (!comment.trim()) return;

        try {
            await addMyInquiryComment(roleId, id, comment);
            setComment("");
            await load();
            alert("댓글 등록 완료");
        } catch (e) {
            alert(e.response?.data?.message || "댓글 등록 실패");
        }
    };

    if (loading) return <div>로딩중.</div>;
    if (error) return <div>{error}</div>;
    if (!detail) return null;

    return (
        <div>
            <button onClick={() => navigate(-1)}>← 목록</button>

            <h2>{detail.title}</h2>

            <div>
                <div>상태: {detail.status}</div>
                <div>작성일: {detail.createdAt}</div>
                <div>검토일: {detail.reviewedAt || "-"}</div>
                <div>매장: {detail.storeName || "-"}</div>
            </div>

            <div>{detail.content}</div>

            <h3>댓글</h3>

            <div>
                <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="추가로 남길 내용"
                />
                <button onClick={onAddComment}>등록</button>
            </div>

            <div>
                {(detail.comments || []).map((c) => (
                    <div key={c.commentId}>
                        <div>
                            {c.userId} / {c.createdAt}
                        </div>
                        <div>{c.content}</div>
                    </div>
                ))}

                {(detail.comments || []).length === 0 && <div>댓글이 없습니다.</div>}
            </div>
        </div>
    );
}