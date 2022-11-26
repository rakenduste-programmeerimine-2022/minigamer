import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const Register = (props) => {
  const userRef = useRef();
  const errRef = useRef();

  const [username, setusername] = useState("");
  const [password, setPass] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username);
    //setSuccess(true);

    axios
      .post("http://localhost:8888/.netlify/functions/server/user/register", {
        username: username,
        password: password,
      })
      .then((res) => {
        setSuccess("registrated");
      });
  };

  return (
    <div className="authContainer">
      <h1>Register</h1>
      {success ? (
        <h1>you are registrated</h1>
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
            Register
          </button>
        </form>
      )}
    </div>
  );
};

export default Register;
