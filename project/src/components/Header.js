import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <Link to="/"> Home </Link>
      <Link to="/profile"> Profile </Link>
      <Link to="/games"> Games </Link>
      <Link to="/leaderboard"> Leaderboard </Link>
    </div>
  );
}

export default Header;
