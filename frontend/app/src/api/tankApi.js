import apiClient from "./apiClient";

export const getAllTanks = async () => {
    const response = await apiClient.get("/expected-values/")
    return response.data
};

export const updateAllTanks = async () => {
    const response = await apiClient.post("/expected-values")
    return response.data
};