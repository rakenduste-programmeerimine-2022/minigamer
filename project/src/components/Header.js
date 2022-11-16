import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import "../Styles/Header.scss";

const gamesDropdown = ["Minesweeper", "Sudoku", "Nonogramm"];
let username = "Username";

function ResponsiveAppBar() {
  return (
    <AppBar className="header" position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
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
            <Box className="dropdown headerItem">
              <Link
                className="dropbtn"
                style={{ textDecoration: "none", color: "white" }}
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

          <Box sx={{ flexGrow: 0 }} className="dropdown">
            <Typography
              className="dropbtn"
              style={{ color: "white", textTransform: "uppercase" }}
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
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
