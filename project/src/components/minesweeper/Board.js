import React, { useEffect, useState } from "react";
import createBoard from "./createBoard";
import { Box, Typography } from "@mui/material";

const Board = () => {
  const [grid, setGrid] = useState([]);
  useEffect(() => {
    function freshBoard() {
      const newBoard = createBoard(5, 5, 10);
      console.log(newBoard);
      setGrid(newBoard);
    }
    freshBoard();
  }, []);

  if (!grid.board) {
    return <div>loading</div>;
  }
  return grid.board.map((singleRow) => {
    return (
      <div style={{ display: "flex" }}>
        {singleRow.map((singleBlock) => {
          return (
            <div
              style={{
                width: 80,
                height: 80,
                backgroundColor: "gray",
                border: "2px solid black",
                textAlign: "center",
              }}
            >
              {singleBlock.value}
            </div>
          );
        })}
      </div>
    );
  });
};

export default Board;
