import React from "react";
import { Box, Button } from "@mui/material";

function ButtonsTest() {
  const openDropDown = (e) => {
    console.log(e.target);
    e.target.classList.toggle("open");
  };
  return (
    <div>
      {" "}
      <Box className="filters" onClick={openDropDown}>
        <Button className="btn leaderboardsBtn">
          Game
          <Box className="bar left"></Box>
          <Box className="bar right"></Box>
        </Button>
        <Button className="btn leaderboardsBtn">
          Type
          <Box className="bar left"></Box>
          <Box className="bar right"></Box>
        </Button>
        <Button className="btn leaderboardsBtn">Date</Button>
        <Button className="btn leaderboardsBtn">
          Users
          <Box className="bar left"></Box>
          <Box className="bar right"></Box>
        </Button>
      </Box>
    </div>
  );
}

export default ButtonsTest;
