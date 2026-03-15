/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    addAdminInquiryComment,
    fetchAdminInquiryDetail,
    updateAdminInquiryStatus,
} from "../../apis/adminInquiriesApi";
import * as S from "./AdminInquiryDetailStyle";

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
        <div css={S.page}>
            <div css={S.card}>
                <div css={S.topBar}>
                    <button css={S.backBtn} onClick={() => navigate("/admin/inquiries")}>
                        ← 목록
                    </button>
                </div>

                <h2 css={S.title}>{detail.title}</h2>

                <div css={S.metaGrid}>
                    <div><span className="muted">작성자:</span> {detail.userName} ({detail.userEmail})</div>
                    <div><span className="muted">매장:</span> {detail.storeName || "-"}</div>
                    <div><span className="muted">작성일:</span> {detail.createdAt}</div>
                    <div><span className="muted">검토일:</span> {detail.reviewedAt || "-"}</div>
                </div>

                <div css={S.contentBox}>{detail.content}</div>

                <div css={S.actionRow}>
                    <select css={S.select} value={status} onChange={(e) => setStatus(e.target.value)}>
                        {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>

                    <button css={S.btn} onClick={onSaveStatus}>상태 저장</button>
                </div>

                <h3 css={S.sectionTitle}>댓글</h3>

                <div css={S.commentList}>
                    {(detail.comments || []).map((c, idx) => (
                        <div key={c.commentId ?? idx} css={S.commentItem}>
                            <div className="head">
                                작성자: {c.userName ?? c.userId ?? "-"} / {c.createdAt ?? "-"}
                            </div>
                            <div className="body">{c.content ?? ""}</div>
                        </div>
                    ))}

                    {(detail.comments || []).length === 0 && (
                            <div style={{ color: "#6b7280", fontWeight: 800 }}>댓글이 없습니다.</div>
                    )}
                </div>

                <div css={S.editor}>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="관리자 답변을 입력하세요"
                    />
                    <div className="row">
                        <button css={S.btn} onClick={onAddComment}>댓글 등록</button>
                    </div>
                </div>
            </div>
        </div>
    );
}