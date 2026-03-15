/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { fetchAdminDashboard } from "../apis/adminDashboardApi";
import * as S from "./styles";

export default function AdminDashboardPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const run = async () => {
            setLoading(true);
            setError("");

            try {
                const res = await fetchAdminDashboard();
                setData(res);
            } catch (e) {
                setError(e.response?.data?.message || "대시보드 조회 실패");
            } finally {
                setLoading(false);
            }
        };

        run();
    }, []);

    if (loading) return <div>로딩중.</div>;
    if (error) return <div style={{ color: "red" }}>{error}</div>;
    if (!data) return null;

    const alerts = data.policyAlerts || {};

    return (
    <div css={S.page}>
        <div css={S.card}>
            <div css={S.headerRow}>
            <div>
                <h2>관리자 대시보드</h2>
                <p className="sub">매장/문의/정책 현황을 한 번에 확인합니다.</p>
            </div>
            </div>

            <div css={S.statGrid}>
            <div css={S.statCard}>
                <div className="label">보류중 매장 신청</div>
                <div className="value">{data.pendingApplications}</div>
            </div>

            <div css={S.statCard}>
                <div className="label">미처리 문의(OPEN)</div>
                <div className="value">{data.openInquiries}</div>
            </div>

            <div css={S.statCard}>
                <div className="label">매장 수</div>
                <div className="value">{data.storeCount}</div>
            </div>

            <div css={S.statCard}>
                <div className="label">직원 수</div>
                <div className="value">{data.employeeCount}</div>
            </div>

            <div css={S.statCard}>
                <div className="label">급여명세서 수</div>
                <div className="value">{data.payrollCount}</div>
            </div>
            </div>

            <div css={S.section}>
            <h3>정책 알림</h3>

            {Object.keys(alerts).length === 0 ? (
                <div style={{ color: "#6b7280", fontWeight: 700 }}>현재 알림이 없습니다.</div>
            ) : (
                <div css={S.alertList}>
                {Object.entries(alerts).map(([key, value]) => (
                    <div
                    key={key}
                    css={S.alertItem}
                    className={value ? "ok" : "danger"}
                    >
                    <div className="key">{key}</div>
                    <div className="badge">{value ? "완료" : "미등록"}</div>
                    </div>
                ))}
                </div>
            )}
            </div>
        </div>
    </div>
  );
}