import React from 'react';
import getToken from '../helpers/getToken';
import axios from 'axios';
import qs from 'qs'
import { withRouter, Link } from 'react-router-dom';
import Spinner from 'react-spinkit';

class Notify extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
        }
    }

    componentDidMount() {
        // if (!token) {
        //     this.props.history.push('/login');
        // } else {
        //     axios.get('https://mlffts-api.herokuapp.com/profile', {
        //         headers: { Authorization: `Bearer ${token}` }
        //     }).then(res => this.setState({ user: res.data, isError: false })
        //     ).catch(err => {
        //         alert(err);
        //         console.log(err);
        //         localStorage.removeItem('mlffts-jwt');
        //         this.setState({ user: undefined, isError: true })
        //     })
        // }
        this.checkLogin();
    }


    checkLogin() {

        const token = getToken();
        console.log(token);

        const path = window.location.href;
        console.log(path)
        const start_index = path.indexOf("?code=");
        const end_index = path.indexOf('&');
        if (start_index !== -1) {
            const code = path.slice(start_index + 6, end_index)
            console.log('code : ' + code);

            const reqBody = {
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: 'https://mlffts-web.herokuapp.com/noti',
                client_id: '1653327020',
                client_secret: '94d3f73ce54cb17235785bf81bdd802c'
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
            // axios.post('https://notify-bot.line.me/oauth/token', qs.stringify(reqBody), config).then(res => {
            //     console.log('res');
            //     console.log(res);
            //     this.props.history.push('/profile');
            // }).catch(err => {
            //     console.log('error ja');
            //     console.log(err);
            //     if (err.response) {
            //         console.log(err.response.data);
            //         console.log(err.response.status);
            //         console.log(err.response.headers);

            //         // this.setState({ isLoading: false, isError: err.response.data })
            //     }
            // })

            axios.post('https://mlffts-api.herokuapp.com/cb-notify', qs.stringify(reqBody), config).then(res => {
                console.log('res');
                console.log(res);
                this.props.history.push('/profile');
            }).catch(err => {
                console.log('error ja');
                console.log(err);
                if (err.response) {
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);

                    // this.setState({ isLoading: false, isError: err.response.data })
                }
            })
        } else {
            console.log('..')
        }
    }


    render() {
        if (this.state.user === undefined && this.state.isError) {
            return (
                <div className="loading-box">
                    <Spinner name="ball-pulse-sync" fadeIn='quarter' />
                </div>
            )
        }

        return (
            <div>
                <h1 className="title">{` Notification From `}</h1>
            </div>
        )
    }
}

export default withRouter(Notify);