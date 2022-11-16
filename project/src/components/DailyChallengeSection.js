import React from "react";
import { Box } from "@mui/system";
import { Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function DailyChallengeSection() {
  let navigate = useNavigate();

  return (
    <Box
      className="dailyChallengeSection"
      sx={{ width: 1, height: 1, backgroundColor: "black" }}
    >
      <Container>
        <Box className="dailyChallengeWrapper">
          <Box
            className="leftDiv"
            onClick={() => {
              navigate("/leaderboard");
            }}
          >
            {/* <Box
            className="challengeImg"
            sx={{ backgroundColor: "black", width: 1, height: 1 }}
          ></Box> */}
            <Box
              className="dailyChallenge"
              sx={{ backgroundColor: "white", width: 1, height: 1 }}
            >
              {" "}
              <Typography className="dailyText" variant="h5">
                Daily Challenge
              </Typography>
            </Box>
          </Box>
          <Box className="rightDiv">
            <Typography className="title">Complete Daily challenges</Typography>
            <Box>
              <Typography className="text">
                Everyday there is a special challenge for one randomly selected
                game. All players can play game with the same seed and compete
                with each other.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default DailyChallengeSection;
