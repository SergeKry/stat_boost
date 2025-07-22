import { useState, useEffect } from "react";
import { getOneTank } from "../api/tankApi";

export const useGetOneTank = (wgTankId) => {
  const [tankDetails, setTankDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!wgTankId) return;

    const fetchTankDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getOneTank(wgTankId);
        setTankDetails(data);
      } catch (err) {
        setError(err.message || "Error fetching expected values");
      } finally {
        setLoading(false);
      }
    };

    fetchTankDetails();
  }, [wgTankId]);

  return { tankDetails, loading, error };
};