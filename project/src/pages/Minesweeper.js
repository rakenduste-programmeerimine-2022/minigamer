import React from "react";
import { Box, Typography } from "@mui/material";
import "../Styles/Minesweeper.scss";
import Board from "../components/minesweeper/Board";

function Minesweeper() {
  return (
    <Box className="minesweeper">
      <h3 className="title">Minesweeper</h3>
      <Board />
    </Box>
  );
}

// pooleli 1.11.11

export default Minesweeper;
