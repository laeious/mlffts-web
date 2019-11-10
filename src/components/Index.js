import React from 'react';
import { Switch, Route, Link, BrowserRouter as Router, } from 'react-router-dom'

function App() {
    return (
        <Router>
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-half has-text-centered">
                        <div className="container">
                            <h1 className="title logo">MLFFTS</h1>
                        </div>
                        <div className="columns is-centered">
                            <div className="column is-7 has-text-centered">
                                <div class="field">
                                    <p class="control">
                                        <input class="input" type="email" placeholder="Username / Email" />
                                    </p>
                                </div>
                                <div class="field">
                                    <p class="control">
                                        <input class="input" type="password" placeholder="Password" />
                                    </p>
                                </div>
                                <button className="button is-primary is-fullwidth">Login</button>
                                <div className="columns is-marginless">
                                    <div className="column is-paddingless">

                                    <div className="is-pulled-right ">

                                        <button class="button is-text has-text-grey-dark link-btn">Sign Up</button>
                                        <button class="button is-text has-text-grey-dark link-btn">Forget Password</button>
                                    </div>

                                    </div>
                                </div>

                                <div className="btw">
                                    <span className="has-text-grey-light">OR</span>
                                </div>


                                <a className="button line-btn is-fullwidth"
                                    href="https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1653371073&redirect_uri=https%3A%2F%2Fmlffts-web.herokuapp.com%2F&state=12345abcde&scope=openid%20profile"
                                    >
                                    Log in with LINE
                                    </a>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Router>


    );
}

export default App;
