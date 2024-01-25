import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import ImageUpload from "./components/ImageUpload";

function App() {
  console.log(
    "process.env.REACT_APP_BACK_URL: ",
    process.env.REACT_APP_BACK_URL
  );
  return (
    <div className="container">
      {/*       <h3>
        <a href="http://bezkoder.com" target="_blank" rel="noreferrer">
          bezkoder.com
        </a>
      </h3> */}
      <a
        href="https://www.bezkoder.com/react-image-upload-preview-hooks/"
        target="blank"
      >
        <h4>React.js Image Upload with Preview</h4>
      </a>
      <div className="content">
        <ImageUpload />
      </div>
    </div>
  );
}

export default App;

/*
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
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

export default App;
*/
