import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { BoardContext } from "./Board";

const Square = ({ column, row }) => {
    const board = React.useContext(BoardContext);
    const [isBlack, setIsBlack] = useState(false);

    const onMouseEvent = (e) => {
        if (e.buttons === 1) {
            setIsBlack(!isBlack);
            console.log(column, row);
        }
    };

    useEffect(() => {
        board[column][row] = isBlack;
    }, [isBlack]);

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
