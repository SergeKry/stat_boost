import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import PlayerDashboard from "../components/PlayerDashboard";

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
    <Box sx={{ width: "100%", bgcolor: "background.paper", p: 2 }}>
      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="Profile" />
        <Tab label="Statistics" />
        <Tab label="Boost Options" />
      </Tabs>
      <Box sx={{ p: 3 }}>
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
