import axiosInstance from "./axiosInstance";

export async function fetchMyInquiries({ status, keyword, page, size }) {
  const res = await axiosInstance.get("/api/my/inquiries", {
    params: { status, keyword, page, size },
  });
  return res.data;
}

export async function fetchMyInquiryDetail(id) {
  const res = await axiosInstance.get(`/api/my/inquiries/${id}`);
  return res.data;
}

export async function createMyInquiry({ storeId = null, title, content }) {
  await axiosInstance.post("/api/my/inquiries", {
    storeId,
    title,
    content,
  });
}

export async function addMyInquiryComment(id, content) {
  await axiosInstance.post(`/api/my/inquiries/${id}/comments`, { content });
}