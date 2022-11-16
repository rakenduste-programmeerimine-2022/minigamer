import { Box } from "@mui/material";
import React from "react";
import DailyChallengeSection from "../components/DailyChallengeSection";
import GamesSlider from "../components/GamesSlider";
import { GamesSliderData } from "../components/GamesSliderData";
import "../Styles/GamesSlider.scss";

function Games() {
  return (
    <Box className="games" id="games">
      <GamesSlider slides={GamesSliderData}></GamesSlider>
      <DailyChallengeSection></DailyChallengeSection>
    </Box>
  );
}

export default Games;
