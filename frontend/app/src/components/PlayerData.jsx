import { Typography } from "@mui/material";
import DashboardContainer from "./DashboardContainer";

function PlayerData({ player }) {
  return (
    <>
      <DashboardContainer>
        <Typography>WG API Player data</Typography>
      </DashboardContainer>
    </>
  );
}

export default PlayerData;
