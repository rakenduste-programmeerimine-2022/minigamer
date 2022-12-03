import React from "react";
import PropTypes from "prop-types";
import { TableCell } from "@mui/material";

const Cell = ({ index, value, setRowCell }) => {
    const onMouseDown = (event) => {
        setRowCell(index);
    };

    return (
        <TableCell
            className={`FloodCell`}
            onMouseDown={onMouseDown}
            style={{ backgroundColor: value }}
        />
    );
};

Cell.propTypes = {
    index: PropTypes.number,
    value: PropTypes.string,
    setRowCell: PropTypes.func,
};

export default Cell;
