import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import useDeletePlayer from "../hooks/useDeletePlayer";

function PlayerDeleteDialog({ open, handleClose, player, setRefreshTrigger }) {
  const dialogText = `Do you really want to delete ${player.nickname} from the list? This action cannot be reverted. But you can add this player again later.`;
  const {
    removePlayer,
    loading: removingPlayer,
    successMessage,
    setSuccessMessage,
  } = useDeletePlayer();

  const handleCloseDialog = () => {
    handleClose();
    setSuccessMessage("");
  };

  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
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
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={() => removePlayer(player, () => {
            handleCloseDialog();
            setRefreshTrigger((prev) => !prev);
        })
        } 
        variant="outlined"
        color="error"
        disabled={removingPlayer}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PlayerDeleteDialog;
