import React from "react";
import Box from "@mui/material/Box";
import HeroImage from "../components/HeroImage";
import GamesSlider from "../components/GamesSlider";
import LeaderBoards_Section from "../components/LeaderBoardsSection";
import DailyChallenge_section from "../components/DailyChallengeSection";

function Home() {
  return (
    <Box>
      <HeroImage></HeroImage>
      <GamesSlider></GamesSlider>
      <LeaderBoards_Section></LeaderBoards_Section>
      <DailyChallenge_section></DailyChallenge_section>
    </Box>
  );
}

export default Home;
