import { Table, TableBody } from "@mui/material";
import seedrandom from "seedrandom";
import PropTypes from "prop-types";
import React from "react";

import HintRow from "./HintRow";
import Row from "./Row";

export const BoardContext = React.createContext();
const BOARD_SIZE = 10;
const BLACK_CHANCE = 0.25;

const Board = ({ seed }) => {
    const rng = seedrandom(seed);
    const currentBoard = Array(BOARD_SIZE);
    const solutionBoard = Array(BOARD_SIZE);
    const correct = Array(BOARD_SIZE).fill(0);

    const randomBool = () => {
        return rng.quick() > BLACK_CHANCE;
    };

    const checkRow = (row) => {
        let correctAmt = 0;
        for (let i = 0; i < BOARD_SIZE; i++) {
            if (currentBoard[row][i] === solutionBoard[row][i]) {
                correctAmt++;
            }
        }
        return correctAmt;
    };

    const setBoardCell = (row, col, value) => {
        currentBoard[row][col] = value;
        correct[row] = checkRow(row);
        console.log(`CHECK\n${correct}`);
    };

    for (let i = 0; i < BOARD_SIZE; i++) {
        currentBoard[i] = Array(10).fill(false);
        solutionBoard[i] = Array(10);
        for (let j = 0; j < BOARD_SIZE; j++) {
            solutionBoard[i][j] = randomBool();
        }
        checkRow(i);
    }

    return (
        <Table className="Board">
            <HintRow solution={solutionBoard} />
            <TableBody>
                <BoardContext.Provider
                    value={{
                        board: currentBoard,
                        setBoardCell,
                    }}
                >
                    {currentBoard.map((column, id) => {
                        return (
                            <Row
                                className={
                                    correct[id] === 10 ? "SolvedRow" : ""
                                }
                                currentSquares={column}
                                solutionSquares={solutionBoard[id]}
                                level={id}
                                key={id}
                            />
                        );
                    })}
                </BoardContext.Provider>
            </TableBody>
        </Table>
    );
};

Board.propTypes = {
    seed: PropTypes.string,
};

export default Board;
