import React from "react";
import { Box, Typography } from "@mui/material";
import "../Styles/Minesweeper.css";
import Board from "../components/minesweeper/Board";

function Minesweeper() {
  return (
    <Box className="minesweeper">
      <h3 className="title">Minesweeper</h3>
      <div className="subtext">Mines Left: 10</div>
      <Board />
    </Box>
  );
}

export default Minesweeper;
