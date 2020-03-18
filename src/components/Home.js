import React from 'react';
import Card from './Card';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import th from 'date-fns/locale/th';
import en from 'date-fns/locale/en-US'
import getToken from '../helpers/getToken';
import axios from 'axios';
import Navbar from './Navbar';
import { withRouter, Link } from 'react-router-dom';
import Spinner from 'react-spinkit';
import { Route } from 'react-router-dom';
import Profile from './Profile';
import Admin from './Admin';
import Lang from '../helpers/Lang';
import ScrollToTop from 'react-scroll-up';
import Select from 'react-select'


registerLocale('th', th)
registerLocale('en', en)

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            startDate: null,
            endDate: null,
            searhActive: false,
            isError: false,
            isLoading: false,
            transList: [],
            noMoreData: false,
            license_list: []
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
                if(res.data.type === 0 ){
                    this.loadLP(token);
                    this.loadData();
                }
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

    loadLP = (token) => {
        axios.get(`https://mlffts-api.herokuapp.com/lpinfo`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
            let options = res.data.map((item,i)=> ({ value: item.license_number, label:item.license_number}));
            this.setState({ license_list : options })
        }
        ).catch(err => {
            // alert(err);
            console.log(err);
            if (err.response) {
                if (err.response.status === 500) {
                    // not verify email
                    // this.setState({ noMoreData: true })
                }
                // this.setState({ isLoading: false })
            }
        })

    }

    loadData = () => {
        const token = getToken();
        if (!token) {
            this.props.history.push('/login');
        } else {
            this.setState({ isLoading: true })
            axios.get(`https://mlffts-api.herokuapp.com/transaction/limit=2&offset=${this.state.transList.length}`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
                let oldData = this.state.transList;
                let allData = oldData.concat(res.data.data)
                console.log(allData)
                this.setState({ transList: allData, isLoading: false })
            }
            ).catch(err => {
                // alert(err);
                console.log(err);
                if (err.response) {
                    if (err.response.status === 500) {
                        // not verify email
                        this.setState({ noMoreData: true })
                    }
                    this.setState({ isLoading: false })
                }
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
                            <div className="navbar-item is-hoverable has-dropdown ">
                                <a className="navbar-link has-text-white athiti">
                                    {this.state.user ? this.state.user.firstname : null}
                                </a>
                                <div className="navbar-dropdown is-boxed is-right ">
                                    {
                                        this.state.user.type !== 1 ?
                                            <Link to="/profile" className="navbar-item athiti is-1rem">
                                                <Lang lang={this.props.lang} en='Profile' th="โปรไฟล์" />
                                            </Link>
                                            :
                                            null
                                    }
                                    <a className="navbar-item athiti is-1rem" onClick={this.logout}>
                                        <Lang lang={this.props.lang} en='Log out' th="ออกจากระบบ" />
                                    </a>
                                    <hr className="navbar-divider"></hr>
                                    <div className="navbar-item lang-box is-1rem">
                                        <span id="th-button" className={this.props.lang === 'th' ? 'lang-active' : ''}
                                            onClick={this.props.toggleLang}
                                        >TH </span>
                                        /
                                        <span id="en-button" className={this.props.lang === 'en' ? 'lang-active' : ''}
                                            onClick={this.props.toggleLang}
                                        > EN</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                {
                    this.state.user.type !== 1 ?
                        (
                            <div>
                                <Route
                                    path="/profile"
                                    render={(props) => <Profile {...props} user={this.state.user ? this.state.user : null} lang={this.props.lang}/>}
                                />

                                <Route path="/" exact >
                                    <div className="section-home athiti">

                                        <div className="columns is-centered">
                                            <div className="column is-3 is-hidden-tablet">
                                                <div className="has-text-centered add-btm-padding ">
                                                    <h1 className={`title ${this.props.lang === 'en' ? 'is-4' : 'is-4'} is-size-3-widescreen home-title`}><Lang lang={this.props.lang} en='Transaction' th="ประวัติค่าผ่านทาง" /></h1>
                                                </div>
                                                <button className="button is-fullwidth search-btn-mobile" onClick={this.toggleSearch}><Lang lang={this.props.lang} en='Search' th="ค้นหา" /></button>

                                                <div className={this.state.searhActive ? "search-container-touch active" : "search-container-touch"}>
                                                    <div className="has-text-centered ">
                                                        <div className="my-datepicker-container">
                                                            <Lang lang={this.props.lang} en='From' th="ตั้งแต่" />:
                                    <DatePicker
                                                                selected={this.state.startDate}
                                                                onChange={this.handleChangeStartDate}
                                                                dateFormat="dd/MM/yyyy"
                                                                locale={this.props.lang === 'en' ? 'en' : 'th'}
                                                                className="datepicker"
                                                                placeholderText={this.props.lang === 'en' ? 'Select Date' : 'เลือกวันที่'}
                                                                maxDate={new Date()}
                                                            />
                                                            <br />
                                                            <Lang lang={this.props.lang} en='To' th="ถึง" />:
                                    <DatePicker
                                                                selected={this.state.endDate}
                                                                onChange={this.handleChangeEndDate}
                                                                dateFormat="dd/MM/yyyy"
                                                                locale={this.props.lang === 'en' ? 'en' : 'th'}
                                                                className="datepicker"
                                                                placeholderText={this.props.lang === 'en' ? 'Select Date' : 'เลือกวันที่'}
                                                                maxDate={new Date()}

                                                            />
                                                        </div>

                                                        <hr />

                                                        <div className="entry-select-container ">

                                                            <Lang lang={this.props.lang} en='Exit Plaza' th="ด่านทางออก" />:
                                <div className="select entry-select is-small">
                                                                <select>
                                                                    <option>-</option>
                                                                    <option>options 1</option>
                                                                    <option>options 2</option>
                                                                    <option>options 3</option>
                                                                </select>
                                                            </div>>
                                                        </div>


                                                    </div>
                                                    <div className="has-text-centered">

                                                        <button className="button search-button athiti">
                                                            <Lang lang={this.props.lang} en='Search' th="ค้นหา" />
                                                        </button>
                                                    </div>
                                                </div>
                                                {/* <button>ค้นหา</button> */}
                                            </div>

                                            <div className="column is-3 is-hidden-mobile">
                                                <div className="search-container">
                                                    <div className="has-text-centered add-btm-padding ">
                                                        <h1 className={`title ${this.props.lang === 'en' ? 'is-4' : 'is-4'} is-size-3-widescreen home-title`}><Lang lang={this.props.lang} en='Transaction' th="ประวัติค่าผ่านทาง" /></h1>
                                                    </div>
                                                    <div className="has-text-centered ">
                                                        <div className="my-datepicker-container">
                                                            <Lang lang={this.props.lang} en='From' th="ตั้งแต่" />:
                                    <DatePicker
                                                                selected={this.state.startDate}
                                                                onChange={this.handleChangeStartDate}
                                                                dateFormat="dd/MM/yyyy"
                                                                locale={this.props.lang === 'en' ? 'en' : 'th'}
                                                                className="datepicker"
                                                                placeholderText={this.props.lang === 'en' ? 'Select Date' : 'เลือกวันที่'}
                                                                maxDate={new Date()}
                                                            />
                                                            <br />
                                                            <Lang lang={this.props.lang} en='To' th="ถึง" />:
                                    <DatePicker
                                                                selected={this.state.endDate}
                                                                onChange={this.handleChangeEndDate}
                                                                dateFormat="dd/MM/yyyy"
                                                                locale={this.props.lang === 'en' ? 'en' : 'th'}
                                                                className="datepicker"
                                                                placeholderText={this.props.lang === 'en' ? 'Select Date' : 'เลือกวันที่'}
                                                                maxDate={new Date()}

                                                            />
                                                        </div>

                                                        <hr />

                                                        <div className="entry-select-container ">

                                                            <Lang lang={this.props.lang} en='Select car' th="เลือกรถ" />:

                                                            <Select 
                                                                styles={styles} 
                                                                options={this.state.license_list}
                                                                isClearable={true}
                                                                isSearchable="false"
                                                            />

                                                        </div>


                                                    </div>
                                                    <div className="has-text-centered">

                                                        <button className="button search-button athiti">
                                                            <Lang lang={this.props.lang} en='Search' th="ค้นหา" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="column is-7 ">
                                                <div className="card-container" id="style-2"> 
                                                    {this.state.transList.map((item, i) => {
                                                        let time = new Date(item.last_update);
                                                        let timeString = time.toLocaleString();
                                                        return <Card
                                                            key={i}
                                                            lang={this.props.lang}
                                                            entry={<Lang lang={this.props.lang} en={item.from_en} th={item.from_th} />}
                                                            exit={<Lang lang={this.props.lang} en={item.to_en} th={item.to_th} />}
                                                            cost={item.cost}
                                                            time={timeString}
                                                            lp={item.lp_info}
                                                            pdf={null} />
                                                    })}

                                                    <div className="columns is-centered" >
                                                        <div className="column is-10">
                                                            <div style={this.state.noMoreData ? { 'display': 'none' } : { 'display': 'block' }}>
                                                                <button className={this.state.isLoading ? "button is-fullwidth is-loading more-btn" : "button more-btn is-fullwidth"}

                                                                    onClick={this.loadData}
                                                                >
                                                                    <Lang lang={this.props.lang} en='More' th="เพิ่มเติม" />
                                                                </button>
                                                            </div>
                                                            {this.state.noMoreData ? <hr /> : null}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="btn-animation">
                                                <ScrollToTop showUnder={15} duration={350} style={{ 'bottom': '20px', 'right': '20px' }}>
                                                    <button className="button go-top-btn" >
                                                        <span className="icon  go-top-icon">
                                                            <i className="fas fa-arrow-up"></i>
                                                        </span>
                                                    </button>
                                                </ScrollToTop>
                                            </div>
                                        </div>
                                    </div>
                                </Route>
                            </div>)
                        :
                        <Admin lang={this.props.lang} />
                }
            </div>
        )
    }
}

const targetHeight = 30;

const styles = {
    control: base => ({
        ...base,
        minHeight: 'initial',
    }),
    valueContainer: base => ({
        ...base,
        height: `${targetHeight - 1 - 1}px`,
        padding: '0 8px',
    }),
    clearIndicator: base => ({
        ...base,
        padding: `${(targetHeight - 20 - 1 - 1) / 2}px`,
    }),
    dropdownIndicator: base => ({
        ...base,
        padding: `${(targetHeight - 20 - 1 - 1) / 2}px`,
    }),
};
export default withRouter(Home);