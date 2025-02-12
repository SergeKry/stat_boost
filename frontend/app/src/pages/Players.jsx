import PlayersList from "../components/PlayersList";
import PlayerCreateCard from "../components/PlayerCreateCard";
import Box from '@mui/material/Box';

const Players = () => {

  return (
    <>
      <h1>Players</h1>
      <Box style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <PlayersList />
        <PlayerCreateCard />
      </Box>
    </>
  );
};

export default Players;
