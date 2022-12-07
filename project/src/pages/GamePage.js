import { Box, Button, Typography, Skeleton } from "@mui/material";
import React from "react";
import "../Styles/Game.scss";
import Minesweeper from "../pages/Minesweeper";
import Flood from "../pages/Flood";
import Nonogram from "../pages/Nonogram";
import { useParams, useNavigate, Link } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { GamesSliderData } from "../components/GamesSliderData";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: Infinity,
    },
  },
});

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

  let currentGame = GamesSliderData.filter((obj) => {
    return obj.name === id;
  });
  if (currentGame.length === 0) {
    return <ErrorPage />;
  }
  const navToLeaderBoards = () => {
    // mangu id saata nii et leaderboardist tuleks see oige lahti
    //setstate({ data: { id } });
    navigate("/leaderboard");
  };

  const newGame = () => {
    setState({
      showGame: true,
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
      gameName: id,
    });
  };

  const submitScore = () => {
    if (!state.gameWon) {
      return;
    }
    // millis
    const time = state.endTime - state.startTime;
    console.log(time);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Box className="game" id="game">
        <Box className="gameWindowWrap">
          <Box className="gameWindow">
            <Typography variant="h3" className="title">
              {id}
              {state.gameWon ? " complete!" : ""}
            </Typography>
            <Button onClick={newGame}>New game</Button>
            <Button onClick={submitScore} disabled={!state.gameWon}>
              Submit score
            </Button>
            <Box className="playableGame">
              {state.showGame ? (
                <>
                  {id ? (
                    id === "Flood" ? (
                      <Flood
                        key={`game-${state.gameID}`}
                        setGameWon={setGameWon}
                        setState={setState}
                        state={state}
                      />
                    ) : id === "Minesweeper" ? (
                      <Minesweeper
                        key={`game-${state.gameID}`}
                        setGameWon={setGameWon}
                        setState={setState}
                        state={state}
                      />
                    ) : (
                      <Nonogram
                        key={`game-${state.gameID}`}
                        setGameWon={setGameWon}
                        setState={setState}
                        state={state}
                      />
                    )
                  ) : (
                    <Box>GAME not found</Box>
                  )}
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
                  {currentGame[0].instructions}
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
