import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import "../Styles/Header.scss";
import { Button } from "@mui/material";

const gamesDropdown = ["Minesweeper", "Sudoku", "Nonogramm"];
let username = "Username";

function ResponsiveAppBar() {
  const showNavbar = () => {
    const mobileNav = document.querySelector(".mobileNav");
    mobileNav.classList.toggle("responsive_nav");

    const burger = document.querySelector(".nav-btn");
    burger.classList.toggle("active");
  };

  function setActiveDropdown(e) {
    let target = e.target;
    target.classList.add("active");
    console.log(target);
  }
  function removeActiveDropdown(e) {
    let target = document.querySelector(".headerItem");
    target.classList.remove("active");
  }
  function closeNavBar() {
    const mobileNav = document.querySelector(".mobileNav");
    mobileNav.classList.remove("responsive_nav");
  }
  return (
    <AppBar className="header" position="fixed">
      <Box className="headeritem logo">
        <Link style={{ textDecoration: "none" }} to={`/`}>
          LOGO
        </Link>
      </Box>
      <Box className="dropdown">
        <Link
          className="headerItem"
          style={{ textDecoration: "none" }}
          to={`/games`}
          onMouseOver={setActiveDropdown}
          onMouseLeave={removeActiveDropdown}
        >
          Games
        </Link>
        <Box sx={{ mt: "45px" }} id="games-menu" className="dropdownContent">
          {gamesDropdown.map((game) => (
            <Link
              className="menuItem"
              style={{ textDecoration: "none" }}
              to={`/games/${game}`}
              key={game}
            >
              {game}
            </Link>
          ))}
        </Box>
      </Box>

      <Link
        className="headerItem dropdown"
        style={{ textDecoration: "none" }}
        to={`/leaderboard`}
        key="Leaderboard"
      >
        Leaderboard
      </Link>
      <Box
        sx={{ flexGrow: 0, textTransform: "uppercase" }}
        className="dropdown headerItem headerRight"
        onMouseOver={setActiveDropdown}
        onMouseLeave={removeActiveDropdown}
      >
        {username}
        <Box className="dropdownContent">
          <Link
            key="Profile"
            className="menuItem"
            style={{ textDecoration: "none" }}
            to={`/profile/${username}`}
          >
            Profile
          </Link>
          <Link
            key="login"
            className="menuItem"
            style={{ textDecoration: "none" }}
            to={`/login`}
          >
            login
          </Link>
        </Box>
      </Box>

      {/*  ------ MOBILE ------ */}
      <Box key="mobileNav" className="mobileNav" onClick={showNavbar}>
        <Box className="mobileNavWrap">
          <Box className="mobilegames">
            <Link to={`/games`} className="gameTitle" key="mobileGame">
              Games
            </Link>
            <Box key="mobileGames" className="mobileGames">
              {gamesDropdown.map((game) => (
                <Link
                  to={`/games/${game}`}
                  key={`mobile${game}`}
                  className="game"
                >
                  {game}
                </Link>
              ))}
            </Box>
          </Box>
          <Link to={`/leaderboard`} className="mobileLeaderBoard">
            Leaderboard
          </Link>
          <Box className="mobileUser">
            <Link to={`/login`} className="mobileLogin">
              Login
            </Link>
            <Link to={`/profile/${username}`} className="mobileProfile">
              {username}
            </Link>
          </Box>
        </Box>
      </Box>
      <Box className="headeritem logo">
        <Link style={{ textDecoration: "none" }} to={`/`}>
          LOGO
        </Link>
      </Box>

      <Button
        key="hamburger"
        className="nav-btn nav-close-btn"
        onClick={showNavbar}
      >
        <Box className="bar bar1"></Box>
        <Box className="bar bar2"></Box>
        <Box className="bar bar3"></Box>
      </Button>
    </AppBar>
  );
}
export default ResponsiveAppBar;
