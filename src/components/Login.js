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
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import grey from '@material-ui/core/colors/grey';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';




class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isError: '',
            isLoading: false,
            usernameError: true,
            passwordError: true,
            isModal: false,
            forgetEmail: '',
            showPassword: false
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

    toggleModal = () => { this.setState({ isModal: !this.state.isModal }) }

    toggglePassword = () => { this.setState({ showPassword: !this.state.showPassword }) }

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
                            errorMessage = <Lang lang={this.props.lang} en='Please verify your Email' th="กรุณายืนยัน Email ของคุณ" />
                        }
                    }
                    this.setState({ isLoading: false, isError: errorMessage })
                })
        }
    }



    render() {

        let theme = createMuiTheme({
            palette: {
                primary: {
                    main: '#363636',
                },
            },
            typography: {
                fontFamily: [
                    'Sarabun',
                    'Roboto',
                    'sans-serif'
                ].join(','),
            },
            overrides: {
                MuiInputLabel: {
                    outlined: {
                        '&$shrink': {
                          transform: this.props.lang === 'th' ? 'translate(17px, -6px) scale(0.75)':'translate(14px, -6px) scale(0.75)'
                        },
                }
            }
            }
        });

        
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
                    {this.state.isModal ?
                        <div className="modal is-active">
                            <div className="modal-background" onClick={this.toggleModal}></div>
                            <div className="modal-card">
                                <header className="modal-card-head red-color">
                                    <p className="modal-card-title Sarabun" style={{ color: '#FFF' }}><Lang lang={this.props.lang} en="Forget Password" th="ลืมรหัสผ่าน" /></p>
                                    <button className="delete" aria-label="close" onClick={this.toggleModal}></button>
                                </header>
                                <section className="modal-card-body has-text-centered" style={{ borderBottomRightRadius: '6px', borderBottomLeftRadius: '6px' }}>
                                    <div className="columns">
                                        <div className="column is-10">

                                            <div className="field is-horizontal">
                                                <div className="field-label is-normal">
                                                    <label className=" "><Lang lang={this.props.lang} en="Email" th="อีเมล" /></label>
                                                </div>
                                                <div className="field-body">
                                                    <div className="field">
                                                        <div className="control">
                                                            <input className="input" type="text" placeholder=""
                                                                name="forgetEmail"
                                                                placeholder=""
                                                                onChange={this.handleChange}
                                                                value={this.state.forgetEmail} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                    <div className="field is-grouped is-grouped-right">
                                        <p className="control">
                                            <button className="button forget-red-btn red-color">
                                                <Lang lang={this.props.lang} en="Send" th="ส่ง" />
                                            </button>
                                        </p>
                                        <p className="control">
                                            <button className="button" onClick={this.toggleModal}>
                                                <Lang lang={this.props.lang} en="Cancel" th="ยกเลิก" />
                                            </button>
                                        </p>
                                    </div>
                                </section>
                            </div>
                        </div>
                        :
                        null
                    }
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
                                            {/* <div className="field">
                                                <p className="control">
                                                    <input className="input" type="username" name="username"
                                                        placeholder={this.props.lang === 'en' ? 'Username' : 'ชื่อผู้ใช้'}
                                                        value={this.state.username}
                                                        onChange={this.handleChange}
                                                    />
                                                </p>
                                            </div> */}
                                            <ThemeProvider theme={theme}>

                                                <div className="space">
                                                    <FormControl fullWidth variant="outlined" size="small">
                                                        <InputLabel>{this.props.lang === 'en' ? 'Username' : 'ชื่อผู้ใช้'}</InputLabel>
                                                        <OutlinedInput
                                                            type='text'
                                                            value={this.state.username}
                                                            onChange={this.handleChange}
                                                            name="username"
                                                            labelWidth={this.props.lang === 'en' ? 70: 56}
                                                        />
                                                    </FormControl>
                                                </div>

                                                <div className="space">
                                                    <FormControl fullWidth variant="outlined" size="small" color="primary">
                                                        <InputLabel>{this.props.lang === 'en' ? 'Password' : 'รหัสผ่าน'}</InputLabel>
                                                        <OutlinedInput
                                                            type={this.state.showPassword ? 'text' : 'password'}
                                                            value={this.state.password}
                                                            onChange={this.handleChange}
                                                            onKeyPress={this.handleKeyPress}
                                                            name="password"
                                                            endAdornment={
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        aria-label="toggle password visibility"
                                                                        onClick={this.toggglePassword}
                                                                        edge="end"
                                                                    >
                                                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            }
                                                            labelWidth={this.props.lang === 'en' ? 64: 64}
                                                        />
                                                    </FormControl>
                                                </div>

                                            </ThemeProvider>

                                            {/* <div className="field">
                                                <p className="control">
                                                    <input className="input" type="password" name="password"
                                                        placeholder={this.props.lang === 'en' ? 'Password' : 'รหัสผ่าน'}
                                                        value={this.state.password}
                                                        onChange={this.handleChange}
                                                        onKeyPress={this.handleKeyPress}
                                                    />
                                                </p>
                                            </div> */}

                                            <button
                                                className={this.state.isLoading ? "button is-dark is-fullwidth is-loading" : "button is-dark is-fullwidth"}
                                                onClick={this.submit}
                                                style={{ marginTop: '1rem' }}
                                            >
                                                <Lang lang={this.props.lang} en="Log In" th="เข้าสู่ระบบ" />
                                            </button>
                                            <div className="columns is-marginless">
                                                <div className="column is-paddingless">

                                                    <div className="move-right">
                                                        <Link to="/register"><button className="button is-text has-text-grey-dark link-btn"><Lang lang={this.props.lang} en="Register" th="สมัครสมาชิก" /></button></Link>
                                                        <button className="button is-text has-text-grey-dark link-btn" onClick={this.toggleModal}><Lang lang={this.props.lang} en="Forget Password" th="ลืมรหัสผ่าน" /></button>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="btw">
                                                <span className="has-text-grey-light"><Lang lang={this.props.lang} en="Or" th="หรือ" /></span>
                                            </div>

                                            {/* mlffts */}
                                            <a href="https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1653371073&redirect_uri=https://mlffts-web.herokuapp.com/line&state=12345abcde&scope=openid%20profile%20email&nonce=09876xyz">
                                            {/* localhost */}
                                            {/* <a href="https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1653371073&redirect_uri=http://localhost:8080/line&state=12345abcde&scope=openid%20profile%20email&nonce=09876xyz"> */}
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
            </div >
        );
    }
}

export default Login;
