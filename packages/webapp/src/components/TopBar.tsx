import React from "react";
import { AppBar, Toolbar, Typography, Theme } from "@mui/material";

const TopBar = () => {
  return (
    <AppBar position="static" sx={{height: '50px',
    background: 'linear-gradient(90deg, rgba(109,78,238,1) 0%, rgba(164,36,134,1) 63%)',}}>
      <Toolbar>
        <Typography variant="h6">
          {`Search SuperHero App | Welcome, Developer`}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;