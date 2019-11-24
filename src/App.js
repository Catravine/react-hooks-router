import React, { useState } from 'react';
import { BrowserRouter, Route, Link, NavLink, Redirect } from 'react-router-dom';
import AboutPage from './pages/AboutPage'
import './App.css';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  function onClickHandle() {
    setLoggedIn(!loggedIn);
  }

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <ul>
            <li>
              <NavLink
                className="App-link"
                exact
                to="/"
                activeClassName="Link-active-style">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className="App-link"
                exact
                to="/about"
                activeClassName="Link-active-style">
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                className="App-link"
                exact
                to="/user/john/doe"
                activeClassName="Link-active-style">
                User John Doe
              </NavLink>
            </li>
          </ul>
          {loggedIn.toString()}
          <button onClick={onClickHandle}>
            {loggedIn ? "logout" : "login"}
          </button>
          <Route
            path="/"
            exact
            render={() => {return <h1>Welcome Home</h1>}}
          />
          <Route
            path="/about"
            exact
            component={AboutPage}
          />
          <Route
            path="/user/:firstname/:lastname"
            exact
            render={({match}) => {
              return loggedIn ? (
                <h1>Welcome {match.params.firstname} {match.params.lastname}</h1>
              ) : (
                <Redirect to="/" />
              );
            }}
          />
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
