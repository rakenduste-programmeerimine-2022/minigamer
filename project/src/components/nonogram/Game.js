import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "axios";

import Board from "./Board";

const Game = () => {
    const { isLoading, error, data } = useQuery(["randomSeed"], async () => {
        const res = await axios.get("../.netlify/functions/server/seed/random");
        return res.data;
    });

    if (isLoading) {
        return "Loading...";
    }
    if (error) {
        return `Error: ${error}`;
    }

    return <Board seed={data.object.seed} draggable="false" />;
};

// Game.propTypes = {};

export default Game;
