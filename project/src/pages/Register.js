import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const Register = (props) => {
  const userRef = useRef();
  const errRef = useRef();

  const [username, setusername] = useState("");
  const [password, setPass] = useState("");
  const [regStatus, setRegStatus] = useState(false);

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
      })
      .catch((err) => {
        setRegStatus(err.response.data.text);
      });
  };

  return (
    <div className="authContainer">
      <h1>Register</h1>
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
            required
          />
        </label>
        <button className="submitBtn btn" type="submit">
          Register
        </button>
        {regStatus}
      </form>
    </div>
  );
};

export default Register;
