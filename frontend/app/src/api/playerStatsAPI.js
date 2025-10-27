import apiClient from "./apiClient";

export const updatePlayerStats = async (wgPlayerId) => {
    
    const response = await apiClient.post(`/player-stats/${wgPlayerId}`);
    return response.data;
};

export const getPlayerStats = async (wgPlayerId, actual) => {

    const params = new URLSearchParams();
        if (actual !== undefined && actual !== null) params.append("actual", actual);

    const response = await apiClient.get(
        `/player-stats/${wgPlayerId}?${params.toString()}`,
    );
    return response.data;
};