import { useState, useEffect } from "react";
import { getAllTanks } from "../api/tankApi";

export const useTanks = () => {
  const [tanks, setTanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTanks = async () => {
      try {
        const data = await getAllTanks();
        setTanks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTanks();
  }, []);

  return { tanks, loading, error };
};