import React from 'react';
import './bulma.css';
import './App.css';
import Form from './components/Form';
import Index from './components/Index';
import { Switch, Route, Link, BrowserRouter as Router, } from 'react-router-dom'

function App() {
  return (
    <Router>
      <section className="section">
          <Route path="/register">
            <Form />
          </Route>
          <Route path="/" exact>
           <Index />
          </Route>
      </section>
    </Router>


  );
}

export default App;
