import React from 'react';
import './bulma.css';
import Form from './components/Form'
import { Switch, Route, Link, BrowserRouter as Router, } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="section">
        <div className="columns is-centered">
          <div className="column is-half is-centered">
            <div className="container">
              <Route path="/register">
                <Form />
              </Route>
              <Route path="/" exact>
                <Link to="/register" ><button className="button is-primary" style={{margin:" 0 auto"}}>Register</button></Link>
              </Route>
            </div>
          </div>
        </div>
      </div>
    </Router>


  );
}

export default App;
