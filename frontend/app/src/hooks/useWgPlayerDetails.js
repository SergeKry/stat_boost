import { useState, useEffect } from "react";
import { getWgPlayerDetails } from "../api/wgPlayerApi";

const useWgPlayerDetails = (playerId) => {
  const [playerDetails, setPlayerDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!playerId) return;

    const fetchPlayerDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getWgPlayerDetails(playerId);
        setPlayerDetails(data);
      } catch (err) {
        setError(err.message || "Error fetching player details");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerDetails();
  }, [playerId]);

  return { playerDetails, loading, error };
};

export default useWgPlayerDetails;
