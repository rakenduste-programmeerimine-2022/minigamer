import "./Styles/App.scss";
import "./Styles/Variables.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Leaderboard from "./pages/Leaderboard";
import Games from "./pages/Games";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Minesweeper from "./pages/Minesweeper";
import Sudoku from "./pages/Sudoku";
import Nonogram from "./pages/Nonogram";
import React, { useState } from "react";
import Register from "./pages/Register";
import Game from "./pages/Game";

function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/:id" element={<Game />} />
          <Route path="/games/:id" element={<Game />} />
          <Route path="/games/:id" element={<Game />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/game" element={<Game />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
