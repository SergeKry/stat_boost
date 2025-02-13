import apiClient from "./apiClient";

export const searchWgPlayers = async (query) => {
    const response = await apiClient.get(`/wg_player/?search=${query}`);
    return response.data;
};

export const getWgPlayerDetails = async (wgPlayerId) => {
    const response = await apiClient.get(`/wg_player/${wgPlayerId}`);
    return response.data;
};