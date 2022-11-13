import React from "react";
import Column from "./Column";
import { Box } from "@mui/material";

export const BoardContext = React.createContext();

const Board = () => {
    const board = Array(10).fill(Array(10).fill(false));
    const onMouseUp = (e) => {
        console.log(board);
    };

    return (
        <BoardContext.Provider value={board}>
            <Box className="grid" onMouseUp={onMouseUp}>
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
            </Box>
        </BoardContext.Provider>
    );
};

export default Board;
