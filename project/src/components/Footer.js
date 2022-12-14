import { Box } from "@mui/material";
import React from "react";

function Footer() {
  return (
    <Box
      sx={{
        width: "100vw",
        position: "static",
        bottom: 0,
      }}
    >
      <Box
        sx={{
          p: 3,
          color: "white",
          height: 4,
          backgroundColor: "black",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box>MINIGAMER</Box>
      </Box>
    </Box>
  );
}

export default Footer;
