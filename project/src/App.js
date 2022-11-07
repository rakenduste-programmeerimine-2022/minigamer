import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Leaderboard from "./pages/Leaderboard";
import Games from "./pages/Games";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Header from "./components/Header";

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
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </header>
      </div>
      <div>footer</div>
    </Router>
  );
}

export default App;
