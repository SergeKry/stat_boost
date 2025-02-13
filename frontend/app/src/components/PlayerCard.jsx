import { useState } from "react";
import Typography from "@mui/material/Typography";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import { Card, CardContent, CardHeader, CardActionArea, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PlayerDeleteDialog from "./PlayerDeleteDialog";

function PlayerCard({ player, setRefreshTrigger }) {
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
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <CardHeader action={<IconButton onClick={handleOpen} aria-label="delete">
          <CloseIcon />
        </IconButton>} />
        <CardActionArea>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              p: 1,
            }}
          >
            <Typography variant="h5" component="div">
              {player.nickname}
            </Typography>
            <ContactPageIcon sx={{ fontSize: 60 }} />
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              {player.wg_player_id}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <PlayerDeleteDialog
        open={open}
        handleClose={handleClose}
        player={player}
        setRefreshTrigger={setRefreshTrigger}
      />
    </>
  );
}

export default PlayerCard;
