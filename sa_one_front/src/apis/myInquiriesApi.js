import { useAuthStore } from "../stores/useAuthStore";
import axiosInstance from "./axiosInstance";

function getInquiryBasePath(roleId) {
    if (roleId === 1) return "/api/admin/inquiries";
    if (roleId === 2) return "/api/owner/inquiries";
    return "/api/employee/inquiries"; // 3=STAFF
}

function getRoleId() {
    const roleId = useAuthStore.getState().roleId;
    if (!roleId) throw new Error("roleId가 없습니다. 로그인 상태를 확인하세요.");
    return roleId;
}

export async function fetchMyInquiries({ status, keyword, page, size }) {
    const base = getInquiryBasePath(getRoleId());
    const res = await axiosInstance.get(base, { params: { status, keyword, page, size } });
    return res.data;
}

export async function fetchMyInquiryDetail(id) {
    const base = getInquiryBasePath(getRoleId());
    const res = await axiosInstance.get(`${base}/${id}`);
    return res.data;
}

export async function createMyInquiry({ storeId = null, title, content }) {
    const base = getInquiryBasePath(getRoleId());
    await axiosInstance.post(base, { storeId, title, content });
}

export async function addMyInquiryComment(id, content) {
    const base = getInquiryBasePath(getRoleId());
    await axiosInstance.post(`${base}/${id}/comments`, { content });
}

export async function updateMyInquiryStatus(id, status) {
    const base = getInquiryBasePath(getRoleId());
    await axiosInstance.patch(`${base}/${id}/status`, { status });
}