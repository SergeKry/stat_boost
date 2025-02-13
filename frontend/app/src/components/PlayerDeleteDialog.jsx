import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

function PlayerDeleteDialog({ open, handleClose, player }) {
  const dialogText = `Do you really want to delete ${player.nickname} from the list? This action cannot be reverted. But you can add this player again later.`;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="player-delete-dialog-title"
      aria-describedby="player-delete-dialog-description"
    >
      <DialogTitle id="player-delete-dialog-title">
        {"Delete Player?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="player-delete-dialog-description">
          {dialogText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose} variant="outlined" color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PlayerDeleteDialog;
