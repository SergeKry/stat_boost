import { useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import PlayerCard from "./PlayerCard";
import { useGetPlayers } from "../hooks/useGetPlayers";

function PlayersList() {
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const { players, loading, error } = useGetPlayers(refreshTrigger);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>Error: {error}</p>;
  }

  return (
    <>
      {players.map((player) => (
        <PlayerCard key={player.id} player={player} />
      ))}
    </>
  );
}

export default PlayersList;
