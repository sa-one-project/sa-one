import axiosInstance from "./axiosInstance";

export async function fetchAdminDashboard() {
    const res = await axiosInstance.get("/api/admin/dashboard");
    return res.data;
}