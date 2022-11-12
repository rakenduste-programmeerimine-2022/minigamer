import "./App.css";
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

function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/Minesweeper" element={<Minesweeper />} />
          <Route path="/games/Sudoku" element={<Sudoku />} />
          <Route path="/games/Nonogramm" element={<Nonogram />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
