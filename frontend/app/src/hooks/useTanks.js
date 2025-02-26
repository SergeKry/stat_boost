import { useState, useEffect } from "react";
import { getAllTanks } from "../api/tankApi";

export const useTanks = (page = 1, limit = 2000, sortBy = "name", order = "asc", search = "", refreshTrigger) => {
  const [tanks, setTanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState(search);


  // Apply delay 1 sec before search starts
  useEffect(() => {
    const handler = setTimeout(() => {
        setDebouncedSearch(search);
    }, 1000);

    return () => clearTimeout(handler);
  }, [search]);

  // Fetch data
  useEffect(() => {
    const fetchTanks = async () => {
      try {
        setLoading(true);
        const data = await getAllTanks(page, limit, sortBy, order, debouncedSearch);
        setTanks(data.data);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTanks();
  }, [page, limit, sortBy, order, debouncedSearch, refreshTrigger]);

  return { tanks, loading, error, totalPages };
};