import React, { useState } from 'react';
import { BrowserRouter, Route, Link, NavLink, Redirect, Prompt } from 'react-router-dom';
import AboutPage from './pages/AboutPage'
import './App.css';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [age, setAge] = useState(null);

  function onClickHandle() {
    setLoggedIn(!loggedIn);
  }

  function onChangeHandle(e) {
    setAge(e.target.value);
  }

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <ul className="ul-style">
            <li className="li-style">
              <NavLink
                className="App-link"
                exact
                to="/"
                activeClassName="Link-active-style">
                Home
              </NavLink>
            </li>
            <li className="li-style">
              <NavLink
                className="App-link"
                exact
                to="/about"
                activeClassName="Link-active-style">
                About
              </NavLink>
            </li>
            <li className="li-style">
              <NavLink
                className="App-link"
                exact
                to="/user/john/doe"
                activeClassName="Link-active-style">
                User John Doe
              </NavLink>
            </li>
          </ul>
          <Prompt when={loggedIn && !age} message={(location) => {
            return location.pathname.startsWith('/user') ? true : "are you sure?"
          }}></Prompt>
          {loggedIn.toString()}
          <button className="button" onClick={onClickHandle}>
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
                <h1>
                  <h2>Age: {age}</h2>
                  <input type="text" value={age} onChange={onChangeHandle} />
                  Welcome {match.params.firstname} {match.params.lastname}
                </h1>
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
