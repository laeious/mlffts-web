import React from 'react';
import './bulma.css';
import './App.css';
import Register from './components/Register';
import Index from './components/Index';
import Home from './components/Home';
import { Switch, Route, Link, BrowserRouter as Router, } from 'react-router-dom'

class App extends React.Component {

  render() {

    return (
      <Router>
        <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/">
              <Index />
            </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
