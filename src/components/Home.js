import React from 'react';
import Card from './Card';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import th from 'date-fns/locale/th';
import getToken from '../helpers/getToken';
import axios from 'axios';

registerLocale('th', th)

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            startDate: null,
            endDate: null
        }
    }

    componentDidMount() {
        // const token = getToken();
        // if(!token){
        //     this.props.history.push('/login');
        // }

        // axios.get('/getUser', {
        //     headers: {Authorization: `Bearer ${token}` }
        // }).then( res=> this.setState({
        //     user: res.data
        // })).catch( err => {
        //     this.props.history.push('/login')
        // })

    }

    handleChangeStartDate = date => {
        this.setState({
            startDate: date
        });
    };

    handleChangeEndDate = date => {
        this.setState({
            endDate: date
        });
    };


    render() {
        return (
            <div className="section athiti">
                {/* <section className="hero">
                    <div className="hero-body-l">
                        <div className="container">
                            <h1 className="title is-3">
                                MLFFTS
                            </h1>
                            <h2 className="subtitle is-6">
                                Multilane Free Flow Toll System
                            </h2>
                        </div>
                    </div>
                </section> */}

                <div className="columns is-centered">
                
                    <div className="column is-3 is-hidden-desktop">
                        <h1 className="title is-4 is-size-3-widescreen home-title ">ประวัติค่าผ่านทางพิเศษ</h1>

                        <button>ค้นหา</button>
                    </div>

                    <div className="column is-3 is-hidden-touch">
                        <div className="search-container">
                            <h1 className="title is-4 is-size-3-widescreen home-title">ประวัติค่าผ่านทางพิเศษ</h1>
                        <div className="has-text-centered ">
                                <div className="my-datepicker-container">
                                    ตั้งแต่:
                                    <DatePicker
                                        selected={this.state.startDate}
                                        onChange={this.handleChangeStartDate}
                                        dateFormat="dd/MM/yyyy"
                                        locale="th"
                                        className="datepicker"
                                        placeholderText="เลือกวันที่"
                                        maxDate={new Date()}
                                    />
                                    <br />
                                    ถึง:
                                    <DatePicker
                                        selected={this.state.endDate}
                                        onChange={this.handleChangeEndDate}
                                        dateFormat="dd/MM/yyyy"
                                        locale="th"
                                        className="datepicker"
                                        placeholderText="เลือกวันที่"
                                        maxDate={new Date()}

                                    />
                                </div>

                                <hr />

                                <div className="entry-select-container ">

                                    ด่านทางเข้า:
                                <div className="select entry-select is-small">
                                        <select>
                                            <option>-</option>
                                            <option>options 1</option>
                                            <option>options 2</option>
                                            <option>options 3</option>
                                        </select>
                                    </div>

                                    <br />

                                    ด่านทางออก:
                                <div className="select entry-select is-small">
                                        <select>
                                            <option>-</option>
                                            <option>options 1</option>
                                            <option>options 2</option>
                                            <option>options 3</option>
                                        </select>
                                    </div>
                                </div>


                            </div>
                            <div className="has-text-centered">

                                <button className="button search-button athiti">
                                    ค้นหา
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="column is-7 ">
                        <div className="card-container" id="style-2">
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;