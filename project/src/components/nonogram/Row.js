import { TableCell, TableRow } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import Square from "./Square";

const Row = ({ currentSquares, solutionSquares, level }) => {
    const hints = [];
    let counter = 0;
    for (let i = 0; i < solutionSquares.length; i++) {
        const value = solutionSquares[i];
        if (value) {
            counter++;
        } else if (!value && counter !== 0) {
            hints.push(counter);
        }
        if (!value) {
            counter = 0;
        }
    }
    if (counter !== 0 || hints.length === 0) {
        hints.push(counter);
    }
    return (
        <TableRow className="Row">
            <TableCell className="HintCell">
                {hints.map((value) => {
                    return value + " ";
                })}
            </TableCell>
            {currentSquares.map((square, id) => {
                return (
                    <Square
                        row={level}
                        column={id}
                        key={`${level}${id}`}
                        value={square}
                    />
                );
            })}
        </TableRow>
    );
};

Row.propTypes = {
    squares: PropTypes.arrayOf(PropTypes.bool),
    level: PropTypes.number,
};

export default Row;
