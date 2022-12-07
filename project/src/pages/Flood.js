import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import axios from "axios";

import "../components/flood/flood.css";
import Board from "../components/flood/Board";

const Flood = ({ setGameWon }) => {
  const { isLoading, isFetching, error, data } = useQuery(
    ["Flood Seed"],
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

Flood.propTypes = {
  setGameWon: PropTypes.func,
};

export default Flood;
