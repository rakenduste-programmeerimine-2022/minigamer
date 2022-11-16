import React from "react";
import Box from "@mui/material/Box";
import HeroImage from "../components/HeroImage";
import GamesSlider from "../components/GamesSlider";
import { GamesSliderData } from "../components/GamesSliderData";

import LeaderBoardsSection from "../components/LeaderBoardsSection";
import DailyChallengeSection from "../components/DailyChallengeSection";
import "../Styles/DailyChallengeSection.scss";

function Home() {
  return (
    <Box className="home" id="home">
      <HeroImage></HeroImage>
      <GamesSlider
        classname="homeSlider"
        slides={GamesSliderData}
        sx={{ width: 1, height: 200, backgroundColor: "gray" }}
      ></GamesSlider>
      <LeaderBoardsSection></LeaderBoardsSection>
      <DailyChallengeSection></DailyChallengeSection>
    </Box>
  );
}

export default Home;
