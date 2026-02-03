import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../../pages/auth/stores/useAuthStore";
import { fetchMyInquiries } from "../../apis/myInquiriesApi";

const STATUS_OPTIONS = ["", "OPEN", "IN_PROGRESS", "CLOSED"];

export default function MyInquiriesPage() {
    const navigate = useNavigate();
    const [sp, setSp] = useSearchParams();

    const { roleId } = useAuthStore();

    const [status, setStatus] = useState(sp.get("status") || "");
    const [keyword, setKeyword] = useState(sp.get("keyword") || "");
    const [page, setPage] = useState(Number(sp.get("page") || 1));
    const size = 10;

    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const totalPages = useMemo(() => Math.max(1, Math.ceil(total / size)), [total, size]);

    const load = async () => {
        setLoading(true);
        setError("");

        try {
            const res = await fetchMyInquiries(roleId, { status, keyword, page, size });
            setItems(res.items || []);
            setTotal(res.total || 0);
        } catch (e) {
            setError(e.response?.data?.message || "문의 목록 조회 실패");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setSp((prev) => {
            const next = new URLSearchParams(prev);
            status ? next.set("status", status) : next.delete("status");
            keyword ? next.set("keyword", keyword) : next.delete("keyword");
            next.set("page", String(page));
            return next;
        });
    }, [status, keyword, page]);

    useEffect(() => {
        load();
    }, [status, keyword, page]);

    const onSubmitSearch = () => {
        setPage(1);
        load();
    };

    return (
        <div>
            <h2>내 문의</h2>

            <div>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                            {s || "전체"}
                        </option>
                    ))}
                </select>

                <input
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="검색어"
                />

                <button onClick={onSubmitSearch}>검색</button>

                <button onClick={() => navigate("new")}>문의 작성</button>
            </div>

            {loading && <div>로딩중.</div>}
            {error && <div>{error}</div>}

            <div>
                <div>
                    <div>ID</div>
                    <div>상태</div>
                    <div>제목</div>
                    <div>작성일</div>
                </div>

                {items.map((it) => (
                    <div key={it.inquiryId} onClick={() => navigate(String(it.inquiryId))}>
                        <div>{it.inquiryId}</div>
                        <div>{it.status}</div>
                        <div>{it.title}</div>
                        <div>{it.createdAt}</div>
                    </div>
                ))}

                {!loading && items.length === 0 && <div style={{ padding: 12 }}>데이터가 없습니다.</div>}
            </div>

            <div>
                <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                    이전
                </button>

                <div>
                    {page} / {totalPages}
                </div>

                <button disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
                    다음
                </button>
            </div>
        </div>
    );
}