import { useState } from "react";
import { createPlayer } from "../api/playerApi";

const useCreatePlayer = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const addPlayer = async (selectedPlayer, onSuccess) => {
    if (!selectedPlayer) return;

    const formattedPlayer = {
      nickname: selectedPlayer.label,
      wg_player_id: selectedPlayer.wgPlayerId,
    };

    try {
      setLoading(true);
      await createPlayer(formattedPlayer);
      setSuccessMessage("Player added");
      onSuccess();
    } catch (error) {
      console.error("Error adding player:", error);
    } finally {
      setLoading(false);
    }
  };

  return { addPlayer, loading, successMessage, setSuccessMessage };
};

export default useCreatePlayer;
