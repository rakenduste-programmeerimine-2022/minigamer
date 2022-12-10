import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import React from "react";
import axios from "axios";
import { useEffect } from "react";

import "../components/flood/flood.css";
import { Skeleton } from "@mui/material";
import Board from "../components/flood/Board";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: Infinity,
    },
  },
});

function Flood() {
  const [state, setState] = useState({
    showGame: false,
    gameID: 0,
    gameWon: false,
    startTime: 0,
    endTime: Infinity,
    clicks: 0,
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

  const setGameWon = (gameWon, clicks) => {
    if (gameWon === state.gameWon) {
      return;
    }
    setState({
      showGame: state.showGame,
      gameID: state.gameID,
      gameWon: gameWon,
      startTime: state.startTime,
      endTime: gameWon ? performance.now() : state.endTime,
      clicks,
    });
  };

  const submitScore = () => {
    if (!state.gameWon) {
      return;
    }
    const time = Math.ceil((state.endTime - state.startTime) / 10);
    const score = time * state.clicks;
    console.log(score);
  };

    return (
        <QueryClientProvider client={queryClient}>
            <Typography variant="h2">
                Flood{state.gameWon ? " complete!" : ""}
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
};

Flood.propTypes = {
    stateSetters: PropTypes.objectOf(PropTypes.func),
    name: PropTypes.string,
};

export default Flood;
