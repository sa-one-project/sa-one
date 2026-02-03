import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPayrollList } from "../../apis/payrollApi";
import { initStoreIdIfNeeded } from "../../utils/initStoreId";

function PayrollListPage() {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const run = async () => {
            const storeId = await initStoreIdIfNeeded();
            if (!storeId) return;

            const data = await fetchPayrollList(storeId);
            setItems(data);
        };

        run().catch(console.error);
    }, []);

    return (
        <div>
            <h2>급여명세서</h2>

            <table>
                <thead>
                    <tr>
                        <th>월</th>
                        <th>총 지급액</th>
                        <th>총 공제액</th>
                        <th>실수령액</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((p) => (
                        <tr
                            key={p.payrollId}
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate(`/payrolls/${p.payslipYearMonth}`)}
                        >
                            <td>{p.payslipYearMonth}</td>
                            <td>{Number(p.grossPay ?? 0).toLocaleString()}</td>
                            <td>{Number(p.totalDeduction ?? 0).toLocaleString()}</td>
                            <td>{Number(p.netPay ?? 0).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PayrollListPage;