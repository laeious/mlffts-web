import React from 'react';
import axios from 'axios';
import qs from 'qs';
import jwt from 'jwt-decode';
import LineForm from './LineForm';
import Spinner from 'react-spinkit';
import { withRouter, Link } from 'react-router-dom';


class Line extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: undefined
        }
    }

    componentDidMount() {
        console.log('from line')
        this.checkLogin();
    }


    checkLogin() {
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
                // redirect_uri: 'https://mlffts-web.herokuapp.com/line',
                redirect_uri: 'http://localhost:8080/line',
                client_id: '1653371073',
                client_secret: '7126b5e12a628a6b38089fa4918cdbd2'
            }

            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }

            axios.post('https://api.line.me/oauth2/v2.1/token', qs.stringify(reqBody), config).then(res => {
                console.log(res.data)
                console.log(JSON.stringify(res.data))
                const reqBody2 = {
                    line_info: JSON.stringify(res.data)
                }
                const config2 = {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
                console.log((reqBody2))
                return axios.post('https://mlffts-api.herokuapp.com/cb-line', qs.stringify(reqBody2), config2)

                // const data = jwt(res.data.id_token);
                // console.log(data)
                // this.setState({ user: data })
            }).then(res => {
                console.log(res.data)
                if (res.data.token) {
                    localStorage.setItem('mlffts-jwt', res.data.token);
                    this.props.history.push('/');
                }

            }).catch(err => {
                console.log(err)
                if (err.response) {
                    if(err.response.status === 400){
                        this.props.history.push('/');
                    }
                    console.log(err.response.data.payload);
                    this.setState({user: err.response.data.payload})
                }
            })
        } else {
            this.props.history.push('/');
        }
    }

    render() {
        console.log('render', this.state.user)
        if (this.state.user === undefined) {
            return (
                <div className="loading-box">
                    <Spinner name="ball-pulse-sync" fadeIn='quarter' />
                </div>
            )
        }

        return (
            <div>
                <LineForm lang={this.props.lang} toggleLang={this.props.toggleLang} user={this.state.user}/>
            </div>
        )
    }
}

export default withRouter(Line);