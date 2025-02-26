import { useState } from "react";
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { useGetVehiclesStats } from "../hooks/useGetVehiclesStats";
import { useTanks } from "../hooks/useTanks";

const VehiclesStats = ({ player }) => {
  const {
    vehiclesStats,
    loading: statsLoading,
    error: statError,
  } = useGetVehiclesStats(player.wg_player_id);
  const {
    tanks,
    loading: tanksLoading,
    error: tanksError,
    totalPages,
  } = useTanks();

  const [sortBy, setSortBy] = useState("tank_battles"); // Default sort column
  const [order, setOrder] = useState("desc"); // Sorting order

  const mergeTankStats = (statsList, tanksList) => {
    return statsList.map((stat) => {
      const tank = tanksList.find((t) => t.wg_tank_id === stat.wg_tank_id);
      return {
        ...stat,
        ...tank,
      };
    });
  };

  if (statsLoading || tanksLoading) {
    return <CircularProgress />;
  }

  let mergedList = mergeTankStats(vehiclesStats, tanks);

  const handleSortChange = (column) => {
    if (sortBy === column) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setOrder("asc");
    }
  };

  mergedList = [...mergedList].sort((a, b) => {
    if (!a[sortBy] || !b[sortBy]) return 0; // Handle undefined values
    if (typeof a[sortBy] === "number") {
      return order === "asc" ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
    } else {
      return order === "asc"
        ? a[sortBy].localeCompare(b[sortBy])
        : b[sortBy].localeCompare(a[sortBy]);
    }
  });

  return (
    <TableContainer component={Paper}>
      <Table aria-label="vehicles stats table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
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
                active={sortBy === "type"}
                direction={order}
                onClick={() => handleSortChange("type")}
              >
                Type
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
                active={sortBy === "avg_damage"}
                direction={order}
                onClick={() => handleSortChange("avg_damage")}
              >
                Damage
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortBy === "tank_battles"}
                direction={order}
                onClick={() => handleSortChange("tank_battles")}
              >
                Battles
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortBy === "avg_winrate"}
                direction={order}
                onClick={() => handleSortChange("avg_winrate")}
              >
                Winrate
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortBy === "tank_wn8"}
                direction={order}
                onClick={() => handleSortChange("tank_wn8")}
              >
                WN8
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mergedList.map((stat) => (
            <TableRow key={stat.wg_tank_id}>
              <TableCell>
                <img src={stat.contour_icon} alt={stat.name} />
              </TableCell>
              <TableCell>{stat.name}</TableCell>
              <TableCell>{stat.type}</TableCell>
              <TableCell>{stat.nation}</TableCell>
              <TableCell>{stat.tier}</TableCell>
              <TableCell>{stat.avg_damage.toFixed(0)}</TableCell>
              <TableCell>{stat.tank_battles}</TableCell>
              <TableCell>{stat.avg_winrate.toFixed(2)}</TableCell>
              <TableCell>{stat.tank_wn8.toFixed(0)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VehiclesStats;
