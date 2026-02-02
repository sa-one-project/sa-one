import { http } from "./http";

function getBasePath(roleId) {
    return Number(roleId) === 1 ? "/api/owner/inquiries" : "/api/employee/inquiries";
}

export async function fetchMyInquiries(roleId, { status, keyword, page = 1, size = 10 }) {
    const basePath = getBasePath(roleId);
    const res = await http.get(basePath, {
        params: { status, keyword, page, size },
    });
    return res.data;
}

export async function fetchMyInquiryDetail(roleId, id) {
    const basePath = getBasePath(roleId);
    const res = await http.get(`${basePath}/${id}`);
    return res.data;
}

export async function createMyInquiry(roleId, { storeId = null, title, content }) {
    const basePath = getBasePath(roleId);
    await http.post(basePath, { storeId, title, content });
}

export async function addMyInquiryComment(roleId, id, content) {
    const basePath = getBasePath(roleId);
    await http.post(`${basePath}/${id}/comments`, { content });
}