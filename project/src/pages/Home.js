import React from "react";
import Box from "@mui/material/Box";
import HeroImage from "../components/HeroImage";
import GamesSlider from "../components/GamesSlider";
import LeaderBoardsSection from "../components/LeaderBoardsSection";
import DailyChallengeSection from "../components/DailyChallengeSection";

function Home() {
  return (
    <Box>
      <HeroImage></HeroImage>
      <GamesSlider></GamesSlider>
      <LeaderBoardsSection></LeaderBoardsSection>
      <DailyChallengeSection></DailyChallengeSection>
    </Box>
  );
}

export default Home;
