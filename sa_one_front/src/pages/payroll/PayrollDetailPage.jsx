import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPayrollDetail } from "../../apis/payroll/payrollApi";

function fmtYm(yyyymm) {
    if (!yyyymm || yyyymm.length !== 6) return yyyymm;
    return `${yyyymm.slice(0, 4)}-${yyyymm.slice(4, 6)}`;
}

function PayrollDetailPage() {
    const { payslipYearMonth } = useParams();
    const [data, setData] = useState(null);
    const [err, setErr] = useState(null);

    useEffect(() => {
        fetchPayrollDetail(payslipYearMonth)
        .then(setData)
        .catch((e) => setErr(e.message));
    }, [payslipYearMonth]);

    if (err) return <div>에러: {err}</div>;
    if (!data) return <div>Loading...</div>;

    const { payroll, details } = data;

    return (
        <div>
        <h2>급여명세서 상세: {fmtYm(payslipYearMonth)}</h2>

        <h3>요약</h3>
        <table border="1" cellPadding="8" cellSpacing="0">
            <tbody>
            <tr><td>상태</td><td>{payroll.status}</td></tr>
            <tr><td>기간</td><td>{payroll.periodStart} ~ {payroll.periodEnd}</td></tr>
            <tr><td>총급여</td><td>{Number(payroll.grossPay ?? 0).toLocaleString()}</td></tr>
            <tr><td>총공제</td><td>{Number(payroll.totalDeduction ?? 0).toLocaleString()}</td></tr>
            <tr><td>실수령</td><td>{Number(payroll.netPay ?? 0).toLocaleString()}</td></tr>
            </tbody>
        </table>

        <h3>근무 요약</h3>
        <table border="1" cellPadding="8" cellSpacing="0">
            <tbody>
            <tr><td>총 근무(분)</td><td>{payroll.totalWorkMinutes}</td></tr>
            <tr><td>연장(분)</td><td>{payroll.totalOvertimeMinutes}</td></tr>
            <tr><td>야간(분)</td><td>{payroll.totalNightMinutes}</td></tr>
            </tbody>
        </table>

        <h3>급여 항목</h3>
        <table border="1" cellPadding="8" cellSpacing="0">
            <thead>
            <tr>
                <th>항목</th>
                <th>구분</th>
                <th>과세</th>
                <th>분</th>
                <th>단가</th>
                <th>배율</th>
                <th>금액</th>
                <th>메모</th>
            </tr>
            </thead>
            <tbody>
            {details?.map((d, idx) => (
                <tr key={`${d.payrollItemId}-${idx}`}>
                <td>{d.itemName}</td>
                <td>{d.itemType ?? "-"}</td>
                <td>{String(d.taxable ?? "-")}</td>
                <td>{d.minutes ?? "-"}</td>
                <td>{d.unitPrice ?? "-"}</td>
                <td>{d.multiplier ?? "-"}</td>
                <td>{Number(d.amount ?? 0).toLocaleString()}</td>
                <td>{d.memo ?? "-"}</td>
                </tr>
            ))}
            {!details?.length && (
                <tr>
                <td colSpan="8">항목 데이터가 없습니다.</td>
                </tr>
            )}
            </tbody>
        </table>

        <h3>요율(작게 뜨게)</h3>
        <table border="1" cellPadding="8" cellSpacing="0">
            <tbody>
            <tr><td>소득세</td><td>{payroll.incomeTaxRate ?? "-"}</td></tr>
            <tr><td>지방세</td><td>{payroll.localTaxRate ?? "-"}</td></tr>
            <tr><td>국민연금</td><td>{payroll.nationalPensionRate ?? "-"}</td></tr>
            <tr><td>건강보험</td><td>{payroll.healthInsuranceRate ?? "-"}</td></tr>
            <tr><td>고용보험</td><td>{payroll.employmentInsuranceRate ?? "-"}</td></tr>
            </tbody>
        </table>

        <button disabled>PDF 다운로드(추후추가)</button>
        </div>
    );
}

export default PayrollDetailPage;