import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Autocomplete,
  TextField,
  Box,
  Typography,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import useWgPlayerSearch from "../hooks/useWgPlayerSearch";
import useCreatePlayer from "../hooks/useCreatePlayer";

function PlayerCreateDialog({ open, handleClose, setRefreshTrigger }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const { players, loading, setPlayers } = useWgPlayerSearch(searchQuery);
  const {
    addPlayer,
    loading: addingPlayer,
    successMessage,
    setSuccessMessage,
  } = useCreatePlayer();

  useEffect(() => {
    if (open) {
      setSearchQuery("");
      setPlayers([]);
      setSelectedPlayer(null);
    }
  }, [open]);

  const handleCloseDialog = () => {
    handleClose();
    setSuccessMessage("");
  };

  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialog-paper": { maxHeight: "80vh", minHeight: "370px" },
      }}
    >
      <DialogTitle>Add New Player</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter player's nickname and select new player from the list
        </DialogContentText>
        <Autocomplete
          disablePortal
          options={players}
          loading={loading}
          getOptionLabel={(option) => option.label}
          sx={{ my: 2 }}
          ListboxProps={{ style: { maxHeight: "150px" } }}
          onChange={(event, newValue) => setSelectedPlayer(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Nickname"
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
        {selectedPlayer && (
          <Box sx={{ mt: 2, p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
            <Typography variant="subtitle1">
              <strong>Nickname:</strong> {selectedPlayer.label}
            </Typography>
            <Typography variant="subtitle1">
              <strong>WG Player ID:</strong> {selectedPlayer.wgPlayerId}
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="text">
          Cancel
        </Button>
        <Button
          onClick={() =>
            addPlayer(selectedPlayer, () => {
              handleCloseDialog();
              setRefreshTrigger((prev) => !prev);
            })
          }
          variant="contained"
          disabled={!selectedPlayer || addingPlayer}
        >
          {addingPlayer ? <CircularProgress size={24} /> : "Add"}
        </Button>
      </DialogActions>

      {/* ✅ Success Snackbar */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage("")}
        message={successMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
    </Dialog>
  );
}

export default PlayerCreateDialog;
