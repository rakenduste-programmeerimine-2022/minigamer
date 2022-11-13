import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

const gamesDropdown = ["Minesweeper", "Sudoku", "Nonogramm"];
let username = "Username";

function ResponsiveAppBar() {
  return (
    <AppBar
      className="header"
      position="static"
      style={{ backgroundColor: "green" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 0 }}>
            <Link style={{ textDecoration: "none" }} to={`/`}>
              <IconButton sx={{ p: 2 }}>
                <Typography>LOGO</Typography>
              </IconButton>
            </Link>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "flex-start",
              marginLeft: 2,
            }}
          >
            <Box className="dropdown">
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={`/games`}
              >
                <Button
                  id="games"
                  key="Games"
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Games
                </Button>
              </Link>
            </Box>

            <Menu sx={{ mt: "45px" }} id="games-menu">
              {gamesDropdown.map((game) => (
                <MenuItem key={game}>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/games/${game}`}
                  >
                    {game}
                  </Link>
                </MenuItem>
              ))}
            </Menu>

            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={`/leaderboard`}
            >
              <Button //LEADERBOARD
                key="Leaderboard"
                sx={{ my: 2, color: "white", display: "block", marginLeft: 2 }}
              >
                Leaderboard
              </Button>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open user">
              <IconButton sx={{ p: 0 }}>
                <Typography
                  style={{ color: "white", textTransform: "uppercase" }}
                >
                  {username}
                </Typography>
              </IconButton>
            </Tooltip>
            <Menu sx={{ mt: "45px" }} id="menu-appbar">
              <MenuItem key="Profile">
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/profile/${username}`}
                >
                  Profile
                </Link>
              </MenuItem>
              <MenuItem key="login">
                <Link style={{ textDecoration: "none" }} to={`/login`}>
                  login
                </Link>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
