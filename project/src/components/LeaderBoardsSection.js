import React from "react";
import { Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";

function LeaderBoards_Section() {
  let navigate = useNavigate();

  return (
    <Box
      className="leaderBoardsSection"
      sx={{
        p: 2,
        backgroundColor: "gray",
      }}
    >
      <Container className="LeaderBoards">
        <Box className="LeaderBoardsTextWrapper">
          <Box className="LeaderBoardsText">
            <Typography className="title">Compete with others</Typography>

            <Typography className="text">
              Registered users can record their score and Compete with others.
              Stats are kept for every day but also across all time. Make your
              mark. More text vMore textMore textMore textMore textMore textMore
              textMore textMore textMore textMore textMore textMore textMore
              textMore textMore textMore textMore textMore textMore textMore
              textMore textMore textMore text
            </Typography>
            <Box
              className="divider"
              sx={{ width: 1, height: 2, backgroundColor: "gray" }}
            ></Box>
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
        <Box className="LeaderBoardsImage">
          <Box
            className="image"
            sx={
              {
                //backgroundColor: "red",
                //display: "flex",
                //justifyContent: "flex-end",
              }
            }
          ></Box>
        </Box>
      </Container>
    </Box>
  );
}

export default LeaderBoards_Section;
