import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPayrollList } from "../../apis/payroll/payrollApi";

function fmtYm(yyyymm) {
    if (!yyyymm || yyyymm.length !== 6) return yyyymm;
    return `${yyyymm.slice(0, 4)}-${yyyymm.slice(4, 6)}`;
}

function PayrollListPage() {
    const [rows, setRows] = useState([]);
    const [err, setErr] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPayrollList()
        .then(setRows)
        .catch((e) => setErr(e.message));
    }, []);

    if (err) return <div>에러: {err}</div>;

    return (
        <div>
        <h2>급여명세서</h2>

        <table border="1" cellPadding="8" cellSpacing="0">
            <thead>
            <tr>
                <th>월</th>
                <th>상태</th>
                <th>총급여</th>
                <th>총공제</th>
                <th>실수령</th>
                <th>상세</th>
            </tr>
            </thead>
            <tbody>
            {rows.map((r) => (
                <tr key={r.payslipYearMonth}>
                <td>{fmtYm(r.payslipYearMonth)}</td>
                <td>{r.status}</td>
                <td>{Number(r.grossPay ?? 0).toLocaleString()}</td>
                <td>{Number(r.totalDeduction ?? 0).toLocaleString()}</td>
                <td>{Number(r.netPay ?? 0).toLocaleString()}</td>
                <td>
                    <button onClick={() => navigate(`/payroll/${r.payslipYearMonth}`)}>
                    보기
                    </button>
                </td>
                </tr>
            ))}
            {rows.length === 0 && (
                <tr>
                <td colSpan="6">데이터가 없습니다.</td>
                </tr>
            )}
            </tbody>
        </table>
        </div>
    );
}

export default PayrollListPage;