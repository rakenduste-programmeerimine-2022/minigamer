import React from "react";
import { Box } from "@mui/material";
import Square from "./Square";

const Column = ({ level }) => {
    const squares = Array(10);

    for (let i = 0; i < squares.length; i++) {
        squares[i] = <Square column={level} row={i} />;
    }

    return <Box className="column">{squares}</Box>;
};

export default Column;
