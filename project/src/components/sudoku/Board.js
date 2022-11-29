import { Table, TableBody } from "@mui/material";
import React, { useState } from "react";
import seedrandom from "seedrandom";
import PropTypes from "prop-types";

import Row from "./Row";

const NUMBERED_CELL_CHANCE = 0.3;
const SIZE = 9;

// need to probably rewrite some stuff and check subgrids
const Board = ({ seed, setGameWon }) => {
    const rng = seedrandom(seed);

    // RNG
    const randomBool = () => {
        return rng.quick() < NUMBERED_CELL_CHANCE;
    };

    const randomInt = (maxExcluded) => {
        return Math.floor(rng.quick() * maxExcluded);
    };

    // checkers
    const getRowUsedNumbers = (row, board) => {
        const rowStart = row * SIZE;
        const used = board.slice(rowStart, rowStart + SIZE);
        return used;
    };

    const getColumnUsedNumbers = (col, board) => {
        const used = [];
        for (let row = 0; row < SIZE; row++) {
            const rowStart = row * SIZE;
            const cell = board[rowStart + col];
            used.push(cell);
        }
        return used;
    };

    const initializeBoard = () => {
        const board = Array(SIZE ** 2).fill(0);
        for (let row = 0; row < SIZE; row++) {
            for (let col = 0; col < SIZE; col++) {
                if (randomBool()) {
                    const colUsed = getColumnUsedNumbers(col, board);
                    const rowUsed = getRowUsedNumbers(row, board);
                    const used = new Set([...colUsed, ...rowUsed]);
                    used.delete(0);
                    const available = [];
                    for (let i = 1; i < SIZE + 1; i++) {
                        if (!used.has(i)) {
                            available.push(i);
                        }
                    }
                    const index = randomInt(available.length);
                    board[row * SIZE + col] = available[index];
                }
            }
        }
        return board;
    };

    const [state, setState] = useState({
        board: initializeBoard(),
        number: 1,
    });

    // setters
    const setBoardCell = (row, column) => {
        const cellIndex = row * SIZE + column;
        const updatedBoard = state.board.map((value, index) => {
            if (index === cellIndex) {
                return state.number;
            }
            return value;
        });

        setState({
            board: updatedBoard,
            number: state.number,
        });
    };

    // getters
    const getRowCells = (row) => {
        const rowStart = row * SIZE;
        const slice = state.board.slice(rowStart, rowStart + SIZE);
        return slice;
    };

    return (
        <Table className="Board">
            <TableBody>
                {Array(SIZE)
                    .fill()
                    .map((_value, index) => {
                        return (
                            <Row
                                key={`row-${index}`}
                                index={index}
                                setBoardCell={setBoardCell}
                                solved={false /*TODO*/}
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
