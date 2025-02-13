import { useState } from "react";
import PlayersList from "../components/PlayersList";
import PlayerCreateCard from "../components/PlayerCreateCard";
import Box from '@mui/material/Box';

const Players = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  return (
    <>
      <h1>Players</h1>
      <Box style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <PlayersList refreshTrigger={refreshTrigger} />
        <PlayerCreateCard setRefreshTrigger={setRefreshTrigger} />
      </Box>
    </>
  );
};

export default Players;
