import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const Login = (props) => {
  const userRef = useRef();
  const errRef = useRef();

  const [username, setusername] = useState("");
  const [password, setPass] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username);
    //setSuccess(true);
    const LoginURL = "../.netlify/functions/server/user/login";

    axios
      .post(LoginURL, {
        username: username,
        password: password,
      })
      .then((res) => {
        setLoginStatus(res.data.text);
      })
      .catch((err) => {
        console.log(err);
        setLoginStatus(err.response.data.text);
      });
  };

  return (
    <div className="authContainer">
      <h1>Login</h1>
      <form className="authForm" onSubmit={handleSubmit}>
        <label className="labels" htmlFor="username">
          username
          <input
            className="username"
            placeholder="Username"
            id="username"
            name="username"
            ref={userRef}
            onChange={(e) => setusername(e.target.value)}
            value={username}
            required
          />
        </label>

        <label className="labels" htmlFor="password">
          password
          <input
            className="password"
            type="password"
            placeholder="*******"
            id="password"
            name="password"
            onChange={(e) => setPass(e.target.value)}
            value={password}
          />
        </label>
        <button className="submitBtn btn" type="submit">
          Login
        </button>
        {loginStatus}
      </form>
    </div>
  );
};

export default Login;
