import { Table, TableBody, TableHead } from "@mui/material";
import React, { useEffect, useState } from "react";
import seedrandom from "seedrandom";
import PropTypes from "prop-types";

import Row from "./Row";
import HintRow from "./HintRow";

const BLACK_CELL_CHANCE = 0.3;
const SIZE = 10;

const Board = ({ seed, setGameWon }) => {
    const [state, setState] = useState({
        board: Array(SIZE ** 2).fill(false),
        solvedRows: Array(SIZE).fill(false),
        solvedCols: Array(SIZE).fill(false),
    });
    const solution = Array(SIZE ** 2);

    const rng = seedrandom(seed);

    const initializeSolution = () => {
        for (let i = 0; i < SIZE ** 2; i++) {
            solution[i] = randomBool();
        }
    };

    const randomBool = () => {
        return rng.quick() > BLACK_CELL_CHANCE;
    };

    const setBoardCell = (row, column) => {
        const cellIndex = row * SIZE + column;
        const newValue = !state.board[cellIndex];
        const updatedBoard = state.board.map((value, index) => {
            if (index === cellIndex) {
                return newValue;
            }
            return value;
        });

        const updatedSolvedRows = Array(SIZE);
        const updatedSolvedCols = Array(SIZE);
        for (let i = 0; i < SIZE; i++) {
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
        const rowStart = row * SIZE;
        const slice = state.board.slice(rowStart, rowStart + SIZE);
        return slice;
    };

    // hint functions
    const getRowHint = (row) => {
        const rowHints = [];
        let counter = 0;
        const rowStart = row * SIZE;
        const rowSolution = solution.slice(rowStart, rowStart + SIZE);

        for (let col = 0; col < SIZE; col++) {
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
        const hints = Array(SIZE);
        let counter;

        for (let col = 0; col < SIZE; col++) {
            const columnHints = [];
            counter = 0;
            for (let row = 0; row < SIZE; row++) {
                const index = row * SIZE + col;
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

    // row/col check functions
    const isRowSolved = (board, row) => {
        const rowStart = row * SIZE;
        const boardRow = board.slice(rowStart, rowStart + SIZE);
        const solutionRow = solution.slice(rowStart, rowStart + SIZE);

        let correct = 0;
        for (let col = 0; col < SIZE; col++) {
            if (boardRow[col] === solutionRow[col]) {
                correct++;
            }
        }

        return correct === 10;
    };

    const isColumnSolved = (board, col) => {
        let correct = 0;
        for (let row = 0; row < SIZE; row++) {
            const rowStart = row * SIZE;
            const boardCell = board[rowStart + col];
            const solutionCell = solution[rowStart + col];
            if (boardCell === solutionCell) {
                correct++;
            }
        }

        return correct === 10;
    };

    useEffect(() => {
        let gameWon = true;
        for (let i = 0; i < SIZE; i++) {
            if (state.solvedRows[i] && state.solvedCols[i]) {
                continue;
            }
            gameWon = false;
        }
        setGameWon(gameWon);
    });

    initializeSolution();

    return (
        <Table className="Board">
            <TableHead>
                <HintRow hints={getColumnHints()} solved={state.solvedCols} />
            </TableHead>
            <TableBody>
                {Array(SIZE)
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
    setGameWon: PropTypes.func,
};

export default Board;
