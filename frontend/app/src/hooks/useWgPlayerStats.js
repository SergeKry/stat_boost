import { useState, useEffect } from "react";
import { getPlayerStats } from "../api/playerStatsAPI";

const useWgPlayerStats = (playerId) => {
  const [playerStats, setPlayerStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!playerId) return;

    const fetchPlayerStats = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getPlayerStats(playerId);
        const normalized = Array.isArray(data)
          ? data
          : (data && (data[playerId] || Object.values(data)[0])) || [];
        setPlayerStats(normalized);
      } catch (err) {
        setError(err.message || "Error fetching player statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerStats();
  }, [playerId]);

  return { playerStats, loading, error };
};

export default useWgPlayerStats;