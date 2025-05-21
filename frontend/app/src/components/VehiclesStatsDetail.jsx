import Grid from '@mui/material/Grid2';
import { Box, Button, Typography } from "@mui/material";

const VehiclesStatsDetail = ({ tankDetails, onBack }) => (
  <Box p={2}>
    <Button onClick={onBack}>← Back</Button>
    <Typography variant="h5" sx={{ mt: 2 }}>
      {tankDetails.name}
    </Typography>
    <Grid container spacing={2}>
      <Grid size={2}>
        <Box
            component="img"
            src={tankDetails.big_icon}
            alt={tankDetails.name}
            sx={{
              display: "block",
              width: "100%",
              maxWidth: 200,
              height: "auto",
              mt: 2,
              borderRadius: 1,
            }}
          />
        <Typography>Type: {tankDetails.type}</Typography>
        <Typography>Nation: {tankDetails.nation}</Typography>
        <Typography>Tier: {tankDetails.tier}</Typography>
      </Grid>
      <Grid size={4}>
        <Grid container>
          <Grid size={4}>
            <Typography sx={{ mb: 1 }}>
              `
            </Typography>
            <Typography>Damage:</Typography>
            <Typography>Frag:</Typography>
            <Typography>Winrate:</Typography>
            <Typography>Spot:</Typography>
            <Typography>Def:</Typography>
          </Grid>
          <Grid size={4}>
            <Typography sx={{ mb: 1 }}>Expected</Typography>
            <Typography>{tankDetails.exp_damage.toFixed(0)}</Typography>
            <Typography>{tankDetails.exp_frag}</Typography>
            <Typography>{tankDetails.exp_winrate.toFixed(2)}</Typography>
            <Typography>{tankDetails.exp_spot}</Typography>
            <Typography>{tankDetails.exp_def}</Typography>
          </Grid>
          <Grid size={4}>
            <Typography sx={{ mb: 1 }}>Actual</Typography>
            <Typography>1111</Typography>
            <Typography>0.333</Typography>
            <Typography>50.00</Typography>
            <Typography>1.30</Typography>
            <Typography>0.600</Typography>
          </Grid>
          <Grid size={12}>
          <Typography sx={{ mt: 2 }}>WN8: xxx</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={6}>
        Chart
      </Grid>
    </Grid>
  </Box>
);

export default VehiclesStatsDetail;