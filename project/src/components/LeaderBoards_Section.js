import React from "react";
import { Button, Container } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";

function LeaderBoards_Section() {
  let navigate = useNavigate();

  return (
    <Box
      className="leaderBoards_section"
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        p: 2,
        backgroundColor: "gray",
      }}
    >
      <Container>
        <Box sx={{ width: 1 }}>
          <Typography
            className="title"
            variant="h3"
            sx={{ display: "flex", justifyContent: "flex-start" }}
          >
            Compete with others
          </Typography>
          <Box
            className="divider"
            sx={{ width: 1, height: 2, backgroundColor: "gray" }}
          ></Box>
          <Button
            variant="primary"
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              backgroundColor: "blue",
            }}
            onClick={() => {
              navigate("/leaderboard");
            }}
          >
            leaderboards
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default LeaderBoards_Section;
