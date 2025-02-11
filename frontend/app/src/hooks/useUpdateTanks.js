import { useState } from "react";
import { updateAllTanks } from "../api/tankApi";

export const useUpdateTanks = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const updateTanks = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await updateAllTanks();
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { updateTanks, loading, error, success };
};
