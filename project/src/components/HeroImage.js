import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

//siin mingi width probleem

function HeroImage() {
  return (
    <Box
      className="Hero_image"
      sx={
        {
          /* width: 1,
        height: 1, */
          /* width: "100vw - 200px", height: "100vh", backgroundColor: "blue" */
        }
      }
    >
      <Box className="hero_text">
        <Typography
          variant="h2"
          className="text"
          sx={{ textTransform: "uppercase" }}
        >
          Minigamer
        </Typography>
      </Box>
    </Box>
  );
}

export default HeroImage;
