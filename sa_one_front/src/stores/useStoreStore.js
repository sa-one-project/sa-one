import { create } from "zustand";
import axiosInstance from "../apis/axiosInstance";

export const useStoreStore = create((set, get) => ({
    stores: [],
    selectedStoreId: localStorage.getItem("selectedStoreId")
        ? Number(localStorage.getItem("selectedStoreId"))
        : null,

    setStores: (stores) => set({ stores }),

    setSelectedStoreId: (storeId) => {
        const id = storeId ? Number(storeId) : null;
        if (id) localStorage.setItem("selectedStoreId", String(id));
        else localStorage.removeItem("selectedStoreId");
        set({ selectedStoreId: id });
    },

    fetchMyStores: async () => {
        const res = await axiosInstance.get("/api/stores/me");
        const stores = Array.isArray(res.data) ? res.data : [];
        set({ stores });

        const { selectedStoreId } = get();
        const valid = stores.some((s) => Number(s.storeId) === Number(selectedStoreId));
        if (!valid && stores.length > 0) {
            localStorage.setItem("selectedStoreId", String(stores[0].storeId));
            set({ selectedStoreId: Number(stores[0].storeId) });
        }

        return stores;
    },
}));