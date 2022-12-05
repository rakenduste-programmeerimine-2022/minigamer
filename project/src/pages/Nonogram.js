import { Button, Skeleton, Typography } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

import Game from "../components/nonogram/Game";

const seedQueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            staleTime: Infinity,
        },
    },
});

const tokenURL = "../.netlify/functions/server/score/token";
const submitURL = "../.netlify/functions/server/score/submit";

function Nonogram() {
    const [state, setState] = useState({
        showGame: false,
        gameID: 0,
        gameWon: false,
        startTime: 0,
        endTime: Infinity,
    });

    const newGame = () => {
        setState({
            showGame: true,
            gameID: state.gameID + 1,
            gameWon: false,
            startTime: performance.now(),
            endTime: state.endTime,
        });
        if (state.showGame) {
            seedQueryClient.refetchQueries();
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
            startTime: state.startTime,
            endTime: value ? performance.now() : state.endTime,
        });
    };

    const submitScore = async () => {
        if (!state.gameWon) {
            return;
        }
        // millis
        const time = Math.ceil((state.endTime - state.startTime) / 10);
        const { username, token } = JSON.parse(sessionStorage.getItem("user"));
        let res = await axios.post(
            tokenURL,
            {
                game: "nonogram",
                score: time,
            },
            {
                headers: {
                    Content: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const gameToken = res.data.object.token;
        res = await axios.post(
            submitURL,
            {
                username,
                gameID: 0,
                score: time,
            },
            {
                headers: {
                    Content: "application/json",
                    Authorization: `Bearer ${token}, Bearer ${gameToken}`,
                },
            }
        );
        // snackbar / alert about submitting
        newGame();
    };

    return (
        <QueryClientProvider client={seedQueryClient}>
            <Typography variant="h2">
                Nonogram{state.gameWon ? " complete!" : ""}
            </Typography>
            <Button onClick={newGame}>New game</Button>
            {state.showGame ? (
                <>
                    <Button onClick={submitScore} disabled={!state.gameWon}>
                        Submit score
                    </Button>
                    <Game
                        key={`game-${state.gameID}`}
                        setGameWon={setGameWon}
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
