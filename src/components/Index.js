import React from 'react';
import { Switch, Route, Link, BrowserRouter as Router, Redirect } from 'react-router-dom'
import axios from 'axios';
import qs from 'qs';
import jwt from 'jwt-decode';
import Navbar from './Navbar';
import Home from './Home';
import RegisModal from './RegisModal';

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
            username: '',
            password: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    // checkLogin() {
    //     const path = window.location.href;
    //     const start_index = path.indexOf("?code=");
    //     const end_index = path.indexOf('&');
    //     if (start_index !== -1 && this.state.firstTime) {
    //         const code = path.slice(start_index + 6, end_index)
    //         console.log('code : ' + code);

    //         const reqBody = {
    //             grant_type: 'authorization_code',
    //             code: code,
    //             redirect_uri: 'https://mlffts-web.herokuapp.com/',
    //             client_id: '1653327020',
    //             client_secret: '94d3f73ce54cb17235785bf81bdd802c'
    //         }

    //         const config = {
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded'
    //             }
    //         }

    //         axios.post('https://api.line.me/oauth2/v2.1/token', qs.stringify(reqBody), config).then(res => {
    //             console.log(res)

    //             const data = jwt(res.data.id_token);
    //             console.log(data)
    //             this.setState({ isChecked: true, user: data, firstTime: false })
    //         }).catch(err => {
    //             console.log('error ja')
    //             console.log(err)
    //         })
    //     } else {
    //         console.log('..')
    //     }
    // }


    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    submit(e) {
        e.preventDefault();
        console.log(this.state.username);
        console.log(this.state.password);
        if (this.state.username !== '' && this.state.password !== '') {
            const reqBody = {
                username: this.state.username,
                password: this.state.password
            }

            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }


            axios.post('https://mlffts-api.herokuapp.com/login', qs.stringify(reqBody), config).then(
                res => {
                    console.log(res);
                    // localStorage.setItem('mlffts-jwt', res.data)

                }).catch(err => {
                    console.log('error ja')
                    console.log(err)
                })
        }
    }


    render() {
        console.log(window.location.href)

        // if (this.state.isChecked && this.state.user) {
        //     return (
        //         <div>
        //             <Navbar user={this.state.user} />
        //             <Home />
        //         </div>
        //     );
        // }

        return (
            <div className="section" style={{ padding: "1rem 1.5rem" }}>
                <div className="hero-body-l">

                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-6 is-9-tablet is-6-widescreen has-text-centered">
                                <div className="container">
                                    <h1 className="title logo ">MLFFTS</h1>
                                </div>
                                <div className="columns is-centered">
                                    <div className="column is-7 has-text-centered">
                                        <div className="field">
                                            <p className="control">
                                                <input className="input" type="username" name="username"
                                                    placeholder="username"
                                                    value={this.state.username}
                                                    onChange={this.handleChange}
                                                />
                                            </p>
                                        </div>
                                        <div className="field">
                                            <p className="control">
                                                <input className="input" type="password" name="password"
                                                    placeholder="password"
                                                    value={this.state.password}
                                                    onChange={this.handleChange}
                                                />
                                            </p>
                                        </div>
                                        <Link to="/home"><button className="button is-primary is-fullwidth" onClick={this.submit}>เข้าสู่ระบบ</button></Link>
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


                                        <button className="button line-btn is-fullwidth"
                                            onClick={this.registerModal}
                                        >
                                            เข้าสู่ระบบผ่าน LINE
                                    </button>

                                    </div>
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
