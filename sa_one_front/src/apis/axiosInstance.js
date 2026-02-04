import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");

    const url = config.url || "";
    const isAuthRequest = url.startsWith("/api/auth/");

    config.headers = config.headers ?? {};

    if (token && !isAuthRequest) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        delete config.headers.Authorization;
    }

    return config;
});

axiosInstance.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            console.warn("인증 만료");
        }
        return Promise.reject(err);
    }
);

export default axiosInstance;