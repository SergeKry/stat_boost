import apiClient from "./apiClient";

export const getAllTanks = async (page = 1, limit = 50) => {
    const response = await apiClient.get(`/expected-values/?page=${page}&limit=${limit}`);
    return response.data;
};

export const updateAllTanks = async () => {
    const response = await apiClient.post("/expected-values")
    return response.data
};