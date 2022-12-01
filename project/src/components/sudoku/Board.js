import { Table, TableBody } from "@mui/material";
import React, { useState } from "react";
import seedrandom from "seedrandom";
import PropTypes from "prop-types";

import Row from "./Row";

const SUBGRID_SIZE = 3;
const SIZE = SUBGRID_SIZE ** 2;
const NUMBERED_CELL_CHANCE = 0.3;

const Board = ({ seed, setGameWon }) => {
    const rng = seedrandom(seed);
    const clickable = Array(SIZE);

    // RNG
    const randomBool = () => {
        return rng.quick() < NUMBERED_CELL_CHANCE;
    };

    const randomInt = (maxExcluded) => {
        return Math.floor(rng.quick() * maxExcluded);
    };

    // getters
    const getRowCells = (row, board = state.board) => {
        return board[row];
    };

    const getColumnCells = (col, board = state.board) => {
        const cells = board.map((row) => {
            return row[col];
        });
        return cells;
    };

    // helpers
    const sortNumbers = (a, b) => {
        return a - b;
    };

    // getters - subgrid
    const getSubgridNeighbors = (axis) => {
        const pos = axis % SUBGRID_SIZE;
        let neighborPos;
        // funny unreadable math
        // neighborPos = [
        //     0.5 * pos ** 2 + -2.5 * pos + 1,
        //     -0.5 * pos ** 2 + -0.5 * pos + 2,
        // ];
        switch (pos) {
            case 0:
                neighborPos = [1, 2];
                break;
            case 1:
            default:
                neighborPos = [-1, 1];
                break;
            case 2:
                neighborPos = [-2, -1];
                break;
        }
        return [axis, axis + neighborPos[0], axis + neighborPos[1]].sort(
            sortNumbers
        );
    };

    const getSubgridCells = (row, col, board = state.board) => {
        const rows = getSubgridNeighbors(row);
        const cols = getSubgridNeighbors(col);
        const rowsCells = [
            getRowCells(rows[0], board),
            getRowCells(rows[1], board),
            getRowCells(rows[2], board),
        ];
        const subgrid = rowsCells.map((rowCells) => {
            return [rowCells[cols[0]], rowCells[cols[1]], rowCells[cols[2]]];
        });
        const cells = [...subgrid[0], ...subgrid[1], ...subgrid[2]];
        return cells;
    };

    // setters
    const setBoardCell = (row, col) => {
        console.info(getSubgridCells(row, col));
        if (!clickable[row][col]) {
            return;
        }
        const updatedBoard = state.board.map((rowCells, boardRow) => {
            if (row === boardRow) {
                return rowCells.map((value, boardCol) => {
                    if (col === boardCol) {
                        return state.number;
                    }
                    return value;
                });
            }
            return rowCells;
        });

        setState({
            board: updatedBoard,
            number: state.number,
        });
    };

    // init
    const initializeBoard = () => {
        const board = Array(SIZE).fill(Array(SIZE).fill(0));
        for (let row = 0; row < SIZE; row++) {
            board[row] = Array(SIZE).fill(0);
            clickable[row] = Array(SIZE).fill(true);
            for (let col = 0; col < SIZE; col++) {
                board[row][col] = 0;
                if (randomBool()) {
                    const used = new Set([
                        ...getRowCells(row, board),
                        ...getColumnCells(col, board),
                        ...getSubgridCells(row, col, board),
                    ]);
                    let available = [];
                    for (let i = 1; i < SIZE + 1; i++) {
                        if (!used.has(i)) {
                            available.push(i);
                        }
                    }
                    const value = available[randomInt(available.length)];
                    board[row][col] = value ?? 0;
                    clickable[row][col] = !Boolean(value);
                }
            }
        }
        return board;
    };

    const [state, setState] = useState({
        board: initializeBoard(),
        number: 1,
    });

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
