import React, { useState, useRef, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Grid,
  Paper,
  TextField,
  Alert,
  CircularProgress,
} from "@mui/material";
import "../Styles/loginRegister.scss";
import { UserContext } from "../App";

const Login = (props) => {
  const userRef = useRef();
  const nav = useNavigate();

  const [username, setusername] = useState("");
  const [password, setPass] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const [open, setOpen] = useState(null);
  const [severity, setSeverity] = useState("info");

  const [currentUser, setCurrentUser] = useContext(UserContext);
  console.log(currentUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const LoginURL = "../.netlify/functions/server/user/login";

    axios
      .post(
        LoginURL,
        { username, password },
        {
          headers: { Content: "application/json" },
          withCredentials: true,
        }
      )
      .then((res) => {
        setSeverity("success");
        setLoginStatus(res.data.text);
        //setUserToken(res.data.object.token);
        const token = res.data.object.token;
        //const name = res.data.object;
        const localUser = { username, token };
        sessionStorage.setItem("user", JSON.stringify(localUser));
        setCurrentUser({ username, token });
        setOpen(true);
        nav("/");
      })
      .catch((err) => {
        setLoginStatus(err.response.data.text);
        setusername("");
        setPass("");
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
              Login
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
            Login
          </Button>
          {open ? (
            <Alert severity={severity} className="info">
              {loginStatus}
            </Alert>
          ) : (
            <Alert className="info hidden"></Alert>
          )}
          {severity === "success" && <CircularProgress />}
        </form>
        <Box className="changeAuth">
          <Typography>Don't have account ?</Typography>
          <Button
            onClick={() => {
              nav("/register");
            }}
            className="authBtn btn"
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
