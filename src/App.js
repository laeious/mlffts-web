import React from 'react';
import './bulma.css';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/Navbar';
import Line from './components/Line';
import Admin from './components/Admin'
import Notify from './components/Notify'
import Profile from './components/Profile'
// class DebugRouter extends Router {
//   constructor(props){
//     super(props);
//     console.log('initial history is: ', JSON.stringify(this.history, null,2))
//     this.history.listen((location, action)=>{
//       console.log(
//         `The current URL is ${location.pathname}${location.search}${location.hash}`
//       )
//       console.log(`The last navigation action was ${action}`, JSON.stringify(this.history, null,2));
//     });
//   }
// }

class App extends React.Component {

  render() {

    return (
      <div>
        <Router>
          <Switch>
            <Route path="/admin" component={Admin} />
            <Route path="/noti" component={Notify} />
            <Route path="/register" component={Register} />
            {/* <Route path="/profile" component={Profile} /> */}
            <Route path="/line" component={Line} />
            <Route path="/login" component={Login} />
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
