import React, { useEffect, useState } from "react";
import { fetchAdminDashboard } from "../apis/adminDashboardApi";

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
        <div>
            <h2>관리자 대시보드</h2>

            <div>
                <div>
                    <div>보류중 매장 신청</div>
                    <div>{data.pendingApplications}</div>
                </div>

                <div>
                    <div>미처리 문의(OPEN)</div>
                    <div>{data.openInquiries}</div>
                </div>
            </div>

            <div>
                <h3>정책 알림</h3>

                {Object.keys(alerts).length === 0 && <div>현재 알림이 없습니다.</div>}

                {Object.entries(alerts).map(([key, value]) => (
                    <div key={key}>
                        <div>
                            {key} : {value ? "완료" : "미등록"}
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <div>
                    <div>매장 수</div>
                    <div>{data.storeCount}</div>
                </div>

                <div>
                    <div>직원 수</div>
                    <div>{data.employeeCount}</div>
                </div>

                <div>
                    <div>급여명세서 수</div>
                    <div>{data.payrollCount}</div>
                </div>
            </div>
        </div>
    );
}