import { Table, TableBody, TableHead } from "@mui/material";
import React, { useEffect, useState } from "react";
import seedrandom from "seedrandom";
import PropTypes from "prop-types";

import Row from "./Row";
import HintRow from "./HintRow";

const BLACK_CELL_CHANCE = 0.3;
const BOARD_SIZE = 10;

const Board = ({ seed }) => {
    const [state, setState] = useState({
        board: Array(BOARD_SIZE ** 2).fill(false),
        solvedRows: Array(BOARD_SIZE).fill(false),
        solvedCols: Array(BOARD_SIZE).fill(false),
    });
    const solution = Array(BOARD_SIZE ** 2);

    const rng = seedrandom(seed);

    const initializeSolution = () => {
        for (let i = 0; i < BOARD_SIZE ** 2; i++) {
            solution[i] = randomBool();
        }
    };

    const randomBool = () => {
        return rng.quick() > BLACK_CELL_CHANCE;
    };

    const setBoardCell = (row, column) => {
        const cellIndex = row * BOARD_SIZE + column;
        const newValue = !state.board[cellIndex];
        const updatedBoard = state.board.map((value, index) => {
            if (index === cellIndex) {
                return newValue;
            }
            return value;
        });
        // setBoard(updatedBoard);
        const updatedSolvedRows = Array(BOARD_SIZE);
        const updatedSolvedCols = Array(BOARD_SIZE);
        for (let i = 0; i < BOARD_SIZE; i++) {
            updatedSolvedRows[i] = isRowSolved(updatedBoard, i);
            updatedSolvedCols[i] = isColumnSolved(updatedBoard, i);
        }
        setState({
            board: updatedBoard,
            solvedRows: updatedSolvedRows,
            solvedCols: updatedSolvedCols,
        });
    };

    const getRowCells = (row) => {
        const rowStart = row * BOARD_SIZE;
        const slice = state.board.slice(rowStart, rowStart + BOARD_SIZE);
        return slice;
    };

    // hint functions
    const getRowHint = (row) => {
        const rowHints = [];
        let counter = 0;
        const rowStart = row * BOARD_SIZE;
        const rowSolution = solution.slice(rowStart, rowStart + BOARD_SIZE);
        for (let col = 0; col < BOARD_SIZE; col++) {
            const value = rowSolution[col];
            if (value) {
                counter++;
            } else if (!value && counter !== 0) {
                rowHints.push(counter);
            }
            if (!value) {
                counter = 0;
            }
        }
        if (counter !== 0 || rowHints.length === 0) {
            rowHints.push(counter);
        }
        return rowHints.join(" ");
    };

    const getColumnHints = () => {
        const hints = Array(BOARD_SIZE);
        let counter;
        for (let col = 0; col < BOARD_SIZE; col++) {
            const columnHints = [];
            counter = 0;
            for (let row = 0; row < BOARD_SIZE; row++) {
                const index = row * BOARD_SIZE + col;
                const value = solution[index];
                if (value) {
                    counter++;
                } else if (!value && counter !== 0) {
                    columnHints.push(counter);
                }
                if (!value) {
                    counter = 0;
                }
            }
            if (counter !== 0 || columnHints.length === 0) {
                columnHints.push(counter);
            }
            hints[col] = columnHints.join(" ");
        }
        return hints;
    };

    const isRowSolved = (board, row) => {
        const rowStart = row * BOARD_SIZE;
        const boardRow = board.slice(rowStart, rowStart + BOARD_SIZE);
        const solutionRow = solution.slice(rowStart, rowStart + BOARD_SIZE);

        let correct = 0;
        for (let col = 0; col < BOARD_SIZE; col++) {
            if (boardRow[col] === solutionRow[col]) {
                correct++;
            }
        }
        return correct === 10;
    };

    const isColumnSolved = (board, col) => {
        let correct = 0;
        for (let row = 0; row < BOARD_SIZE; row++) {
            const rowStart = row * BOARD_SIZE;
            const boardCell = board[rowStart + col];
            const solutionCell = solution[rowStart + col];
            if (boardCell === solutionCell) {
                correct++;
            }
        }
        return correct === 10;
    };

    useEffect(() => {
        for (let i = 0; i < BOARD_SIZE; i++) {
            // setSolvedRow(i);
            // setSolvedColumn(i);
        }
    });

    initializeSolution();

    return (
        <Table className="Board">
            <TableHead>
                <HintRow hints={getColumnHints()} solved={state.solvedCols} />
            </TableHead>
            <TableBody>
                {Array(BOARD_SIZE)
                    .fill()
                    .map((_value, index) => {
                        return (
                            <Row
                                key={`row-${index}`}
                                index={index}
                                setBoardCell={setBoardCell}
                                hint={getRowHint(index)}
                                solved={state.solvedRows[index]}
                                cells={getRowCells(index)}
                            />
                        );
                    })}
            </TableBody>
        </Table>
    );
};

Board.propTypes = {
    seed: PropTypes.string,
};

export default Board;
