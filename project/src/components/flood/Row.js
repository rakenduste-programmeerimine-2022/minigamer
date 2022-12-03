import React from "react";
import PropTypes from "prop-types";
import { TableRow } from "@mui/material";

import Cell from "./Cell";

const Row = ({ index, cells, setCell }) => {
    const setRowCell = (column) => {
        return setCell(index, column);
    };

    return (
        <TableRow className={`Row`}>
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
    cells: PropTypes.arrayOf(PropTypes.string),
    setCell: PropTypes.func,
};

export default Row;
