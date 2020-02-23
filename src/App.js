import React from 'react';
import './bulma.css';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/Navbar';
import Line from './components/Line';

class DebugRouter extends Router {
  constructor(props){
    super(props);
    console.log('initial history is: ', JSON.stringify(this.history, null,2))
    this.history.listen((location, action)=>{
      console.log(
        `The current URL is ${location.pathname}${location.search}${location.hash}`
      )
      console.log(`The last navigation action was ${action}`, JSON.stringify(this.history, null,2));
    });
  }
}

class App extends React.Component {

  render() {

    return (
      <div>

        <DebugRouter>
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/line" component={Line} />
            <Route exact path="/" component={Home} />
            <Route path="/" component={Login} />
          </Switch>
        </DebugRouter>
      </div>
    );
  }
}

export default App;
