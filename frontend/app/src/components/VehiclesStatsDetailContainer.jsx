import { CircularProgress } from "@mui/material";
import { useGetOneTank } from "../hooks/useGetOneTank";
import VehiclesStatsDetail from "./VehiclesStatsDetail";

export default function VehiclesStatsContainer({ tank, onBack }) {
    const { tankDetails, loading: tankDetailsLoading, error: tankDetailsError } = useGetOneTank(tank.wg_tank_id)
    if (tankDetailsLoading) return <CircularProgress />
    if (tankDetailsError) return <div>Error: {error}</div>;
    if (!tankDetails) return null; 
    
    return (
        <VehiclesStatsDetail
        tankDetails={tankDetails}
        onBack={onBack}
      />
    )
};