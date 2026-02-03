import axiosInstance from "./axiosInstance";

export async function fetchPayrollList(storeId) {
    const res = await axiosInstance.get("/api/payrolls/me", {
        params: { storeId },
    });
    return res.data;
}

export async function fetchPayrollDetail(storeId, yyyyMM) {
    const res = await axiosInstance.get(`/api/payrolls/me/${yyyyMM}`, {
        params: { storeId },
    });
    return res.data;
}