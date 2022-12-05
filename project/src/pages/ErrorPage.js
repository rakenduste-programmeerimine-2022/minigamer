import React from "react";
import Box from "@mui/material/Box";
import "../Styles/ErrorPage.scss";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  let navigate = useNavigate();

  return (
    <Box className="errorPage" id="errorPage">
      <Box className="errorWrap">
        <Typography className="title">
          Page doesnt exist or has been moved
        </Typography>
        <Button onClick={() => navigate("/")} className="btn">
          Back to home
        </Button>
      </Box>
    </Box>
  );
}

export default ErrorPage;
