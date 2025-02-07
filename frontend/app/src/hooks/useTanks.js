import { useState, useEffect } from "react";
import { getAllTanks } from "../api/tankApi";

export const useTanks = (page = 1, limit = 50) => {
  const [tanks, setTanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTanks = async () => {
      try {
        const data = await getAllTanks(page, limit);
        setTanks(data.data);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTanks();
  }, [page, limit]);

  return { tanks, loading, error, totalPages };
};