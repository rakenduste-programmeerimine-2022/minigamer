import React, { useEffect, useState } from "react";
import createBoard from "./createBoard";
import { Box, Typography } from "@mui/material";
import Cell from "./Cell";
import { revealed } from "./reveal";

const Board = () => {
  const [grid, setGrid] = useState([]);
  useEffect(() => {
    function freshBoard() {
      const newBoard = createBoard(10, 10, 20);
      setGrid(newBoard.board);
    }
    freshBoard();
  }, []);

  //FLAG -- RIGHT CLICK
  const updateFlag = (e, x, y) => {
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
    let newGrid = JSON.parse(JSON.stringify(grid)); // creating a copy of grid
    if (newGrid[x][y].value === "X") {
      alert("MINE !!! | you lost");
      //setGameState lost
    } else {
      let newRevealedBoard = revealed(newGrid, x, y);
      //newGrid[x][y].revealed = true;
      setGrid(newRevealedBoard.arr);
    }
  };

  return grid.map((singleRow) => {
    return (
      <div style={{ display: "flex" }}>
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
  });
};

export default Board;
