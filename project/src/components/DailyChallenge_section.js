import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

function DailyChallenge_section() {
  return (
    <Box classname="dailyChallenge_section">
      <Typography>Complete Daily challenges</Typography>
      <Box sx={{ width: 1, height: 400, backgroundColor: "black" }}>
        <Typography
          sx={{
            color: "white",
            display: "flex",
            justifyContent: "center",
          }}
        >
          DailyChallenge
        </Typography>
      </Box>
    </Box>
  );
}

export default DailyChallenge_section;
