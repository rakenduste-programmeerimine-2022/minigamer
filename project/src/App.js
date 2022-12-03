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
import Flood from "./pages/Flood";
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
                    <Route
                        path="/games/Minesweeper"
                        element={<Minesweeper />}
                    />
                    <Route path="/games/Flood" element={<Flood />} />
                    <Route path="/games/Nonogram" element={<Nonogram />} />
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
