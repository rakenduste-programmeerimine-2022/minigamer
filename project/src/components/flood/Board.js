import { Table, TableBody, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import seedrandom from "seedrandom";
import PropTypes from "prop-types";

import Row from "./Row";

const SIZE = 13;
const COLORS = [
    "#dd3333", // red
    "#33dd33", // green
    "#3333dd", // blue
    "#dd33dd", // pink
];

const Board = ({ seed, setGameWon }) => {
    const rng = seedrandom(seed);

    // RNG
    const randomInt = (maxExcluded) => {
        return Math.floor(rng.quick() * maxExcluded);
    };

    class FloodCell {
        color = "#ffffff";
        row;
        column;
        index;

        constructor(
            fromIndex = true,
            color,
            { index = 0, row = 0, column = 0 }
        ) {
            this.setColor(color);
            if (fromIndex) {
                this._fromIndex(index);
            } else {
                this._fromAxis(row, column);
            }
        }

        setColor(color) {
            this.color = color;
            return this;
        }

        _fromIndex(index) {
            this.index = index;
            this.row = Math.floor(index / SIZE);
            this.column = index % SIZE;
        }

        _fromAxis(row, column) {
            this.row = row;
            this.column = column;
            this.index = this.row * SIZE + this.column;
        }
    }

    // GETTER
    const getRowColors = (row) => {
        const rowStart = row * SIZE;
        return state.board.slice(rowStart, rowStart + SIZE).map((cell) => {
            return cell.color;
        });
    };

    const getNeighbors = (cell, { matchColor = true }) => {
        const { index, color } = cell;
        const neighborIndexes = [
            index - SIZE,
            index - 1,
            index + 1,
            index + SIZE,
        ];
        let neighbors = [];
        for (let i = 0; i < neighborIndexes.length; i++) {
            const neighborIndex = neighborIndexes[i];
            if (
                (index % SIZE === SIZE - 1 && neighborIndex % SIZE === 0) ||
                (index % SIZE === 0 && neighborIndex % SIZE === SIZE - 1) ||
                neighborIndex >= SIZE ** 2 ||
                neighborIndex < 0
            ) {
                continue;
            }
            const neighbor = state.board[neighborIndex];
            if (matchColor) {
                if (color !== neighbor.color) {
                    continue;
                }
            }
            neighbors.push(neighbor.index);
        }
        return neighbors;
    };

    const getAllColorNeighbors = () => {
        let neighbors = new Set(
            getNeighbors(state.board[0], { matchColor: true })
        );
        let size = 0;
        while (size !== neighbors.size) {
            size = neighbors.size;
            for (let i = 0; i < size; i++) {
                const newNeighbors = getNeighbors(
                    state.board[[...neighbors][i]],
                    {
                        matchColor: true,
                    }
                );
                for (let j = 0; j < newNeighbors.length; j++) {
                    neighbors.add(newNeighbors[j]);
                }
            }
        }
        return Array.from(neighbors);
    };

    // INIT
    const initialize = () => {
        const board = Array(SIZE ** 2);
        for (let index = 0; index < SIZE ** 2; index++) {
            board[index] = new FloodCell(
                true,
                COLORS[randomInt(COLORS.length)],
                { index }
            );
        }
        return board;
    };

    // SETTER
    const setCell = (row, column) => {
        const { color } = state.board[row * SIZE + column];
        if (state.board[0].color === color) {
            return;
        }
        const neighbors = getAllColorNeighbors();
        const updatedBoard = state.board.map((cell) => {
            if (
                neighbors.includes(cell.index) ||
                (neighbors.length === 0 && cell.index === 0)
            ) {
                return new FloodCell(true, color, { index: cell.index });
            }
            return cell;
        });
        setState({
            board: updatedBoard,
            clicks: state.clicks + 1,
        });
    };

    // CHECK
    const checkBoard = () => {
        const colors = new Set();
        for (let i = 0; i < state.board.length; i++) {
            colors.add(state.board[i].color);
        }
        setGameWon(colors.size === 1, state.clicks);
    };

    const [state, setState] = useState({
        board: initialize(),
        clicks: 0,
    });

    useEffect(() => {
        checkBoard();
    });

    return (
        <>
            <Typography>Clicks: {state.clicks}</Typography>
            <Table className="FloodBoard">
                <TableBody>
                    {Array(SIZE)
                        .fill()
                        .map((_value, row) => {
                            return (
                                <Row
                                    key={row}
                                    index={row}
                                    cells={getRowColors(row)}
                                    setCell={setCell}
                                />
                            );
                        })}
                </TableBody>
            </Table>
        </>
    );
};

Board.propTypes = {
    seed: PropTypes.string,
    setGameWon: PropTypes.func,
};

export default Board;
