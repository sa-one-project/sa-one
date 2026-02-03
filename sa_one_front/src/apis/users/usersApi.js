import axiosInstance from "../axiosInstance";

export const deleteUserAccount = async () => {
    const response = await axiosInstance.delete("/api/owner/withdraw");
    return response.data;
};