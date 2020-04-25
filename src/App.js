import React from 'react';
import './bulma.css';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import { Switch, Route,  BrowserRouter as Router } from 'react-router-dom'
import Line from './components/Line';
import Notify from './components/Notify'
import Verify from './components/Verify'
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

  state = {
    lang: 'en'
  }

  handleToggleLang = () => {
    if (this.state.lang === 'en') {
      this.setState({ lang: 'th' })
    } else {
      this.setState({ lang: 'en' })
    }
  }
  

  render() {

    return (
        <Router>
          <Switch>
            <Route path="/verify" render={(props) => <Verify {...props} lang={this.state.lang} toggleLang={this.handleToggleLang} />} />
            {/* <Route path="/admin" component={Admin} /> */}
            <Route path="/noti" component={Notify} />
            <Route path="/register" render={(props) => <Register {...props} lang={this.state.lang} toggleLang={this.handleToggleLang} />} />
            {/* <Route path="/profile" component={Profile} /> */}
            <Route path="/line" component={Line} />
            <Route path="/login" render={(props) => <Login {...props} lang={this.state.lang} toggleLang={this.handleToggleLang} />} />
            <Route path="/" render={(props) => <Home {...props} lang={this.state.lang} toggleLang={this.handleToggleLang} />} />
          </Switch>
        </Router>
    );
  }
}

export default App;
