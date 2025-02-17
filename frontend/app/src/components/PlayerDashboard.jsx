import { Box, Container, Typography } from "@mui/material";
import PlayerData from "./PlayerData";
import LatestRankChange from "./LatestRankChange";
import StatisticsChart from "./StatisticsChart";
import SomethingElseChart from "./SomethingElseChart";
import { formatTimestamp } from "../utils/formatTimestamp";
import Grid from '@mui/material/Grid2';

function PlayerDashboard({ player }) {
  return (
    <>
      <Grid container spacing={2} sx={{ height: "100%" }}>
        <Grid size={5} sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <PlayerData player={player} />
        </Grid>
        <Grid size={7} sx={{ display: "flex", flexDirection: "column", gap: 2, height: "100%" }}>
            <LatestRankChange />
            <StatisticsChart />
            <SomethingElseChart />
        </Grid>
      </Grid>
    </>
  );
}

export default PlayerDashboard;
