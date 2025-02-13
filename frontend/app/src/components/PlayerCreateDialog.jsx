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
} from "@mui/material";
import useWgPlayerSearch from "../hooks/useWgPlayerSearch";

function PlayerCreateDialog({ open, handleClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const { players, loading, setPlayers } = useWgPlayerSearch(searchQuery);

  useEffect(() => {
    if (open) {
      setSearchQuery("");
      setPlayers([]);
      setSelectedPlayer(null);
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
          onClick={handleClose}
          variant="contained"
          disabled={!selectedPlayer}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PlayerCreateDialog;
