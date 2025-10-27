import { Box, CircularProgress, Typography } from "@mui/material";
import DashboardContainer from "./DashboardContainer";
import useWgPlayerStats from "../hooks/useWgPlayerStats";
import StatsChart from "./StatsChart";

function LatestRankChange({ player }) {
  const { playerStats, loading, error } = useWgPlayerStats(player.wg_player_id);

  if (loading || !playerStats) {
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
        <Typography color="error">Error loading player stats: {error}</Typography>
      </DashboardContainer>
    );
  }

const statsChartRawData = (playerStats || [])
    .map((item) => ({
      x: item.player_battles,
      y: item.wn8,
    }))
    .reverse();

  const statsChartData = [
    {
      id: "WN8 progression",
      data: statsChartRawData,
    },
  ];

  return (
      <DashboardContainer>
        <StatsChart statsChartData={statsChartData} />
      </DashboardContainer>
  );
}

export default LatestRankChange;