import { Button } from "@mui/material";
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
  const [showGame, setShowGame] = useState(false);
  const [sessionID, setSessionID] = useState(0);

  const onClick = () => {
    setSessionID(sessionID + 1);
    if (showGame) {
      queryClient.refetchQueries();
      return;
    }
    setShowGame(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      {showGame ? (
        <>
          <Button onClick={onClick}>New game</Button>
          <Game key={sessionID} />
        </>
      ) : (
        <>
          <Button onClick={onClick}>New game</Button>
        </>
      )}
    </QueryClientProvider>
  );
}

export default Nonogram;
