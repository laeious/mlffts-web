import React from 'react';
import { Switch, Route, Link, BrowserRouter as Router, } from 'react-router-dom'
import axios from 'axios';
import qs from 'qs';

class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isChecked: false,
            isUser: false,
            profilePic: null,
            userName: null,
        }
    }


    checkLogin() {
        const path = window.location.href;
        const start_index = path.indexOf("?code=");
        const end_index = path.indexOf('&');
        if (start_index !== -1) {
            const code = path.slice(start_index + 6, end_index)
            console.log('code : ' + code);
            console.log(typeof(code));

            const reqBody = {
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: 'https://mlffts-web.herokuapp.com/',
                client_id: '1653327020',
                client_secret: '94d3f73ce54cb17235785bf81bdd802c'
            }

            const config = {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              }
              
            axios.post('https://api.line.me/oauth2/v2.1/token', qs.stringify(reqBody), config).then( res => {
                console.log(res)
                this.setState({isChecked: true})
            }).catch(err =>{
                console.log(err)
            })
        }else{
            console.log('..')
        }


    }


    render() {
        console.log(window.location.href)
        this.checkLogin();
        if(this.state.isChecked){
            return (
                <p className="title">Loading</p>
            )
        }

        return (
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-7  is-10-tablet is-6-widescreen has-text-centered">
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
    }
}

export default Index;
