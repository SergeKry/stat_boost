import apiClient from "./apiClient";

export const getAllPlayers = async () => {
    const response = await apiClient.get("/players/");
    return response.data;
};