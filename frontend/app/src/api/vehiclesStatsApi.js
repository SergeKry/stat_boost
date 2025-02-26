import apiClient from "./apiClient";

export const updateVehiclesStats = async (wgPlayerId) => {
    const response = await apiClient.post(`/vehicles-stats/${wgPlayerId}`);
    return response.data;
};

export const getVehiclesStats = async (wgPlayerId) => {
    const response = await apiClient.get(`/vehicles-stats/${wgPlayerId}`);
    return response.data;
};