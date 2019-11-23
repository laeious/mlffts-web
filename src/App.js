import React from 'react';
import './bulma.css';
import './App.css';
import Form from './components/Form';
import Index from './components/Index';
import { Switch, Route, Link, BrowserRouter as Router, } from 'react-router-dom'

class App extends React.Component {

  render() {

    return (
      <Router>
        <Switch>
            <Route path="/register">
              <Form />
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
