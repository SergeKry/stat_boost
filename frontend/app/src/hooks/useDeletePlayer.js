import { useState } from "react";
import { deletePlayer } from "../api/playerApi";

const useDeletePlayer = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const removePlayer = async (player, onSuccess) => {
    if (!player) return;

    try {
      setLoading(true);
      await deletePlayer(player.id);
      setSuccessMessage("Player deleted");
      onSuccess();
    } catch (error) {
      console.error("Error deleting player:", error);
    } finally {
      setLoading(false);
    }
  };

  return { removePlayer, loading, successMessage, setSuccessMessage };
};

export default useDeletePlayer;