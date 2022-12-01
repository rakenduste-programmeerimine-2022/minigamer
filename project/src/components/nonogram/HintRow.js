import { TableCell, TableRow } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const HintRow = ({ hints, solved }) => {
  return (
    <TableRow>
      <TableCell className="EmptyCell" />
      {hints.map((hint, index) => {
        return (
          <TableCell
            className={`HintCell${solved[index] ? " Solved" : ""}`}
            key={`hint-col-${index}`}
          >
            {hint}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

HintRow.propTypes = {
  hints: PropTypes.arrayOf(PropTypes.string),
  solved: PropTypes.arrayOf(PropTypes.bool),
};

export default HintRow;
