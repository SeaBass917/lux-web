import logo from "./logo.svg";
import "./ReactDemo.css";

function ReactDemo() {
  return (
    <div className="ReactDemo">
      <header className="ReactDemo-header">
        <img src={logo} className="ReactDemo-logo" alt="logo" />
        <p>
          Edit <code>src/ReactDemo.js</code> and save to reload helo.
        </p>
        <a
          className="ReactDemo-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default ReactDemo;
