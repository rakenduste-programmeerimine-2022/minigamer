import { Box, Button, Typography } from "@mui/material";
import React from "react";
import "../Styles/Game.scss";
import Minesweeper from "../pages/Minesweeper";
import Flood from "../pages/Flood";
import Nonogram from "../pages/Nonogram";
import { useParams, useNavigate, Link } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { GamesSliderData } from "../components/GamesSliderData";

function GamePage() {
  let navigate = useNavigate();
  //let currentGame = GamesSliderData;

  const { id } = useParams();
  //console.log(id);
  let game = null;
  let currentGame = GamesSliderData.filter((obj) => {
    return obj.name === id;
  });
  console.log(currentGame);
  if (id === "Minesweeper") {
    game = <Minesweeper />;
  } else if (id === "Nonogramm") {
    game = <Nonogram />;
  } else if (id === "Sudoku") {
    game = <Flood />;
  } else {
    game = <ErrorPage />;
    return <ErrorPage />;
  }

  const sendData = () => {
    //setstate({ data: { id } });
    navigate("/leaderboard");
  };

  return (
    <Box className="game" id="game">
      <Box className="gameWindowWrap">
        <Box className="gameWindow">
          <Box className="playableGame">{game}</Box>
        </Box>
      </Box>
      <Box className="divider"></Box>
      <Box className="bottomWrap">
        <Box className="leftDiv">
          <Box className="leftContent">
            <Box className="instructions">
              <Typography className="title">Instructions</Typography>
              <Typography sx={{ color: "white" }} className="text">
                {currentGame[0].instructions}
              </Typography>
            </Box>

            <Link className="tutorial">
              <Button className="btn">Video tutorial</Button>
            </Link>
          </Box>
        </Box>
        <Box className="rightDiv">
          <Box className="rightContent">
            <Typography className="title">Want to get competetive ?</Typography>
            <Typography className="subtitle">Check out leaderboards</Typography>

            <Button
              className="leaderboardsBtn btn"
              onClick={sendData}
              variant="primary"
            >
              Leaderboards
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default GamePage;
