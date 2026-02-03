import axiosInstance from "../apis/axiosInstance";

export async function initStoreIdIfNeeded() {
    const existing = Number(localStorage.getItem("storeId"));
    if (existing) return existing;

    const res = await axiosInstance.get("/api/stores/me");
    const stores = res.data;

    if (Array.isArray(stores) && stores.length > 0) {
        const firstStoreId = stores[0].storeId;
        localStorage.setItem("storeId", String(firstStoreId));
        return firstStoreId;
    }

    return null;
}