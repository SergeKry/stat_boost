import { useState } from "react";
import { updatePlayerStats } from "../api/playerStatsAPI";

export const useUpdatePlayerStats = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const updateStats = async (playerId) => {
    if (!playerId) {
      setError("Player ID is required");
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(false);
    setMessage("");

    try {
      const response = await updatePlayerStats(playerId);
      const message = response.message;

      setMessage(message);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { updateStats, loading, error, success, message };
};