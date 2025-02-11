import { useState } from "react";
import { useTanks } from "../hooks/useTanks";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Skeleton,
  Pagination,
  TableSortLabel,
  TextField
} from "@mui/material";

const TanksTable = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("wg_tank_id");
  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState("");

  const { tanks, loading, error, totalPages } = useTanks(
    page,
    50,
    sortBy,
    order,
    search
  );

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

  return (
    <TableContainer component={Paper}>
      {/* Search Input */}
      <TextField
        label="Search by tank name"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ m: 2 }}
      />

      {error && <p style={{ color: "red", textAlign: "center" }}>Error: {error}</p>}

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