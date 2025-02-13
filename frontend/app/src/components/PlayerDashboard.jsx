import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PlayerData from "./PlayerData";
import { formatTimestamp } from "../utils/formatTimestamp";

function PlayerDashboard({ player }) {
  return (
    <>
      <Typography variant="h3">{player.nickname}</Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", pb: 2 }}>
        <Typography variant="subtitle2">{player.wg_player_id}</Typography>
        <Typography variant="subtitle2">Last updated: {formatTimestamp(player.updated_at)}</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid size={6}>
          <PlayerData player={player} />
        </Grid>
        <Grid size={6}>
          <Typography>Latest rank change</Typography>
          <Typography>Statistics chart</Typography>
          <Typography>Possibly something else</Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default PlayerDashboard;
