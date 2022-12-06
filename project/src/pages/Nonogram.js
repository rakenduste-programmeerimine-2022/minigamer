import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import React from "react";
import axios from "axios";

import "../components/nonogram/nonogram.css";
import { Skeleton } from "@mui/material";
import Board from "../components/nonogram/Board";

const Nonogram = ({ setGameWon }) => {
  const { isLoading, isFetching, error, data } = useQuery(
    ["Nonogram Seed"],
    async () => {
      const res = await axios.get("../.netlify/functions/server/seed/random");
      return res.data;
    }
  );

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

  return <Board seed={data.object.seed} setGameWon={setGameWon} />;
};

Nonogram.propTypes = {
  setGameWon: PropTypes.func,
};

export default Nonogram;
