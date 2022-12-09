import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import React from "react";
import axios from "axios";
import { useEffect } from "react";

import "../components/flood/flood.css";
import { Skeleton } from "@mui/material";
import Board from "../components/flood/Board";

const Flood = ({ stateSetters, name }) => {
    const { isLoading, isFetching, error, data } = useQuery(
        ["Flood", "Seed"],
        async () => {
            const res = await axios.get(
                "../.netlify/functions/server/seed/random"
            );
            return res.data;
        }
    );

    useEffect(() => {
        if (name !== "Flood") {
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
        <Board seed={data.object.seed} setGameWon={stateSetters.setGameWon} />
    );
};

Flood.propTypes = {
    stateSetters: PropTypes.objectOf(PropTypes.func),
    name: PropTypes.string,
};

export default Flood;
