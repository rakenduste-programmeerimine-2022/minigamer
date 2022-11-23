import { TableRow, TableCell } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import Cell from "./Cell";

const Row = ({ index, setBoardCell, hint, solved, cells }) => {
    const setRowCell = (column) => {
        return setBoardCell(index, column);
    };

    return (
        <TableRow className="Row">
            <TableCell className={`HintCell${solved ? " Solved" : ""}`}>
                {hint}
            </TableCell>
            {cells.map((cell, column) => {
                return (
                    <Cell
                        key={`row-${index}-col-${column}`}
                        index={column}
                        setRowCell={setRowCell}
                        value={cell}
                    />
                );
            })}
        </TableRow>
    );
};

Row.propTypes = {
    index: PropTypes.number,
    setBoardCell: PropTypes.func,
    hint: PropTypes.string,
    solved: PropTypes.bool,
    cells: PropTypes.arrayOf(PropTypes.bool),
};

export default Row;
