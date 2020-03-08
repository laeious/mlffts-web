import React from 'react';
import Card from './Card';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import th from 'date-fns/locale/th';
import getToken from '../helpers/getToken';
import axios from 'axios';
import Navbar from './Navbar';
import { withRouter, Link } from 'react-router-dom';
import Spinner from 'react-spinkit';
import { Route } from 'react-router-dom';
import Profile from './Profile';
import Admin from './Admin';

registerLocale('th', th)

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            startDate: null,
            endDate: null,
            searhActive: false,
            isError: false
        }
    }

    componentDidMount() {
        const token = getToken();
        console.log(token);
        if (!token) {
            this.props.history.push('/login');
        } else {
            axios.get('https://mlffts-api.herokuapp.com/profile', {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
                console.log(res.data)
                this.setState({ user: res.data, isError: false })
            }
            ).catch(err => {
                // alert(err);
                console.log(err);
                localStorage.removeItem('mlffts-jwt');
                this.setState({ user: undefined, isError: true })
                window.location.reload();
            })
        }



    }

    toggleSearch = () => {
        this.setState({ searhActive: !this.state.searhActive });
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

    logout = () => {
        const token = getToken();
        if (!token) {
            this.props.history.push('/login');
        } else {
            axios.get('https://mlffts-api.herokuapp.com/logout', {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
                localStorage.removeItem('mlffts-jwt');
                window.location.reload();
            }
            ).catch(err => {
                // alert(err);
                console.log(err);
                localStorage.removeItem('mlffts-jwt');
            })
        }
    }

    render() {
        if (this.state.user === undefined) {
            return (
                <div className="loading-box">
                    <Spinner name="ball-pulse-sync" fadeIn='quarter' />
                </div>
            )
        }

        return (
            <div className="navbar-space">
                <nav className="navbar  is-fixed-top has-background-grey-darker  is-transparent" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">

                        <div className="navbar-item">
                            <a href="/">

                                <h1 className="title logo-nav">
                                    MLFFTS
                        </h1>
                            </a>
                        </div>


                        <a className="navbar-burger" data-target="navbarList" onClick={this.handleMenu}>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>
                    <div className="navbar-menu">
                        <div className="navbar-end">
                            <div className="navbar-item is-hoverable has-dropdown">
                                <a className="navbar-link has-text-white athiti">
                                    {this.state.user ? this.state.user.firstname : null}
                                </a>
                                <div className="navbar-dropdown is-boxed is-right">
                                    {/* <a className="navbar-item"> */}
                                    {
                                        this.state.user.type === 1 ?
                                            <Link to="/profile" className="navbar-item">
                                                Profile
                                        </Link>
                                            :
                                            null
                                    }
                                    {/* </a> */}
                                    {/* <hr className="navbar-divider"/> */}
                                    <a className="navbar-item" onClick={this.logout}>
                                        Log out
                            </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                {
                    this.state.user.type === 1 ?
                        (
                            <div>
                                <Route
                                    path="/profile"
                                    render={(props) => <Profile {...props} user={this.state.user ? this.state.user : null} />}
                                />

                                <Route path="/" exact >
                                    <div className="section-home athiti">

                                        <div className="columns is-centered">
                                            <div className="column is-3 is-hidden-tablet">
                                                <h1 className="title is-4 is-size-3-widescreen home-title">ประวัติค่าผ่านทางพิเศษ</h1>
                                                <button className="button is-fullwidth search-btn-mobile" onClick={this.toggleSearch}>ค้นหา</button>

                                                <div className={this.state.searhActive ? "search-container-touch active" : "search-container-touch"}>
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
                                                {/* <button>ค้นหา</button> */}
                                            </div>

                                            <div className="column is-3 is-hidden-mobile">
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
                                </Route>
                            </div>)
                        :
                        <Admin />
                }
            </div>
        )
    }
}

export default withRouter(Home);