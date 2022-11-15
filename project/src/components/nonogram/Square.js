import React, { useState } from "react";
import { Box } from "@mui/material";
import { BoardContext } from "./Board";

const Square = ({ column, row }) => {
    const board = React.useContext(BoardContext);
    const [isBlack, setIsBlack] = useState(false);

    const onMouseEvent = (e) => {
        if (e.buttons === 1) {
            board[column][row] = !isBlack;
            setIsBlack(!isBlack);
        }
    };

    return (
        <Box
            className={`square ${isBlack ? "black" : "white"}`}
            onMouseEnter={onMouseEvent}
            onMouseDown={onMouseEvent}
            draggable="false"
        ></Box>
    );
};

export default Square;
