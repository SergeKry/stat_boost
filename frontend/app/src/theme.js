import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& th": {
            fontWeight: "bold",
            backgroundColor: "#d5d8dc",
          },
        },
      },
    },
  },
  });
  
  export default theme;