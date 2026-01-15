// src/configs/axiosConfig.js
import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080",
});

api.interceptors.request.use(config => {
    const accessToken = localStorage.getItem("AccessToken");
    // 토큰이 있으면 헤더에 실어서 보냄
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});