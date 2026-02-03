import axiosInstance from "../axiosInstance";

export const deleteUserAccount = async () => {
    const response = await axiosInstance.delete("/api/auth/deleteuser");
    return response.data;
};