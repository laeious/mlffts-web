import React from 'react';
import axios from 'axios';
import qs from 'qs';
import jwt from 'jwt-decode';

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
                redirect_uri: 'https://mlffts-web.herokuapp.com/line',
                client_id: '1653371073',
                client_secret: '7126b5e12a628a6b38089fa4918cdbd2'
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
                this.setState({ user: data })
            }).catch(err => {
                console.log('error ja')
                console.log(err)
            })
        } else {
            console.log('..')
        }
    }

    render() {
        if (this.state.user === undefined) {
            return (
                <div><h1>Loading...</h1></div>
            )
        }

        return (
            <div>
                HELLO
            </div>
        )
    }
}

export default Line;