//import React, { useState } from "react";
//import { Box, Typography, Button, Skeleton } from "@mui/material";
//import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//import { useQuery } from "@tanstack/react-query";

import { Box } from "@mui/system";
import React from "react";
import "../Styles/Minesweeper.scss";
import Game from "../components/minesweeper/Game";

/* const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: Infinity,
    },
  },
}); */

const Minesweeper = ({ setGameWon, state }) => {
  //console.log(state);
  /* const [state, setState] = useState({
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
  }; */
  return (
    <Box className="minesweeper">
      <Game key={`game-${state.gameID}`} setGameWon={setGameWon} />
    </Box>
  );
};
export default Minesweeper;
