import { useState } from "react";
import PlayersList from "../components/PlayersList";
import PlayerCreateCard from "../components/PlayerCreateCard";
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";

const Players = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  return (
    <>
      <Typography variant="h3">Players</Typography>
      <Box style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <PlayersList refreshTrigger={refreshTrigger} setRefreshTrigger={setRefreshTrigger} />
        <PlayerCreateCard setRefreshTrigger={setRefreshTrigger} />
      </Box>
    </>
  );
};

export default Players;
