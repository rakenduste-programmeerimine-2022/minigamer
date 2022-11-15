import seedrandom from "seedrandom";
import React from "react";

import Column from "./Column";
import { Box } from "@mui/material";

export const BoardContext = React.createContext();
const BOARD_SIZE = 10;

const Board = ({ seed }) => {
    const rng = seedrandom(seed);
    const currentBoard = Array(BOARD_SIZE);
    const solutionBoard = Array(BOARD_SIZE);

    const randomBool = () => {
        return rng.quick() > 0.5;
    };

    const onMouseUp = (e) => {
        console.log(seed);
        console.log("CURRENT", currentBoard);
        console.log("SOLUTION", solutionBoard);
    };

    for (let i = 0; i < BOARD_SIZE; i++) {
        currentBoard[i] = Array(10).fill(false);
        solutionBoard[i] = Array(10);
        for (let j = 0; j < BOARD_SIZE; j++) {
            solutionBoard[i][j] = Boolean(randomBool());
        }
    }

    return (
        <Box className="grid" onMouseUp={onMouseUp}>
            <BoardContext.Provider value={currentBoard}>
                <Column level={0} />
                <Column level={1} />
                <Column level={2} />
                <Column level={3} />
                <Column level={4} />
                <Column level={5} />
                <Column level={6} />
                <Column level={7} />
                <Column level={8} />
                <Column level={9} />
            </BoardContext.Provider>
        </Box>
    );
};

export default Board;
