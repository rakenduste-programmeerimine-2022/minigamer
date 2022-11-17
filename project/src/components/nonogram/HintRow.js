import React from "react";
import PropTypes from "prop-types";
import { TableHead, TableRow, Box, TableCell } from "@mui/material";

const HintRow = ({ solution }) => {
    const hints = Array(10);
    for (let i = 0; i < 10; i++) {
        // const row = solution[i];
        // hints[i] = [];
        // let counter = 0;
        // for (let j = 0; j < row.length; j++) {
        //     const value = row[j];
        //     if (value) {
        //         counter++;
        //     } else if (!value && counter !== 0) {
        //         hints[i].push(counter);
        //     }
        //     if (!value) {
        //         counter = 0;
        //     }
        // }
        hints[i] = [];
        let counter = 0;
        for (let j = 0; j < 10; j++) {
            const value = solution[j][i];
            if (value) {
                counter++;
            } else if (!value && counter !== 0) {
                hints[i].push(counter);
            }
            if (!value) {
                counter = 0;
            }
        }
        if (counter !== 0 || hints[i].length === 0) {
            hints[i].push(counter);
        }
    }
    // console.log(hints);
    return (
        <TableHead>
            <TableCell className="EmptyCell"></TableCell>
            {hints.map((column) => {
                return (
                    <TableCell className="HintCell">
                        {column.map((value) => {
                            return value + " ";
                        })}
                    </TableCell>
                );
            })}
        </TableHead>
    );
};

HintRow.propTypes = {
    solution: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.bool)),
};

export default HintRow;
