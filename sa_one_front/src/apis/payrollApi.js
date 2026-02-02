import { http } from "../../../../apis/http";

export async function fetchPayrollList(storeId) {
    const res = await http.get("/api/payrolls/me", {
        params: { storeId },
    });
    return res.data;
}

export async function fetchPayrollDetail(storeId, yyyyMM) {
    const res = await http.get(`/api/payrolls/me/${yyyyMM}`, {
        params: { storeId },
    });
    return res.data;
}