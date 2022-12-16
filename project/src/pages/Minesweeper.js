import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import React from "react";
import axios from "axios";
import { useEffect } from "react";

import "../Styles/Minesweeper.scss";
import { Box, Skeleton } from "@mui/material";
import Board from "../components/minesweeper/Board";

const Minesweeper = ({ stateSetters, name }) => {
  const { isLoading, isFetching, error, data } = useQuery(
    ["Minesweeper", "Seed"],
    async () => {
      const res = await axios.get("../.netlify/functions/server/seed/random");
      return res.data;
    }
  );

  useEffect(() => {
    if (name !== "Minesweeper") {
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

  return (
      <Box>
          <Board seed={data.object.seed} setGameWon={stateSetters.setGameWon} />
      </Box>
  );
};

Minesweeper.propTypes = {
  stateSetters: PropTypes.objectOf(PropTypes.func),
  name: PropTypes.string,
};

export default Minesweeper;
