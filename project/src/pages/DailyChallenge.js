import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import React from "react";
import axios from "axios";
import { useEffect } from "react";

import "../Styles/Minesweeper.scss";
import "../components/flood/flood.css";
import "../components/nonogram/nonogram.css";
import { Box, Skeleton } from "@mui/material";

import { default as Nonogram } from "../components/nonogram/Board";
import { default as Minesweeper } from "../components/minesweeper/Board";
import { default as Flood } from "../components/flood/Board";

const games = [Nonogram, Minesweeper, Flood];

const Daily = ({ stateSetters, name }) => {
  const { isLoading, isFetching, error, data } = useQuery(
    ["Daily", "Seed"],
    async () => {
      const sessionUser = sessionStorage.getItem("user");
      if (!sessionUser) {
        throw new Error("Not logged in.");
      }
      const { token } = JSON.parse(sessionUser);
      console.log(JSON.parse(sessionUser));
      console.log({ token });
      const res = await axios.get("../.netlify/functions/server/seed/daily", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.error) {
        throw new Error(res.data.text);
      }
      return res.data;
    }
  );

  useEffect(() => {
    if (name !== "Daily") {
      stateSetters.newGame(false);
    }
  });

  if (isLoading || isFetching) {
    return (
      <Skeleton
        variant="rectangular"
        height={500}
        width={500}
        animation={"wave"}
      />
    );
  }
  if (error) {
    return `Error: ${error}`;
  }

  const { daily } = data.object;
  const Game = games[daily.gameID];

  return (
    <Box className={"Daily"}>
      <Game seed={daily.seed} setGameWon={stateSetters.setGameWon} />
    </Box>
  );
};

Daily.propTypes = {
  stateSetters: PropTypes.objectOf(PropTypes.func),
  name: PropTypes.string,
};

export default Daily;
