import { useState, useEffect } from "react";
import { getVehiclesStats } from "../api/vehiclesStatsApi";

export const useGetVehiclesStats = (playerId, actual, tankId, refreshTrigger) => {
  const [vehiclesStats, setVehiclesStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!playerId) return;

    const fetchVehiclesStats = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getVehiclesStats(playerId, actual, tankId);
        setVehiclesStats(data[String(playerId)]);
      } catch (err) {
        setError(err.message || "Error fetching vehicles stats");
      } finally {
        setLoading(false);
      }
    };

    fetchVehiclesStats();
  }, [playerId, actual, tankId, refreshTrigger]);

  return { vehiclesStats, loading, error };
};