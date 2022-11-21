import { Button, Skeleton, Typography } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";

import Game from "../components/nonogram/Game";
import "../components/nonogram/style.css";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            staleTime: Infinity,
        },
    },
});

function Nonogram() {
    const [state, setState] = useState({
        showGame: false,
        gameID: 0,
        gameWon: false,
    });

    const newGame = () => {
        setState({
            showGame: true,
            gameID: state.gameID + 1,
            gameWon: false,
        });
        if (state.showGame) {
            queryClient.refetchQueries();
            return;
        }
    };

    const setGameWon = (value) => {
        if (value === state.gameWon) {
            return;
        }
        setState({
            showGame: state.showGame,
            gameID: state.gameID,
            gameWon: value,
        });
    };

    const submitScore = () => {
        if (!state.gameWon) {
        }
    };

    return (
        <QueryClientProvider client={queryClient}>
            <Typography variant="h2">Nonogram</Typography>
            <Button onClick={newGame}>New game</Button>
            {state.showGame ? (
                <>
                    <Button onClick={submitScore} disabled={!state.gameWon}>
                        Submit score
                    </Button>
                    <Game
                        key={state.gameID}
                        setGameWon={setGameWon}
                        className={`${state.gameWon ? "BoardSolved" : ""}`}
                    />
                </>
            ) : (
                <>
                    <Skeleton
                        variant="rectangular"
                        height={500}
                        width={500}
                        animation={false}
                    />
                </>
            )}
        </QueryClientProvider>
    );
}

export default Nonogram;
