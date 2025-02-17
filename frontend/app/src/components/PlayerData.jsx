import { CircularProgress, Typography, Box } from "@mui/material";
import Grid from '@mui/material/Grid2';
import DashboardContainer from "./DashboardContainer";
import useWgPlayerDetails from "../hooks/useWgPlayerDetails";
import { formatTimestamp } from "../utils/formatTimestamp";

const PlayerData = ({ player }) => {
  const { playerDetails, loading, error } = useWgPlayerDetails(player.wg_player_id);

  if (loading || !playerDetails) {
    return (
      <DashboardContainer>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
          <CircularProgress />
        </Box>
      </DashboardContainer>
    );
  }

  if (error) {
    return (
      <DashboardContainer>
        <Typography color="error">Error loading player data: {error}</Typography>
      </DashboardContainer>
    );
  }

  const battles = playerDetails.statistics.battles;
  const winRate = ((playerDetails.statistics.wins / playerDetails.statistics.battles) * 100).toFixed(2) + "%";
  const surviveRate = (playerDetails.statistics.survived_battles / playerDetails.statistics.battles).toFixed(2);
  const registeredAt = formatTimestamp(playerDetails.created_at);
  const lastBattle = formatTimestamp(playerDetails.last_battle_time);
  const tankingFactor = playerDetails.statistics.tanking_factor;

  return (
    <DashboardContainer>
      <Grid container spacing={1}>
      <Grid size={12}><Typography variant="h6">Player data:</Typography></Grid>
        <Grid size={4}>Battles:</Grid>
        <Grid size={8}>{battles}</Grid>
        <Grid size={4}>Win Rate:</Grid>
        <Grid size={8}>{winRate}</Grid>
        <Grid size={4}>Survive Rate:</Grid>
        <Grid size={8}>{surviveRate}</Grid>
        <Grid size={4}>Tanking factor:</Grid>
        <Grid size={8}>{tankingFactor}</Grid>
        <Grid size={12}><Typography variant="h6">Account data:</Typography></Grid>
        <Grid size={4}>Registered:</Grid>
        <Grid size={8}>{registeredAt}</Grid>
        <Grid size={4}>Last Battle:</Grid>
        <Grid size={8}>{lastBattle}</Grid>
      </Grid>
    </DashboardContainer>
  );
};

export default PlayerData;