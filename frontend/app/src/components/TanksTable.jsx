import { useTanks } from "../hooks/useTanks";
import { CircularProgress, List, ListItem, ListItemText } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Skeleton from "@mui/material/Skeleton";

const TanksTable = () => {
  const { tanks, loading, error } = useTanks();

  if (error) return <p>Error: {error}</p>;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="vehicles table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Tank Name</TableCell>
            <TableCell>Nation</TableCell>
            <TableCell>Tier</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>expDef</TableCell>
            <TableCell>expSpot</TableCell>
            <TableCell>expDmg</TableCell>
            <TableCell>expWin</TableCell>
            <TableCell>expFrag</TableCell>
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
                  <TableCell>
                    <Skeleton variant="text" width={60} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width={60} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width={60} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width={60} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width={60} />
                  </TableCell>
                </TableRow>
              ))
            : tanks.map((tank) => (
                <TableRow
                  key={tank.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
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
    </TableContainer>
  );
};

export default TanksTable;
