import { useState, useEffect } from "react";
import { getAllPlayers } from "../api/playerApi";

export const useGetPlayers = (refreshTrigger) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        const data = await getAllPlayers();
        setPlayers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
  }, [refreshTrigger]);

  return { players, loading, error };
};
