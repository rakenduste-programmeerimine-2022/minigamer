import React from "react";
import PropTypes from "prop-types";
import { TableCell } from "@mui/material";

const Cell = ({ index, value, setRowCell }) => {
    const onMouseDown = (event) => {
        setRowCell(index);
    };

    return (
        <TableCell className={`Cell`} onMouseDown={onMouseDown}>
            {value === 0 ? "" : value.toString()}
        </TableCell>
    );
};

Cell.propTypes = {
    index: PropTypes.number,
    value: PropTypes.number,
    setRowCell: PropTypes.func,
};

export default Cell;
