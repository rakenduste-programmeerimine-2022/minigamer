import { Box } from "@mui/material";
import React from "react";
import "../Styles/Game.scss";
import Minesweeper from "../pages/Minesweeper";
import Sudoku from "../pages/Sudoku";
import Nonogram from "../pages/Nonogram";
import { useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";

function Game() {
  const { id } = useParams();
  //console.log(id);
  let game = null;
  if (id == "Minesweeper") {
    game = <Minesweeper />;
  } else if (id == "Nonogramm") {
    game = <Nonogram />;
  } else if (id == "Sudoku") {
    game = <Sudoku />;
  } else {
    game = <ErrorPage />;
  }

  return (
    <Box className="game" id="game">
      <Box className="gameWindowWrap">
        <Box className="gameWindow">
          <Box className="playableGame">{game}</Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Game;
