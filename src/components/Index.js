import React from 'react';
import { Switch, Route, Link, BrowserRouter as Router, } from 'react-router-dom'
import Home from './Home'
class Index extends React.Component {
    state = {
        isUser: false,
        profilePic: null,
        userName: null,
    }

    simuLogin(){

    }


    render() {
        console.log('geloo')
        console.log(window.location.href)
        if (!this.state.isUser) {
            return (
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-half has-text-centered">
                            <div className="container">
                                <h1 className="title logo">MLFFTS</h1>
                            </div>
                            <div className="columns is-centered">
                                <div className="column is-7 has-text-centered">
                                    <div className="field">
                                        <p className="control">
                                            <input className="input" type="email" placeholder="Username / Email" />
                                        </p>
                                    </div>
                                    <div className="field">
                                        <p className="control">
                                            <input className="input" type="password" placeholder="Password" />
                                        </p>
                                    </div>
                                    <button className="button is-primary is-fullwidth">Login</button>
                                    <div className="columns is-marginless">
                                        <div className="column is-paddingless">

                                            <div className="move-right">
                                                <button className="button is-text has-text-grey-dark link-btn">Sign Up</button>
                                                <button className="button is-text has-text-grey-dark link-btn">Forget Password</button>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="btw">
                                        <span className="has-text-grey-light">OR</span>
                                    </div>


                                    <a className="button line-btn is-fullwidth"
                                        href="https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1653327020&redirect_uri=https%3A%2F%2Fmlffts-web.herokuapp.com%2F&state=12345abcde&scope=openid%20email%20openid%20profile&nonce=09876xyz&fbclid=IwAR0VqDjgpsd4pcFGAqcD858ZiTyfE3hlgvptz3sMRaPDWVolguwpHpdgRCs"
                                    >
                                        Log in with LINE
                                    </a>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }else{
            return <Home />
        }
    }
}

export default Index;
