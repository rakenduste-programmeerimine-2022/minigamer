import React from "react";
import Box from "@mui/material/Box";
import "../Styles/ErrorPage.scss";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../Styles/ErrorPage.scss";

function ErrorPage({ from }) {
  let navigate = useNavigate();
  let errorText = null;
  if (from === "games") {
    errorText = {
      text: "Game does not exist",
      btnText: "back to games",
      btnLink: "/games",
    };
  } else if (from === "profile") {
    errorText = {
      text: "user does not exist",
      btnText: "Back to home",
      btnLink: "/",
    };
  } else {
    errorText = {
      text: "Page doesnt exist or has been moved",
      btnText: "Back to home",
      btnLink: "/",
    };
  }
  return (
    <Box className="errorPage" id="errorPage">
      <Box className="errorWrap">
        <Typography className="title">{errorText.text}</Typography>
        <Button onClick={() => navigate(errorText.btnLink)} className="btn">
          {errorText.btnText}
        </Button>
      </Box>
    </Box>
  );
}

export default ErrorPage;
