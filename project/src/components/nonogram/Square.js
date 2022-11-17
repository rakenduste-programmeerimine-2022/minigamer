import { TableCell } from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect } from "react";

import { BoardContext } from "./Board";

const Square = ({ row, column, value }) => {
    const context = React.useContext(BoardContext);
    const setBoardCell = context.setBoardCell;
    const [isBlack, setIsBlack] = React.useState(value);

    const onMouseEvent = (e) => {
        if (e.buttons === 1) {
            setIsBlack(!isBlack);
        }
    };

    useEffect(() => {
        setBoardCell(row, column, isBlack);
    });

    return (
        <TableCell
            className={`Square ${isBlack ? "Black" : "White"}`}
            onMouseEnter={onMouseEvent}
            onMouseDown={onMouseEvent}
        ></TableCell>
    );
};

Square.propTypes = {
    row: PropTypes.number,
    column: PropTypes.number,
    value: PropTypes.bool,
};

export default Square;
