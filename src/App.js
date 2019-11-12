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
          <div className="container">
            <Route path="/register">
              <Form />
            </Route>
            <Route path="/">
              <Index />
            </Route>
          </div>
        </Switch>
      </Router>
    );
  }
}

export default App;
