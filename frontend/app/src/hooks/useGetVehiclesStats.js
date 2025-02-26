import { useState, useEffect } from "react";
import { getVehiclesStats } from "../api/vehiclesStatsApi";

export const useGetVehiclesStats = (playerId) => {
  const [vehiclesStats, setVehiclesStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log("useGetVehiclesStats properly mounted")

  useEffect(() => {
    if (!playerId) return;

    const fetchVehiclesStats = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getVehiclesStats(playerId);
        console.log("data received")
        setVehiclesStats(data[String(playerId)]);
      } catch (err) {
        setError(err.message || "Error fetching vehicles stats");
      } finally {
        setLoading(false);
      }
    };

    fetchVehiclesStats();
  }, [playerId]);

  return { vehiclesStats, loading, error };
};