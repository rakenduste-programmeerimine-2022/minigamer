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

function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/Minesweeper" element={<Minesweeper />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </header>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
