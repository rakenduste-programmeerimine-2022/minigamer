import React, { useEffect, useState } from "react";
import createBoard from "./createBoard";
import Cell from "./Cell";
import { revealed } from "./reveal";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

const Board = ({ seed, setGameWon }) => {
  const [grid, setGrid] = useState([]);
  const [nonMines, setNonMines] = useState(0);
  const [minelocations, setMinelocations] = useState([]);
  const [gameState, setGameState] = useState("playing");
  useEffect(() => {
    function freshBoard() {
      const SIZE = 10;
      const BOMBS = 1;
      const newBoard = createBoard(SIZE, SIZE, BOMBS, seed);
      setNonMines(SIZE * SIZE - BOMBS);
      setMinelocations(newBoard.mineLocation);
      setGrid(newBoard.board);
    }
    freshBoard();
  }, [seed]);

  //FLAG -- RIGHT CLICK
  const updateFlag = (e, x, y) => {
    if (gameState !== "playing") {
      return;
    }
    e.preventDefault(); //disable right click default popup
    let newGrid = JSON.parse(JSON.stringify(grid)); // creating a copy of grid
    if (newGrid[x][y].flagged) {
      newGrid[x][y].flagged = false;
    } else {
      newGrid[x][y].flagged = true;
    }
    setGrid(newGrid);
    console.log(newGrid[x][y]);
  };

  // Reveal Cell
  const revealCell = (x, y) => {
    if (grid[x][y].revealed || gameState !== "playing") {
      return;
    }
    let newGrid = JSON.parse(JSON.stringify(grid)); // creating a copy of grid
    if (newGrid[x][y].value === "X") {
      // hit bomb
      //reveal all bombs
      for (let i = 0; i < minelocations.length; i++) {
        newGrid[minelocations[i][0]][minelocations[i][1]].revealed = true;
      }
      setGrid(newGrid);
      setGameState("lost");
    } else {
      let newRevealedBoard = revealed(newGrid, x, y, nonMines);
      setGrid(newRevealedBoard.arr); // update grid
      setNonMines(newRevealedBoard.newNonMinesCount);
      if (newRevealedBoard.newNonMinesCount === 0) {
        setGameState("won");
      }
    }
  };

  useEffect(() => {
    let gameWon = true;
    if (gameState !== "won") {
      gameWon = false;
    }

    setGameWon(gameWon);
  });

  return (
    <Box className="Minesweeper">
      <Typography>{gameState}</Typography>
      <Box>
        {grid.map((singleRow, index1) => {
          return (
            <Box className="row" key={index1}>
              {singleRow.map((singleBlock, index2) => {
                return (
                  <Cell
                    details={singleBlock}
                    updateFlag={updateFlag}
                    revealCell={revealCell}
                    key={index2}
                  />
                );
              })}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

Board.propTypes = {
  seed: PropTypes.string,
  setGameWon: PropTypes.func,
};

export default Board;
