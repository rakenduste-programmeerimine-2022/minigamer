import React, { useState } from "react";

function Login(props) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <div className="authContainer">
      <form className="authForm" onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      <button onClick={() => props.onFormSwitch("register")}>Register</button>
    </div>
  );
}

export default Login;
