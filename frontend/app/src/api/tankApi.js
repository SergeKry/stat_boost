import apiClient from "./apiClient";

export const getAllTanks = async (page = 1, limit = 50, sortBy = "wg_tank_id", order = "asc") => {
    const response = await apiClient.get(`/expected-values/?page=${page}&limit=${limit}&sort_by=${sortBy}&order=${order}`);
    return response.data;
};

export const updateAllTanks = async () => {
    const response = await apiClient.post("/expected-values")
    return response.data
};