import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box, Button, Typography, Skeleton, Alert } from "@mui/material";
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

function GamePage() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [state, setState] = useState({
    showGame: false,
    gameID: 0,
    gameWon: false,
    startTime: 0,
    endTime: Infinity,
  });

  const [scoreSent, setScoreSent] = useState(false);

  const navToLeaderBoards = () => {
    // mangu id saata nii et leaderboardist tuleks see oige lahti
    //setstate({ data: { id } });
    navigate("/leaderboard");
  };

  const stateSetters = {
    newGame: (showGame = true) => {
      setState({
        showGame: showGame,
        gameID: state.gameID + 1,
        gameWon: false,
        startTime: performance.now(),
        endTime: state.endTime,
        gameName: id,
      });
      if (state.showGame) {
        queryClient.refetchQueries();
        return;
      }
    },

    setGameWon: (isWon) => {
      if (isWon === state.gameWon) {
        return;
      }
      setState({
        showGame: state.showGame,
        gameID: state.gameID,
        gameWon: isWon,
        startTime: state.startTime,
        endTime: isWon ? performance.now() : state.endTime,
        gameName: id,
      });
    },
  };

  const submitScore = () => {
    if (!state.gameWon) {
      return;
    }
    // millis
    const time = state.endTime - state.startTime;
    console.log(time);
    setScoreSent(true);
  };

  const currentGame =
    GamesSliderData.filter((game) => {
      return game.name === id;
    })[0] ?? null;

  if (!currentGame) {
    return <ErrorPage />;
  }
  const Game = gameComponents[currentGame.name];

  return (
    <QueryClientProvider client={queryClient}>
      <Box className="game" id="game">
        <Box className="gameWindowWrap">
          <Box className="gameWindow">
            <Typography variant="h3" className="title">
              {id === "Daily" ? `${id} challenge` : id}
              {state.gameWon ? " complete!" : ""}
            </Typography>
            <Button onClick={stateSetters.newGame}>New game</Button>
            <Button onClick={submitScore} disabled={!state.gameWon}>
              Submit score
            </Button>
            <Alert severity="success">
              This is a success alert — check it out!
            </Alert>
            <Box className="playableGame">
              {state.showGame ? (
                <Game
                  key={`${state.gameName}-${state.gameID}`}
                  stateSetters={stateSetters}
                  name={state.gameName}
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
          </Box>
        </Box>
        <Box className="divider"></Box>
        <Box className="bottomWrap">
          <Box className="leftDiv">
            <Box className="leftContent">
              <Box className="instructions">
                <Typography className="title">Instructions</Typography>
                <Typography sx={{ color: "white" }} className="text">
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
