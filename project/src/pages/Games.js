import { Box } from "@mui/material";
import React from "react";
import GamesSlider from "../components/GamesSlider";
import { GamesSliderData } from "../components/GamesSliderData";
import "../Styles/GamesSlider.scss";

function Games() {
  return (
    <Box className="games" id="games">
      <GamesSlider slides={GamesSliderData}></GamesSlider>
    </Box>
  );
}

export default Games;
