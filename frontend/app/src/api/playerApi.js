import apiClient from "./apiClient";

export const getAllPlayers = async () => {
  const response = await apiClient.get("/players/");
  return response.data;
};

export const createPlayer = async (playerData) => {
  if (!playerData) {
    throw new Error("Player data is required for creating a player.");
  }
  const response = await apiClient.post("/players/", playerData, {
    headers: { "Content-Type": "application/json" },
  });

  return response.data;
};

export const deletePlayer = async (playerId) => {
  if (!playerId) {
    throw new Error("Player ID is required for creating a player.");
  }
  const response = await apiClient.delete(`/players/${playerId}`);
  return response.data;
};
