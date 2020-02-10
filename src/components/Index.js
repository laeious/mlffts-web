import React from 'react';
import { Switch, Route, Link, BrowserRouter as Router, Redirect } from 'react-router-dom'
import axios from 'axios';
import qs from 'qs';
import jwt from 'jwt-decode';
import Navbar from './Navbar';
import Home from './Home';

class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isChecked: false,
            user: null,
            firstTime: true,
            // user: {
            //     name: 'L',
            //     picture: "https://profile.line-scdn.net/0hu3Y5-57bKhxkTAH5A2pVS1gJJHETYixUHH5hfhZMfH8bfD9LCi1jKkBEc3gee2lPUCtiLUZOcCpA"
            // },
            // isChecked: true,
            email: null,
            password: null
        }
    }


    checkLogin() {
        const path = window.location.href;
        const start_index = path.indexOf("?code=");
        const end_index = path.indexOf('&');
        if (start_index !== -1 && this.state.firstTime) {
            const code = path.slice(start_index + 6, end_index)
            console.log('code : ' + code);

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

            axios.post('https://api.line.me/oauth2/v2.1/token', qs.stringify(reqBody), config).then(res => {
                console.log(res)

                const data = jwt(res.data.id_token);
                console.log(data)
                this.setState({ isChecked: true, user: data, firstTime: false })
            }).catch(err => {
                console.log('error ja')
                console.log(err)
            })
        } else {
            console.log('..')
        }


    }

    submit(e) {
        e.preventDefault();
        axios.post('https://mlff-ts.herokuapp.com/login' , {
            email: this.state.email,
            password: this.state.password
        }).then(res => localStorage.setItem('mlffts-jwt', res.date));
    }


    render() {
        console.log(window.location.href)
        this.checkLogin();
        // if(!this.state.firstTime){
        //     console.log('in first time :',this.state.firstTime)
        //     return <Redirect to='/'/>;
        // }

        if (this.state.isChecked && this.state.user) {
            return (
                <div>
                    <Navbar user={this.state.user}/>
                    <Home />
                </div>
            );
        }

        return (
            <div className="hero-body-l">

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
                                            <input className="input" type="email" placeholder="อีเมลล์" />
                                        </p>
                                    </div>
                                    <div className="field">
                                        <p className="control">
                                            <input className="input" type="password" placeholder="รหัสผ่าน" />
                                        </p>
                                    </div>
                                    <Link to="/home"><button className="button is-primary is-fullwidth">เข้าสู่ระบบ</button></Link>
                                    <div className="columns is-marginless">
                                        <div className="column is-paddingless">

                                            <div className="move-right">
                                                <Link to="/register"><button className="button is-text has-text-grey-dark link-btn">สมัครสมาชิก</button></Link>
                                                <button className="button is-text has-text-grey-dark link-btn">ลืมรหัสผ่าน</button>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="btw">
                                        <span className="has-text-grey-light">หรือ</span>
                                    </div>


                                    <a className="button line-btn is-fullwidth"
                                        href="https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1653327020&redirect_uri=https%3A%2F%2Fmlffts-web.herokuapp.com%2F&state=12345abcde&scope=openid%20email%20openid%20profile&nonce=09876xyz&fbclid=IwAR0VqDjgpsd4pcFGAqcD858ZiTyfE3hlgvptz3sMRaPDWVolguwpHpdgRCs"
                                    >
                                        เข้าสู่ระบบผ่าน LINE
                                    </a>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;
