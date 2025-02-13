import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  IconButton,
  Box,
  ButtonBase,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import PeopleIcon from '@mui/icons-material/People';

const drawerWidth = 240;

const Layout = ({ children }) => {
  const [open, setOpen] = useState(() => {
    return JSON.parse(localStorage.getItem("sidebarOpen")) || false;
  });

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(open));
  }, [open]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const navItems = [
    { text: "Players", icon: <PeopleIcon />, link: "/" },
    { text: "Vehicles", icon: <InfoIcon />, link: "/vehicles" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* 🔹 AppBar (Top Navbar) */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Stat Boost
          </Typography>
        </Toolbar>
      </AppBar>

      {/* 🔹 Drawer (Sidebar) */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <List>
          {navItems.map((item) => (
            <ListItem key={item.text}>
              <ButtonBase
                component={Link}
                to={item.link}
                sx={{
                  width: "100%",
                  textAlign: "left",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ButtonBase>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* 🔹 Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: !open ? `-${drawerWidth}px` : 0,
          transition: "margin 0.3s ease-in-out",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
