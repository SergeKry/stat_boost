import { useState, useEffect } from "react";
import { useTanks } from "../hooks/useTanks";
import { useUpdateTanks } from "../hooks/useUpdateTanks";
import {
  TableContainer,
  Box,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Skeleton,
  Pagination,
  TableSortLabel,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

const TanksTable = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("wg_tank_id");
  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const { tanks, loading, error, totalPages } = useTanks(
    page,
    50,
    sortBy,
    order,
    search,
    refreshTrigger
  );

  const {
    updateTanks,
    updateLoading,
    updateError,
    updateSuccess,
    updateMessage,
  } = useUpdateTanks();

  useEffect(() => {
    if (updateSuccess) {
      setSnackbarOpen(true);
    }
  }, [updateSuccess]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortBy(newSortBy);
      setOrder("asc");
    }
  };

  const handleUpdateTanks = async () => {
    setIsUpdating(true);
    await updateTanks();
    setIsUpdating(false);
    setRefreshTrigger((prev) => !prev);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <TableContainer component={Paper}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <TextField
          label="Search by tank name"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleUpdateTanks}
          disabled={isUpdating}
        >
          {isUpdating ? <CircularProgress size={24} /> : "Update Tanks"}
        </Button>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
            {updateMessage}
        </Snackbar>
      </Box>

      {error && (
        <p style={{ color: "red", textAlign: "center" }}>Error: {error}</p>
      )}

      <Table aria-label="vehicles table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>
              <TableSortLabel
                active={sortBy === "name"}
                direction={order}
                onClick={() => handleSortChange("name")}
              >
                Tank Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortBy === "nation"}
                direction={order}
                onClick={() => handleSortChange("nation")}
              >
                Nation
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortBy === "tier"}
                direction={order}
                onClick={() => handleSortChange("tier")}
              >
                Tier
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortBy === "type"}
                direction={order}
                onClick={() => handleSortChange("type")}
              >
                Type
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortBy === "exp_def"}
                direction={order}
                onClick={() => handleSortChange("exp_def")}
              >
                expDef
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortBy === "exp_spot"}
                direction={order}
                onClick={() => handleSortChange("exp_spot")}
              >
                expSpot
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortBy === "exp_damage"}
                direction={order}
                onClick={() => handleSortChange("exp_damage")}
              >
                expDmg
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortBy === "exp_winrate"}
                direction={order}
                onClick={() => handleSortChange("exp_winrate")}
              >
                expWin
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortBy === "exp_frag"}
                direction={order}
                onClick={() => handleSortChange("exp_frag")}
              >
                expFrag
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {loading
            ? [...Array(5)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton variant="rectangular" width={50} height={50} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width={100} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width={80} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width={50} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width={80} />
                  </TableCell>
                </TableRow>
              ))
            : tanks.map((tank) => (
                <TableRow key={tank.id}>
                  <TableCell>
                    <img src={tank.small_icon} alt={tank.name} />
                  </TableCell>
                  <TableCell>{tank.name}</TableCell>
                  <TableCell>{tank.nation}</TableCell>
                  <TableCell>{tank.tier}</TableCell>
                  <TableCell>{tank.type}</TableCell>
                  <TableCell>{tank.exp_def}</TableCell>
                  <TableCell>{tank.exp_spot}</TableCell>
                  <TableCell>{tank.exp_damage}</TableCell>
                  <TableCell>{tank.exp_winrate}</TableCell>
                  <TableCell>{tank.exp_frag}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>

      {/* Pagination Component */}
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      />
    </TableContainer>
  );
};

export default TanksTable;
