import { http } from "./http";

export async function fetchAdminInquiries({ status, keyword, page = 1, size = 10 }) {
    const res = await http.get("/api/admin/inquiries", {
        params: { status, keyword, page, size },
    });
    return res.data;
}

export async function fetchAdminInquiryDetail(id) {
    const res = await http.get(`/api/admin/inquiries/${id}`);
    return res.data;
}

export async function updateAdminInquiryStatus(id, status) {
    await http.patch(`/api/admin/inquiries/${id}/status`, { status });
}

export async function addAdminInquiryComment(id, content) {
    await http.post(`/api/admin/inquiries/${id}/comments`, { content });
}