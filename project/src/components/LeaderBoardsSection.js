import React from "react";
import { Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import leaderBoardImg from "../Images/leaderboard.jpg";

function LeaderBoards_Section() {
  let navigate = useNavigate();

  return (
    <Box className="leaderBoardsSection">
      <Container className="LeaderBoards" maxWidth="lg">
        <Box className="LeaderBoardsTextWrapper">
          <Box className="LeaderBoardsText">
            <Typography className="title">Compete with others</Typography>

            <Typography className="text">
              Registered users can record their score and Compete with others.
              Compete in both daily Challenges and regular challenges across 3
              diffrent games.
            </Typography>
            <Box className="btn_wrap">
              <Button
                className="leaderBoards_btn btn"
                variant="primary"
                sx={{
                  width: 200,
                  alignSelf: "center",
                }}
                onClick={() => {
                  navigate("/leaderboard");
                }}
              >
                leaderboards
              </Button>
            </Box>
          </Box>
        </Box>
        <Box className="LeaderBoardsImageWrapper">
          <Box className="LeaderBoardsImage">
            <Box
              className="image"
              component={"img"}
              src={leaderBoardImg}
              sx={
                {
                  //backgroundColor: "red",
                  //display: "flex",
                  //justifyContent: "flex-end",
                }
              }
            ></Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default LeaderBoards_Section;
