//import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import "../Styles/Header.scss";
import { Button } from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

const gamesDropdown = ["Minesweeper", "Flood", "Nonogram"];
// let username = "Username";

function ResponsiveAppBar() {
    const navigate = useNavigate();
    const user = useContext(UserContext);
    //console.log(user);
    let username = null;

    if (user[0]) {
        username = user[0].username;
    }

    const logout = () => {
        sessionStorage.removeItem("user");
        username = null;
        console.log("logout");
        navigate("/login");
    };

    const showNavbar = () => {
        const mobileNav = document.querySelector(".mobileNav");
        mobileNav.classList.toggle("responsive_nav");

        const burger = document.querySelector(".nav-btn");
        burger.classList.toggle("active");
    };

    function setActiveDropdown(e) {
        let target = e.target;
        target.classList.add("active");
    }
    function removeActiveDropdown(e) {
        let target = document.querySelector(".headerItem");
        target.classList.remove("active");
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
                className="headerItem dropdown"
                style={{ textDecoration: "none" }}
                to={`/leaderboard`}
                key="Leaderboard"
            >
                Leaderboard
            </Link>
            {username ? (
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
                        <Box
                            key="logout"
                            className="menuItem"
                            style={{
                                textDecoration: "none",
                                cursor: "pointer",
                            }}
                            onClick={() => logout()}
                        >
                            log out
                        </Box>
                    </Box>
                </Box>
            ) : (
                <Link
                    className="headerItem dropdown headerRight"
                    key="notLoggedIn"
                    to={"/login"}
                >
                    Login
                </Link>
            )}

            {/*  ------ MOBILE ------ */}
            <Box key="mobileNav" className="mobileNav" onClick={showNavbar}>
                <Box className="mobileNavWrap">
                    <Box className="mobilegames">
                        <Link
                            to={`/games`}
                            className="gameTitle"
                            key="mobileGame"
                        >
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
                        {username && (
                            <Link
                                to={`/profile/${username}`}
                                className="mobileProfile"
                            >
                                {username}
                            </Link>
                        )}
                        {username ? (
                            <Box className="mobileLogin">Log out</Box>
                        ) : (
                            <Link to={`/login`} className="mobileLogin">
                                Login
                            </Link>
                        )}
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
