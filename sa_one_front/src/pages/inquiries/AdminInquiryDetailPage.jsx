import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    addAdminInquiryComment,
    fetchAdminInquiryDetail,
    updateAdminInquiryStatus,
} from "../../apis/adminInquiriesApi";

const STATUS_OPTIONS = ["OPEN", "IN_PROGRESS", "CLOSED"];

export default function AdminInquiryDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [detail, setDetail] = useState(null);
    const [status, setStatus] = useState("OPEN");
    const [comment, setComment] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const load = async () => {
        setLoading(true);
        setError("");

        try {
            const res = await fetchAdminInquiryDetail(id);
            setDetail(res);
            setStatus(res.status);
        } catch (e) {
            setError(e.response?.data?.message || "문의 상세 조회 실패");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const onSaveStatus = async () => {
        try {
            await updateAdminInquiryStatus(id, status);
            await load();
            alert("상태 변경 완료");
        } catch (e) {
            alert(e.response?.data?.message || "상태 변경 실패");
        }
    };

    const onAddComment = async () => {
        if (!comment.trim()) {
            return;
        }

        try {
            await addAdminInquiryComment(id, comment);
            setComment("");
            await load();
            alert("댓글 등록 완료");
        } catch (e) {
            alert(e.response?.data?.message || "댓글 등록 실패");
        }
    };

    if (loading) {
        return <div>로딩중...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!detail) {
        return null;
    }

    return (
        <div>
            <button onClick={() => navigate("/admin/inquiries")}>
                ← 목록
            </button>

            <h2>{detail.title}</h2>

            <div>
                <div>작성자: {detail.userName} ({detail.userEmail})</div>
                <div>매장: {detail.storeName || "-"}</div>
                <div>작성일: {detail.createdAt}</div>
                <div>검토일: {detail.reviewedAt || "-"}</div>
            </div>

            <div>
                {detail.content}
            </div>

            <div>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>

                <button onClick={onSaveStatus}>
                    상태 저장
                </button>
            </div>

            <h3>댓글</h3>

            <div>
                {(detail.comments || []).map((c, idx) => (
                    <div key={c.commentId ?? idx}>
                        <div>
                            작성자: {c.userName ?? c.userId ?? "-"} / {c.createdAt ?? "-"}
                        </div>
                        <div style={{ whiteSpace: "pre-wrap" }}>
                            {c.content ?? ""}
                        </div>
                    </div>
                ))}

                {(detail.comments || []).length === 0 && (
                    <div>댓글이 없습니다.</div>
                )}
            </div>

            <div>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="관리자 답변을 입력하세요"
                    rows={4}
                />
                <button onClick={onAddComment}>
                    댓글 등록
                </button>
            </div>
        </div>
    );
}