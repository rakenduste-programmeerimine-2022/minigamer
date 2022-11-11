import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";

const pages = ["Games", "Leaderboard"];
const account = ["Profile", "Logout"];
const gamesDropdown = ["Minesweeper", "Sudoku", "Nonogramm"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElGame, setAnchorElGame] = React.useState(null);
  const open = Boolean(anchorElGame);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    console.log("jajaj");
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleclick = (event) => {
    setAnchorElGame(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElGame(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            sx={{
              height: 33,
              width: 50,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
            }}
            alt="logo"
            src="../../../controller-512.png"
            href="#"
          />
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              id="games"
              key="Games"
              onClick={handleclick}
              onMouseEnter={handleOpenNavMenu}
              onClose={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={`/games`}
              >
                Games
              </Link>
              <Menu
                sx={{ mt: "45px" }}
                id="games-dropdown"
                anchorEl={anchorElGame}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElGame)}
                onClose={handleCloseNavMenu}
              >
                {gamesDropdown.map((games) => (
                  <MenuItem
                    key={games}
                    onClick={handleCloseUserMenu}
                    onMouseEnter={handleCloseUserMenu}
                  >
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/games/${games}`}
                    >
                      {games}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Button>

            <Button
              key="Leaderboard"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
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
                <Typography>Profile</Typography>
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
              {account.map((account) => (
                <MenuItem key={account} onClick={handleCloseUserMenu}>
                  <Link style={{ textDecoration: "none" }} to={`/${account}`}>
                    {account}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
