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
  //const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElGame, setAnchorElGame] = React.useState(null);
  const open = Boolean(anchorElGame);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenGamesMenu = (event) => {
    setAnchorElGame(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElGame(null);
    console.log("siin");
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "green" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton sx={{ p: 2 }}>
              <Link style={{ textDecoration: "none" }} to={`/`}>
                <Typography>LOGO</Typography>
              </Link>
            </IconButton>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "flex-start",
              marginLeft: 2,
            }}
          >
            <Button
              id="games"
              key="Games"
              onMouseOver={handleOpenGamesMenu}
              //onClick={handleOpenGamesMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={`/games`}
              >
                Games
              </Link>
            </Button>

            <Menu
              sx={{ mt: "45px" }}
              id="games-menu"
              anchorEl={anchorElGame}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={open}
              onClose={handleCloseNavMenu}
              //onMouseLeave={handleCloseNavMenu}
            >
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

            <Button //LEADERBOARD
              key="Leaderboard"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block", marginLeft: 2 }}
            >
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={`/leaderboard`}
              >
                Leaderboard
              </Link>
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open user">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Typography
                  style={{ color: "white", textTransform: "uppercase" }}
                >
                  {username}
                </Typography>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key="Profile" onClick={handleCloseUserMenu}>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/profile/${username}`}
                >
                  Profile
                </Link>
              </MenuItem>
              <MenuItem key="login" onClick={handleCloseUserMenu}>
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
