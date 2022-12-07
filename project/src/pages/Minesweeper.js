import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import React from "react";
import axios from "axios";

import "../Styles/Minesweeper.scss";
import { Box, Skeleton } from "@mui/material";
import Board from "../components/minesweeper/Board";

const Minesweeper = ({ setGameWon, setState, state }) => {
  const { isLoading, isFetching, error, data } = useQuery(
    ["Minesweeper", "Seed"],
    async () => {
      const res = await axios.get("../.netlify/functions/server/seed/random");
      return res.data;
    }
  );
  if (state.gameName !== "Minesweeper") {
    setState({ showGame: false });
  }
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
    <Box className={"Minesweeper"}>
      <Board seed={data.object.seed} setGameWon={setGameWon} />;
    </Box>
  );
};

Minesweeper.propTypes = {
  setGameWon: PropTypes.func,
};

export default Minesweeper;
