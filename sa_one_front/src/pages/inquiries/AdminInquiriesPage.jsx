/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchAdminInquiries } from "../../apis/adminInquiriesApi";
import * as S from "./AdminInquiriesStyle";

const STATUS_OPTIONS = ["OPEN", "IN_PROGRESS", "CLOSED"];

export default function AdminInquiriesPage() {
    const navigate = useNavigate();
    const [sp, setSp] = useSearchParams();

    const [status, setStatus] = useState(sp.get("status") || "OPEN");
    const [keyword, setKeyword] = useState(sp.get("keyword") || "");
    const [page, setPage] = useState(Number(sp.get("page") || 1));

    const size = 10;

    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const totalPages = useMemo(() => {
        return Math.max(1, Math.ceil((total || 0) / size));
    }, [total]);

    const syncQuery = (next) => {
        setSp({
            status: next.status,
            keyword: next.keyword,
            page: String(next.page),
        });
    };

    const load = async (params) => {
        setLoading(true);
        setError("");

        try {
            const res = await fetchAdminInquiries(params);
            setItems(res.items || []);
            setTotal(res.total || 0);
        } catch (e) {
            setError(e.response?.data?.message || "문의 목록 조회 실패");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const params = { status, keyword, page, size };
        syncQuery(params);
        load(params);
    }, [status, keyword, page]);

    const onChangeStatus = (e) => {
        const nextStatus = e.target.value;
        setPage(1);
        setStatus(nextStatus);
    };

    const onSubmitSearch = () => {
        setPage(1);
        load({ status, keyword, page: 1, size });
        syncQuery({ status, keyword, page: 1, size });
    };

    return (
        <div css={S.page}>
            <div css={S.card}>
                <div css={S.headerRow}>
                    <div>
                        <h2>관리자 문의함</h2>
                        <p className="sub">문의 상태/검색어 기반으로 조회하고 상세로 이동할 수 있습니다.</p>
                    </div>
                </div>

                <div css={S.toolbar}>
                    <select css={S.select} value={status} onChange={onChangeStatus}>
                        {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                        ))}
                    </select>

                    <input
                        css={S.input}
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="검색어"
                        onKeyDown={(e) => e.key === "Enter" && onSubmitSearch()}
                    />

                    <button css={S.btn} onClick={onSubmitSearch}>검색</button>
                </div>

                {loading && <div css={S.state}>로딩중...</div>}
                {error && <div css={[S.state]} className="error">{error}</div>}

                <div css={S.tableWrap}>
                    <div css={S.tableHead}>
                        <div>ID</div>
                        <div>상태</div>
                        <div>제목</div>
                        <div>작성자</div>
                        <div>작성일</div>
                    </div>

                    {items.map((it) => (
                        <div
                        key={it.inquiryId}
                        css={S.row}
                        onClick={() => navigate(`/admin/inquiries/${it.inquiryId}`)}
                        >
                        <div>{it.inquiryId}</div>
                        <div><span css={S.badge} className={it.status}>{it.status}</span></div>
                        <div>
                            <div className="title">{it.title}</div>
                            <div className="meta">{it.storeName ? `매장: ${it.storeName}` : "매장: -"}</div>
                        </div>
                        <div>{it.userName}</div>
                        <div>{it.createdAt}</div>
                        </div>
                    ))}

                    {!loading && items.length === 0 && (
                        <div style={{ padding: 14, color: "#6b7280", fontWeight: 800 }}>데이터가 없습니다.</div>
                    )}
                </div>

                <div css={S.footer}>
                    <button css={S.btnGhost} disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                        이전
                    </button>

                    <div>{page} / {totalPages}</div>

                    <button css={S.btnGhost} disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
                        다음
                    </button>
                </div>
            </div>
        </div>
    );
}