import { useState, useEffect } from "react";
import { getAllTanks } from "../api/tankApi";

export const useTanks = (page = 1, limit = 50, sortBy = "wg_tank_id", order = "asc") => {
  const [tanks, setTanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTanks = async () => {
      try {
        const data = await getAllTanks(page, limit, sortBy, order);
        setTanks(data.data);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTanks();
  }, [page, limit, sortBy, order]);

  return { tanks, loading, error, totalPages };
};