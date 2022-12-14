import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box, Button, Typography, Skeleton, Snackbar } from "@mui/material";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import React from "react";

import { GamesSliderData } from "../components/GamesSliderData";
import Minesweeper from "../pages/Minesweeper";
import Nonogram from "../pages/Nonogram";
import Daily from "./DailyChallenge";
import ErrorPage from "./ErrorPage";
import Flood from "../pages/Flood";
import "../Styles/Game.scss";
import axios from "axios";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            staleTime: Infinity,
        },
    },
});

const gameComponents = {
    Nonogram,
    Minesweeper,
    Flood,
    Daily,
};

const tokenURL = "../.netlify/functions/server/score/token";
const submitURL = "../.netlify/functions/server/score/submit";

function GamePage() {
    let navigate = useNavigate();
    const { id } = useParams();

    const [gameState, setGameState] = useState({
        show: false,
        sessionID: 0,
        won: false,
        name: id,
        // start: 0,
        // end: Infinity,
        // sent: false,
        // multiplier: 1,
    });

    const [scoreState, setScoreState] = useState({
        start: 0,
        end: Infinity,
        submitted: false,
        multiplier: 1,
        error: "",
    });

    const [open, setOpen] = useState(false);

    const navToLeaderBoards = () => {
        // mangu id saata nii et leaderboardist tuleks see oige lahti
        //setstate({ data: { id } });
        navigate("/leaderboard");
    };

    const stateSetters = {
        newGame: (showGame = true) => {
            // setState on asynchronous, seega targem kohe showGame siin kasutada
            setGameState({
                show: showGame,
                sessionID: gameState.sessionID + 1,
                won: false,
                name: id,
            });
            setScoreState({
                start: performance.now(),
                end: scoreState.end,
                submitted: false,
                multiplier: 1,
                error: "",
            });
            if (showGame) {
                queryClient.refetchQueries();
                return;
            }
        },

        setGameWon: (isWon, multiplier = 1) => {
            if (isWon === gameState.won) {
                return;
            }
            setGameState({
                show: gameState.show,
                sessionID: gameState.sessionID,
                won: isWon,
                name: id,
            });
            setScoreState({
                start: scoreState.start,
                end: isWon ? performance.now() : scoreState.end,
                multiplier,
                submitted: false,
                error: "",
            });
        },
    };

    const submitScore = async (e) => {
        e.preventDefault(); //doesnt show snackbar on mobile otherwise
        setOpen(true);
        if (!gameState.won) {
            return;
        }
        const time = scoreState.end - scoreState.start;
        const score = time * scoreState.multiplier;
        const { username, token } = JSON.parse(sessionStorage.getItem("user"));
        const game = currentGame.name.toLowerCase();
        let error = false;
        let errorMessage = "";

        const tokenRes = await axios.post(
            tokenURL,
            {
                game,
                score,
            },
            {
                headers: {
                    content: "application/json",
                    authorization: `Bearer ${token}`,
                },
            }
        );

        if (tokenRes.data.error) {
            error = true;
            errorMessage += tokenRes.data.text;
        }

        const gameToken = tokenRes.data.object.token;

        const submitRes = await axios.post(
            submitURL,
            {
                username,
                gameID: GamesSliderData.indexOf(currentGame),
                score,
            },
            {
                headers: {
                    content: "application/json",
                    authorization: `Bearer ${token}, Bearer ${gameToken}`,
                },
            }
        );

        if (submitRes.data.error) {
            error = true;
            errorMessage += tokenRes.data.text;
        }

        if (error) {
            return setScoreState({
                start: scoreState.start,
                end: scoreState.end,
                submitted: false,
                multiplier: scoreState.multiplier,
                error: errorMessage,
            });
        }
        setScoreState({
            start: scoreState.start,
            end: scoreState.end,
            submitted: true,
            multiplier: scoreState.multiplier,
            error: "",
        });
        //setState({ sent: false });
    };

    const currentGame =
        GamesSliderData.filter((game) => {
            return game.name === id;
        })[0] ?? null;

    if (!currentGame) {
        return <ErrorPage />;
    }
    const Game = gameComponents[currentGame.name];
    console.log(currentGame);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <QueryClientProvider client={queryClient}>
            <Box className="game" id="game">
                <Box className="gameWindowWrap">
                    <Box className="gameWindow">
                        <Typography variant="h3" className="title">
                            {id === "Daily" ? `${id} challenge` : id}
                            {gameState.won ? " complete!" : ""}
                        </Typography>
                        <Button onClick={stateSetters.newGame}>New game</Button>
                        <Button onClick={submitScore} disabled={!gameState.won}>
                            Submit score
                        </Button>
                        <Box className="playableGame">
                            {gameState.show ? (
                                <Game
                                    key={`${gameState.name}-${gameState.sessionID}`}
                                    stateSetters={stateSetters}
                                    name={gameState.name}
                                />
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
                        </Box>
                        {open && (
                            <Snackbar
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "center",
                                }}
                                open={open}
                                onClose={handleClose}
                                message={
                                    scoreState.sent
                                        ? "Score saved. Check out the leaderboards!"
                                        : scoreState.error
                                }
                                key={"snackbar"}
                            />
                        )}
                    </Box>
                </Box>
                <Box className="divider"></Box>
                <Box className="bottomWrap">
                    <Box className="leftDiv">
                        <Box className="leftContent">
                            <Box className="instructions">
                                <Typography className="title">
                                    Instructions
                                </Typography>
                                <Typography
                                    sx={{ color: "white" }}
                                    className="text"
                                >
                                    {currentGame.instructions}
                                </Typography>
                            </Box>

                            <Link className="tutorial">
                                <Button className="btn">Video tutorial</Button>
                            </Link>
                        </Box>
                    </Box>
                    <Box className="rightDiv">
                        <Box className="rightContent">
                            <Typography className="title">
                                Want to get competetive ?
                            </Typography>
                            <Typography className="subtitle">
                                Check out leaderboards
                            </Typography>

                            <Button
                                className="leaderboardsBtn btn"
                                onClick={navToLeaderBoards}
                                variant="primary"
                            >
                                Leaderboards
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </QueryClientProvider>
    );
}

export default GamePage;
