import axiosInstance from "./axiosInstance";

export async function fetchAdminInquiries({ status, keyword, page = 1, size = 10 }) {
    const res = await axiosInstance.get("/api/admin/inquiries", {
        params: { status, keyword, page, size },
    });
    return res.data;
}

export async function fetchAdminInquiryDetail(id) {
    const res = await axiosInstance.get(`/api/admin/inquiries/${id}`);
    return res.data;
}

export async function updateAdminInquiryStatus(id, status) {
    await axiosInstance.patch(`/api/admin/inquiries/${id}/status`, { status });
}

export async function addAdminInquiryComment(id, content) {
    await axiosInstance.post(`/api/admin/inquiries/${id}/comments`, { content });
}