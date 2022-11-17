import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import "../Styles/Header.scss";
import { useRef } from "react";
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
  return (
    <AppBar className="header" position="fixed">
      <Container maxWidth="lg">
        <Toolbar disableGutters className="headerItems">
          <Box className="logo" sx={{}}>
            <Link style={{ textDecoration: "none" }} to={`/`}>
              <Typography>LOGO</Typography>
            </Link>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Box
              className="dropdown headerItem"
              onMouseOver={setActiveDropdown}
              onMouseLeave={removeActiveDropdown}
            >
              <Link
                className="dropbtn"
                style={{ textDecoration: "none" }}
                to={`/games`}
              >
                <Typography
                  id="games"
                  key="Games"
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Games
                </Typography>
              </Link>
              <Box
                sx={{ mt: "45px" }}
                id="games-menu"
                className="dropdownContent"
              >
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
              className="headerItem"
              style={{ textDecoration: "none", color: "white" }}
              to={`/leaderboard`}
            >
              <Typography //LEADERBOARD
                key="Leaderboard"
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Leaderboard
              </Typography>
            </Link>
          </Box>

          <Box
            sx={{ flexGrow: 0 }}
            className="dropdown headerItem"
            onMouseOver={setActiveDropdown}
            onMouseLeave={removeActiveDropdown}
          >
            <Typography
              className="dropbtn"
              style={{ textTransform: "uppercase" }}
            >
              {username}
            </Typography>
            <Box className="dropdownContent">
              <Box key="Profile" className="menuItem">
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/profile/${username}`}
                >
                  Profile
                </Link>
              </Box>
              <Box key="login" className="menuItem">
                <Link style={{ textDecoration: "none" }} to={`/login`}>
                  login
                </Link>
              </Box>
            </Box>
          </Box>
        </Toolbar>
        <Box key="mobileNav" className="mobileNav">
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
          <Link to={`/leaderboard`} className="mobileLeaderBoard">
            Leaderboard
          </Link>
          <Box className="mobileProfile">
            <Link to={`/login`}>Login</Link>
            <Link to={`/profile/${username}`}>{username}</Link>
          </Box>
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
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
