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

    axios
      .post("http://localhost:8888/.netlify/functions/server/user/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        setLoginStatus("logged in");
      });
  };

  return (
    <div className="authContainer">
      <h1>Login</h1>
      {loginStatus ? (
        <h1>you are logged in</h1>
      ) : (
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
        </form>
      )}
    </div>
  );
};

export default Login;
