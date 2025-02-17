import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import PlayerDashboard from "../components/PlayerDashboard";
import { formatTimestamp } from "../utils/formatTimestamp";

function PlayerDetails() {
  const [tabIndex, setTabIndex] = useState(0);
  const location = useLocation();
  const player = location.state?.player;

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  if (!player) {
    return <Typography variant="h6">No player selected.</Typography>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "calc(100vh - 100px)", width: "100%", bgcolor: "background.paper", p: 2 }}>
      <Typography variant="h3">{player.nickname}</Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", pb: 2 }}>
        <Typography variant="subtitle2">{player.wg_player_id}</Typography>
        <Typography variant="subtitle2">
          Last updated: {formatTimestamp(player.updated_at)}
        </Typography>
      </Box>
      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="Profile" />
        <Tab label="Statistics" />
        <Tab label="Boost Options" />
      </Tabs>
      <Box sx={{ py: 3, flexGrow: 1 }}>
        {tabIndex === 0 && <PlayerDashboard player={player} />}
        {tabIndex === 1 && (
          <Typography variant="h6">Statistics Content Goes Here</Typography>
        )}
        {tabIndex === 2 && (
          <Typography variant="h6">Boost Options Content Goes Here</Typography>
        )}
      </Box>
    </Box>
  );
}

export default PlayerDetails;
