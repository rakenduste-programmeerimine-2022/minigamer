import { TableCell } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const Cell = ({ setRowCell, index, value }) => {
  const onMouseEvent = (event) => {
    if (event.buttons === 1) {
      setRowCell(index);
    }
  };

  return (
    <TableCell
      className={`Cell ${value ? "BlackCell" : "WhiteCell"}`}
      onMouseEnter={onMouseEvent}
      onMouseDown={onMouseEvent}
    />
  );
};

Cell.propTypes = {
  setRowCell: PropTypes.func,
  index: PropTypes.number,
  value: PropTypes.bool,
};

export default Cell;
