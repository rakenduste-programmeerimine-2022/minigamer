import React from "react";
import PropTypes from "prop-types";
import { TableRow } from "@mui/material";

import Cell from "./Cell";

const Row = ({ index, cells, solved, setBoardCell }) => {
    const setRowCell = (column) => {
        return setBoardCell(index, column);
    };

    return (
        <TableRow className={`Row${solved ? " SolvedRow" : ""}`}>
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
    cells: PropTypes.arrayOf(PropTypes.number),
    solved: PropTypes.bool,
    setBoardCell: PropTypes.func,
};

export default Row;
