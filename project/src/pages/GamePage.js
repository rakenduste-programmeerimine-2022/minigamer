import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import "../Styles/Game.scss";
import Minesweeper from "../pages/Minesweeper";
import Sudoku from "../pages/Sudoku";
import Nonogram from "../pages/Nonogram";
import { useParams, useNavigate, Link } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { GamesSliderData } from "../components/GamesSliderData";

function GamePage() {
  let navigate = useNavigate();
  let currentGame = GamesSliderData;

  const { id } = useParams();
  //console.log(id);
  let game = null;
  if (id == "Minesweeper") {
    game = <Minesweeper />;
    //currentGame = currentGame.splice(0, 1);
    //console.log(currentGame);
  } else if (id == "Nonogramm") {
    game = <Nonogram />;
    //currentGame = currentGame.splice(2, 1);
    //console.log(currentGame);
  } else if (id == "Sudoku") {
    game = <Sudoku />;
    //currentGame = currentGame.splice(1, 1);
    //console.log(currentGame);
  } else {
    game = <ErrorPage />;
  }

  //console.log(currentGame);

  const [state, setstate] = useState({ data: "" });

  const sendData = () => {
    setstate({ data: { id } });
    navigate("/leaderboard");
  };

  {
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
                <Typography
                  sx={{ color: "white" }}
                  className="text"
                ></Typography>
              </Box>
              <Typography className="tutorial">Video tutorial</Typography>
              <Box className="video"></Box>
            </Box>
          </Box>
          <Box className="rightDiv">
            <Box className="rightContent">
              <Typography className="title">
                Want to get competetive ?
              </Typography>
              <Typography className="subtitle">
                Check out leaderboards
              </Typography>

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
}

export default GamePage;
