import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
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
    return (
        <QueryClientProvider client={queryClient}>
            <Game />
        </QueryClientProvider>
    );
}

export default Nonogram;
