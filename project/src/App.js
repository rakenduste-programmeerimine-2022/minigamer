import logo from "./logo.svg";
import "./App.css";
import SetupExample from "./components/SetupExample";
import Demo from "./components/Demo";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>AAAAA</p>
        <img src={logo} className="App-logo" alt="logo" />
        <SetupExample />
        <Demo />
      </header>
    </div>
  );
}

export default App;
