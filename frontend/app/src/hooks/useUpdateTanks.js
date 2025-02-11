import { useState } from "react";
import { updateAllTanks } from "../api/tankApi";

export const useUpdateTanks = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const updateTanks = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setMessage("");

    try {
      const response = await updateAllTanks();
      const { tanksAdded, tanksUpdated } = response.message;

      const message = `Added: ${tanksAdded}, Updated: ${tanksUpdated}`
      setMessage(message);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { updateTanks, loading, error, success, message };
};
