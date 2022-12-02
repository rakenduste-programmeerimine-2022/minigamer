import React, { useEffect, useState } from "react";
import createBoard from "./createBoard";
import { Box, Typography } from "@mui/material";
import Cell from "./Cell";
import { revealed } from "./reveal";

const Board = () => {
  const [grid, setGrid] = useState([]);
  const [nonMines, setNonMines] = useState(0);
  const [minelocations, setMinelocations] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    function freshBoard() {
      const SIZE = 10;
      const BOMBS = 15;
      const newBoard = createBoard(SIZE, SIZE, BOMBS);
      setNonMines(SIZE * SIZE - BOMBS);
      setMinelocations(newBoard.mineLocation);
      setGrid(newBoard.board);
    }
    freshBoard();
  }, []);

  //FLAG -- RIGHT CLICK
  const updateFlag = (e, x, y) => {
    if (gameOver) {
      return;
    }
    e.preventDefault(); //disable right click default popup
    let newGrid = JSON.parse(JSON.stringify(grid)); // creating a copy of grid
    newGrid[x][y].flagged = true;
    setGrid(newGrid);
    console.log(newGrid[x][y]);
  };

  /*  if (!grid.board) {
    return <div>loading</div>;
  } */

  // Reveal Cell
  const revealCell = (x, y) => {
    if (grid[x][y].revealed || gameOver) {
      return;
    }
    let newGrid = JSON.parse(JSON.stringify(grid)); // creating a copy of grid
    if (newGrid[x][y].value === "X") {
      //alert("MINE !!! | you lost");
      //reveal all bombs
      for (let i = 0; i < minelocations.length; i++) {
        newGrid[minelocations[i][0]][minelocations[i][1]].revealed = true;
      }
      setGrid(newGrid);
      setGameOver(true);
    } else {
      let newRevealedBoard = revealed(newGrid, x, y, nonMines);
      setGrid(newRevealedBoard.arr); // update grid
      setNonMines(newRevealedBoard.newNonMinesCount);
      if (newRevealedBoard.newNonMinesCount === 0) {
        setGameOver(true);
      }
    }
  };

  return (
    <div>
      <p>{JSON.stringify(gameOver)}</p>
      <div>
        {grid.map((singleRow) => {
          return (
            <div className="row">
              {singleRow.map((singleBlock) => {
                return (
                  <Cell
                    details={singleBlock}
                    updateFlag={updateFlag}
                    revealCell={revealCell}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Board;
