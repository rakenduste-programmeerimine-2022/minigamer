import React, { useState } from "react";
import Box from "@mui/material/Box";

function Register(props) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };
  return (
    <Box className="authContainer">
      <form className="authForm" onSubmit={handleSubmit}>
        <label className="labels">username</label>
        <input value={name} name="name" placeholder="username" />
        <label className="labels" for="email">
          email
        </label>
        <input
          value={email}
          type="enail"
          placeholder="example@gmail.com"
          id="email"
          name="email"
        />
        <label className="labels" for="password">
          password
        </label>
        <input
          type="password"
          placeholder="*******"
          id="password"
          name="password"
        />
        <button type="submit">Register </button>
      </form>
      <button onClick={() => props.onFormSwitch("login")}>Login</button>
    </Box>
  );
}

export default Register;
