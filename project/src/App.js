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
import React, { createContext, useState } from "react";
import Register from "./pages/Register";
import GamePage from "./pages/GamePage";
import Nonogram from "./pages/Nonogram";
//import Minesweeper from "./pages/Minesweeper";

export const UserContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(window.sessionStorage.getItem("user"))
  );

  return (
    <Router>
      <UserContext.Provider value={[currentUser, setCurrentUser]}>
        <Header />
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/games" element={<Games />} />
            {/* <Route path="/games/:id" element={<GamePage />} />
            <Route path="/games/:id" element={<GamePage />} />
            <Route path="/games/:id" element={<GamePage />} /> */}
            <Route path="/games/nonogram" element={<Nonogram />}></Route>
            <Route path="/games/:id" element={<GamePage />}></Route>
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
        <Footer />
      </UserContext.Provider>
    </Router>
  );
}

export default App;
