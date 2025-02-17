import { Box, Container, Typography } from "@mui/material";
import PlayerData from "./PlayerData";
import LatestRankChange from "./LatestRankChange";
import StatisticsChart from "./StatisticsChart";
import SomethingElseChart from "./SomethingElseChart";
import { formatTimestamp } from "../utils/formatTimestamp";

function PlayerDashboard({ player }) {
  return (
    <>
      <Typography variant="h3">{player.nickname}</Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", pb: 2 }}>
        <Typography variant="subtitle2">{player.wg_player_id}</Typography>
        <Typography variant="subtitle2">
          Last updated: {formatTimestamp(player.updated_at)}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "stretch",
          gap: 2,
          height: "100%",
        }}
      >
        <Box sx={{ flex: 1, display: "flex" }}>
          <PlayerData player={player} />
        </Box>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          <LatestRankChange />
          <StatisticsChart />
          <SomethingElseChart />
        </Box>
      </Box>
    </>
  );
}

export default PlayerDashboard;
