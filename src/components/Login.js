import React from 'react';
import { Switch, Route, Link, BrowserRouter as Router, withRouter } from 'react-router-dom'
import axios from 'axios';
import qs from 'qs';
import jwt from 'jwt-decode';
import Navbar from './Navbar';
import Home from './Home';
import Spinner from 'react-spinkit';
import getToken from '../helpers/getToken';
import Lang from '../helpers/Lang';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isError: '',
            isLoading: false,
            usernameError: true,
            passwordError: true
        }


        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        const token = getToken();
        console.log(token);
        if (token) {
            this.props.history.push('/');
        }
    }

    handleKeyPress(e) {
        if (e.key === "Enter") {
            this.submit()
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    scrollToTop = () => this.scrollingWrapper.scrollTop = 0

    submit() {
        let errorMessage = '';

        if (this.state.username === '' || this.state.password === '') {
            errorMessage = <Lang lang={this.props.lang} en="Incorrect username or password." th="ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" />
            this.setState({ isError: errorMessage });
        } else if (this.state.username !== '' && this.state.password !== '') {
            this.setState({ isLoading: true });
            const reqBody = {
                username: this.state.username,
                password: this.state.password
            }

            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
            localStorage.removeItem('mlffts-jwt');

            console.log(reqBody);
            // this.setState({isLoading:false});
            axios.post('https://mlffts-api.herokuapp.com/login', qs.stringify(reqBody), config).then(
                res => {
                    // console.log('res')
                    // console.log(res);
                    // console.log(res.data.token);
                    localStorage.setItem('mlffts-jwt', res.data.token);
                    this.setState({ isLoading: false })
                    this.props.history.push('/');

                }).catch(err => {
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(typeof (err.response.data));

                        console.log(err.response.status);
                        // console.log(err.response.headers);

                        errorMessage = <Lang lang={this.props.lang} en="Incorrect username or password." th="ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" />
                        if (err.response.status === 403) {
                            // not verify email
                            errorMessage = <Lang lang={this.props.lang} en='Please verify Email' th="กรุณายืนยัน Email" />
                        }
                    }
                    this.setState({ isLoading: false,isError: errorMessage })
                })
        }
    }



    render() {
        return (
            <div className="navbar-space">
                <div className="lang-box long-box-login">
                    <span id="th-button" className={this.props.lang === 'th' ? 'lang-active' : ''}
                        onClick={this.props.toggleLang}
                    >TH</span>
                    /
                    <span id="en-button" className={this.props.lang === 'en' ? 'lang-active' : ''}
                        onClick={this.props.toggleLang}
                    >EN</span>
                </div>
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
                                            <span className='error-big'>{this.state.isError}</span>
                                            <div className="field">
                                                <p className="control">
                                                    <input className="input" type="username" name="username"
                                                        placeholder={this.props.lang === 'en' ? 'Username' : 'ชื่อผู้ใช้'}
                                                        value={this.state.username}
                                                        onChange={this.handleChange}
                                                    />
                                                </p>
                                            </div>
                                            <div className="field">
                                                <p className="control">
                                                    <input className="input" type="password" name="password"
                                                        placeholder={this.props.lang === 'en' ? 'Password' : 'รหัสผ่าน'}
                                                        value={this.state.password}
                                                        onChange={this.handleChange}
                                                        onKeyPress={this.handleKeyPress}
                                                    />
                                                </p>
                                            </div>

                                            <button className={this.state.isLoading ? "button is-dark is-fullwidth is-loading" : "button is-dark is-fullwidth"} onClick={this.submit}><Lang lang={this.props.lang} en="Log In" th="เข้าสู่ระบบ" /></button>
                                            <div className="columns is-marginless">
                                                <div className="column is-paddingless">

                                                    <div className="move-right">
                                                        <Link to="/register"><button className="button is-text has-text-grey-dark link-btn"><Lang lang={this.props.lang} en="Register" th="สมัครสมาชิก" /></button></Link>
                                                        <button className="button is-text has-text-grey-dark link-btn"><Lang lang={this.props.lang} en="Forget Password" th="ลืมรหัสผ่าน" /></button>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="btw">
                                                <span className="has-text-grey-light"><Lang lang={this.props.lang} en="Or" th="หรือ" /></span>
                                            </div>

                                            {/* mlffts */}
                                            {/* <a href="https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1653371073&redirect_uri=https://mlffts-web.herokuapp.com/line&state=12345abcde&scope=openid%20profile%20email&nonce=09876xyz"> */}
                                            {/* localhost */}
                                            <a href="https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1653371073&redirect_uri=http://localhost:8080/line&state=12345abcde&scope=openid%20profile%20email&nonce=09876xyz">
                                                <button className="button line-btn is-fullwidth">
                                                    <Lang lang={this.props.lang} en="Log In with LINE" th="เข้าสู่ระบบผ่าน LINE" />
                                                </button>
                                            </a>

                                        </div>
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

export default Login;
