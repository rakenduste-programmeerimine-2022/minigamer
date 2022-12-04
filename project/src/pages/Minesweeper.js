import React, { useState } from "react";
import { Box, Typography, Button, Skeleton } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "../Styles/Minesweeper.scss";
import Board from "../components/minesweeper/Board";
import Game from "../components/minesweeper/Game";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: Infinity,
    },
  },
});

function Minesweeper() {
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
      <Box className="minesweeper">
        <Typography variant="h3" className="title">
          Minesweeper{state.gameWon ? " complete!" : ""}
        </Typography>
        <Button onClick={newGame}>New game</Button>
        {state.showGame ? (
          <>
            <Button onClick={submitScore} disabled={!state.gameWon}>
              Submit score
            </Button>
            <Game key={`game-${state.gameID}`} setGameWon={setGameWon} />
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
    </QueryClientProvider>
  );
}

// pooleli 1.11.11

export default Minesweeper;
