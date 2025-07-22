import apiClient from "./apiClient";

export const updateVehiclesStats = async (wgPlayerId) => {
    
    const response = await apiClient.post(`/vehicles-stats/${wgPlayerId}`);
    return response.data;
};

export const getVehiclesStats = async (wgPlayerId, actual, tankId) => {

    const params = new URLSearchParams();
        if (actual !== undefined && actual !== null) params.append("actual", actual);
        if (tankId !== undefined && tankId !== null) params.append("tank_id", tankId);

    const response = await apiClient.get(
        `/vehicles-stats/${wgPlayerId}?${params.toString()}`,
    );
    return response.data;
};