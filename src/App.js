import logo from './logo.svg';
import React from 'react';

import { Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Vote } from './vote/vote';

import { AuthState } from './login/authState'; // ADD THIS TO NOTES
import './App.css';

function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const [authState, setAuthstate] = React.useState(AuthState.Unknown);
  React.useEffect(() => {
    if (userName) {
      fetch(`/api/user/${userName}`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((user) => {
        const state = user?.authenticated ? AuthState.Authenticated : AuthState.Unauthenticated;
        setAuthstate(state);

      });
      
    } else {
      setAuthstate(AuthState.Unauthenticated);
    }
  }, [userName]);

  return (
    <div className="App">
      <header>
      <span className="floatLeft">
        <h1>Y/N.io</h1>
      </span>
      <span id="logoDiv">
        <img
          src="logo.png"
          width="75"
          alt="Yes or No logo"
        />
      </span>
      </header>
      <main>
      <Routes>
        <Route
          path='/'
          element = {
            <Login
              userName={userName}
              authState={authState}
              onAuthChange={(userName, authState) => {
                setAuthstate(authState);
                setUserName(userName);
              }}
              />
          }
          exact
          />
        <Route path='/vote' element={<Vote userName={userName}/>} />
      </Routes>
      </main>
      <footer>
      <h5>Created by Jacob Trader</h5>
      <h5><a href="https://github.com/Jtrom314/startup#startup">Github</a></h5>
      </footer>
      </div>
  );
}

export default App;
