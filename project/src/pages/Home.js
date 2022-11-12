import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import HeroImage from "../components/HeroImage";
import GamesSlider from "../components/GamesSlider";
import LeaderBoards_Section from "../components/LeaderBoards_Section";
import DailyChallenge_section from "../components/DailyChallenge_section";

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
