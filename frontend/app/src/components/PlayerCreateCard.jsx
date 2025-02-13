import AddIcon from "@mui/icons-material/Add";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useState } from "react";
import PlayerCreateDialog from "./PlayerCreateDialog";

function PlayerCreateCard() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card
        sx={{
          minWidth: 200,
          height: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardActionArea
          sx={{ width: "100%", height: "100%" }}
          onClick={handleOpen}
        >
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
        </CardActionArea>
      </Card>

      {/* 🔹 Dialog Component */}
      <PlayerCreateDialog open={open} handleClose={handleClose} />
    </>
  );
}

export default PlayerCreateCard;
