import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { useGetOneTank } from "../hooks/useGetOneTank";
import { useGetVehiclesStats } from "../hooks/useGetVehiclesStats";
import VehiclesStatsDetail from "./VehiclesStatsDetail";

export default function VehiclesStatsDetailContainer({ player, tank, onBack }) {
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const tank_id = tank.wg_tank_id;

  const {
    tankDetails,
    loading: tankDetailsLoading,
    error: tankDetailsError,
  } = useGetOneTank(tank.wg_tank_id);
  const {
    vehiclesStats,
    loading: statsDetailsLoading,
    error: statsDetailError,
  } = useGetVehiclesStats(
    player.wg_player_id,
    undefined,
    tank_id,
    refreshTrigger
  );
  const actualStats = vehiclesStats.find((item) => item.actual === true);

  const statsChartRawData = vehiclesStats
    .map((item) => ({
      x: item.tank_battles,
      y: item.tank_wn8,
    }))
    .reverse();

  const statsChartData = [
    {
      id: "WN8 progression",
      data: statsChartRawData,
    },
  ];

  if (tankDetailsLoading || statsDetailsLoading) return <CircularProgress />;
  if (tankDetailsError || statsDetailError) return <div>Error: {error}</div>;
  if (!tankDetails || !vehiclesStats) return null;

  return (
    <VehiclesStatsDetail
      tankDetails={tankDetails}
      actualStats={actualStats}
      statsChartData={statsChartData}
      onBack={onBack}
    />
  );
}
