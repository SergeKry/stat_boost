import AddIcon from "@mui/icons-material/Add";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function PlayerCreateCard() {
  return (
    <Card sx={{ minWidth: 150, maxWidth: 200 }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AddIcon sx={{ fontSize: 80 }} />
        <Typography variant="h6">Add Player</Typography>
      </CardContent>
    </Card>
  );
}

export default PlayerCreateCard;
