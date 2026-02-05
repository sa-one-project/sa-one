import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchMyInquiries } from "../../apis/myInquiriesApi";
import * as S from "./styles";

const STATUS_OPTIONS = ["", "OPEN", "IN_PROGRESS", "CLOSED"];

export default function MyInquiriesPage() {
    const navigate = useNavigate();
    const [sp, setSp] = useSearchParams();

    const [status, setStatus] = useState(sp.get("status") || "");
    const [keyword, setKeyword] = useState(sp.get("keyword") || "");
    const [page, setPage] = useState(Number(sp.get("page") || 1));
    const size = 10;

    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const totalPages = useMemo(() => Math.max(1, Math.ceil(total / size)), [total, size]);

    const load = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetchMyInquiries({ status, keyword, page, size });
            setItems(res.items || []);
            setTotal(res.total || 0);
        } catch (e) {
            setError(e.response?.data?.message || "문의 목록 조회 실패");
        } finally {
            setLoading(false);
        }
    }, [status, keyword, page, size]);

    useEffect(() => {
        setSp((prev) => {
            const next = new URLSearchParams(prev);
            status ? next.set("status", status) : next.delete("status");
            keyword ? next.set("keyword", keyword) : next.delete("keyword");
            next.set("page", String(page));
            return next;
        });
    }, [status, keyword, page, setSp]);

    useEffect(() => {
        load();
    }, [load]);

    const onSubmitSearch = () => {
        setPage(1);
    };

    return (
        <div css={S.page}>
            <div css={S.card}>
                <div css={S.header}>
                <div>
                    <h2 css={S.title}>내 문의</h2>
                    <p css={S.subText}>상태/검색어로 필터링하고, 클릭해서 상세로 이동하세요.</p>
                </div>
                </div>

                <div css={S.controls}>
                <div css={S.leftControls}>
                    <select css={S.select} value={status} onChange={(e) => setStatus(e.target.value)}>
                    {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                        {s || "전체"}
                        </option>
                    ))}
                    </select>

                    <input
                    css={S.input}
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="검색어"
                    />
                </div>

                <div css={S.btnRow}>
                    <button css={S.ghostBtn} onClick={onSubmitSearch}>검색</button>
                    <button css={S.primaryBtn} onClick={() => navigate("new")}>문의 작성</button>
                </div>
                </div>

                {loading && <div css={S.infoLine}>로딩중…</div>}
                {error && <div css={S.infoLine}>{error}</div>}

                <div css={S.table}>
                <div css={S.thead}>
                    <div>ID</div>
                    <div>상태</div>
                    <div>제목</div>
                    <div>작성일</div>
                </div>

                {items.map((it) => (
                    <div key={it.inquiryId} css={S.row} onClick={() => navigate(String(it.inquiryId))}>
                    <div css={S.cell}>{it.inquiryId}</div>
                    <div css={S.cell}>
                        <span css={S.statusPill(it.status)}>{it.status}</span>
                    </div>
                    <div css={S.cell} style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {it.title}
                    </div>
                    <div css={[S.cell, S.muted]}>{it.createdAt}</div>
                    </div>
                ))}

                {!loading && items.length === 0 && <div css={S.empty}>데이터가 없습니다.</div>}
                </div>

                <div css={S.footer}>
                <button css={S.pageBtn} disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                    이전
                </button>

                <div css={S.pageInfo}>
                    {page} / {totalPages}
                </div>

                <button css={S.pageBtn} disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
                    다음
                </button>
                </div>
            </div>
        </div>
    );
}