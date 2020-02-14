import React from 'react';
import './bulma.css';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import { Switch, Route, Link, BrowserRouter as Router, } from 'react-router-dom'
import Navbar from './components/Navbar';


class App extends React.Component {

  render() {

    return (
      <div>

        <Router>
          <Switch>
            <Route path="/register">
              <Navbar />
              <Register />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
