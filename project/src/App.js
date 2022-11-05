import logo from "./logo.svg";
import "./App.css";
import SetupExample from "./components/SetupExample";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <SetupExample />
            </header>
        </div>
    );
}

export default App;
