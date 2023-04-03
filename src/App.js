import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
      <span className="floatLeft">
        <h1>Y/N.io</h1>
      </span>
      <span id="logoDiv">
        <img
          src="https://play-lh.googleusercontent.com/HnrIhQ3OLrboERhy6D-olqjQpZQLJYyW9Qz4MXvFcr87qGh91r5gJas2OuoYGJjmA26L=w240-h480-rw"
          width="75"
          alt="Yes or No logo"
        />
      </span>
      </header>

      <footer>
      <h5>Created by Jacob Trader</h5>
      <h5><a href="https://github.com/Jtrom314/startup#startup">Github</a></h5>
      </footer>
    </div>
  );
}

export default App;
