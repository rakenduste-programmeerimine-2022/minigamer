import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Typography,
  Grid,
  Paper,
  TextField,
  Alert,
} from "@mui/material";

import "../Styles/loginRegister.scss";
import { Box } from "@mui/system";

const Register = (props) => {
  const userRef = useRef();
  const nav = useNavigate();

  const [username, setusername] = useState("");
  const [password, setPass] = useState("");
  const [regStatus, setRegStatus] = useState(false);
  const [open, setOpen] = useState(null);
  const [severity, setSeverity] = useState("info");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username);
    //setSuccess(true);
    const RegisterURL = "../.netlify/functions/server/user/register";

    axios
      .post(RegisterURL, {
        username: username,
        password: password,
      })
      .then((res) => {
        setRegStatus(res.data.text);
        setPass("");
        setusername("");
        setOpen(true);
        setSeverity("success");
      })
      .catch((err) => {
        setRegStatus(err.response.data.text);
        setPass("");
        setusername("");
        setOpen(true);
        setSeverity("error");
      });
  };

  return (
    <Box className="authContainer">
      <Paper elevation={10} className="paper">
        <form className="authForm" onSubmit={handleSubmit}>
          <Grid>
            <Typography className="title" variant="h3">
              Register
            </Typography>
          </Grid>
          <TextField
            className="username textfield"
            placeholder="Username"
            id="username"
            name="username"
            ref={userRef}
            onChange={(e) => setusername(e.target.value)}
            value={username}
            required
            fullWidth
            variant="filled"
            autoComplete="off"
          />
          <TextField
            className="password textfield"
            type="password"
            placeholder="*******"
            id="password"
            name="password"
            onChange={(e) => setPass(e.target.value)}
            value={password}
            required
            fullWidth
            variant="filled"
          />
          <Button className="submitBtn btn" type="submit">
            Register
          </Button>
          {open ? (
            <Alert severity={severity} className="info">
              {regStatus}
            </Alert>
          ) : (
            <Alert className="info hidden"></Alert>
          )}
        </form>
        <Box className="changeAuth">
          <Typography>Already have account ?</Typography>
          <Button
            onClick={() => {
              nav("/login");
            }}
            className="authBtn btn"
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
