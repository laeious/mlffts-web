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
            license_list: [],
            isSearchMode: false,
            isNotFound: false,
            monthSelected: null,
            lpSelected: null,
            showLpSelect: false,
            months_th: [
                // { value: 1, label: 'มกราคม' },
                // { value: 2, label: 'กุมภาพันธ์' },
                // { value: 3, label: 'มีนาคม' },
                { value: '04/20', label: 'เมษายน 2563' },
                // { value: 5, label: 'พฤษภาคม' },
                // { value: 6, label: 'มิถุนายน' },
                // { value: 7, label: 'กรกฎาคม' },
                // { value: 8, label: 'สิงหาคม' },
                // { value: 9, label: 'กันยายน' },
                // { value: 10, label: 'ตุลาคม' },
                // { value: 11, label: 'พฤศจิกายน' },
                // { value: 12, label: 'ธันวาคม' },
            ],
            months_en: [
                // { value: 1, label: 'January' },
                // { value: 2, label: 'February' },
                // { value: 3, label: 'March' },
                { value: '04/20', label: 'April 2020' },
                // { value: 5, label: 'May' },
                // { value: 6, label: 'June' },
                // { value: 7, label: 'July' },
                // { value: 8, label: 'August' },
                // { value: 9, label: 'September' },
                // { value: 10, label: 'October' },
                // { value: 11, label: 'November' },
                // { value: 12, label: 'December' },
            ]
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
                if (res.data.type === 0) {
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
        // let dateString = date.toISOString().replace('T', ' ').slice(0,-5)
        // console.log(dateString)
        this.setState({
            startDate: date
        });
    };

    handleChangeEndDate = date => {
        // let dateString = date.toISOString().replace('T', ' ').slice(0,-5)
        // console.log(dateString)
        this.setState({
            endDate: date
        });
    };

    loadSearch = () => {
        const token = getToken();
        if (!token) {
            this.props.history.push('/login');
        } else {
            this.setState({ isLoading: true })
            let startDateStr = this.state.startDate ? this.state.startDate.toISOString().replace('T', ' ').slice(0, -5) : new Date("2019-01-01T01:00:00Z");
            let endDateStr = this.state.endDate ? this.state.endDate.toISOString().replace('T', ' ').slice(0, -5) : new Date();
            axios.get(`https://mlffts-api.herokuapp.com/transaction?status=1&date_from=${startDateStr}&date_to=${endDateStr}&limit=2&offset=${this.state.transList.length}`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
                let oldData = this.state.transList;
                let allData = oldData.concat(res.data.data)
                if (res.data.data.length === 0) {
                    this.setState({ noMoreData: true })
                }
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
                    } else if (err.response.status === 404) {
                        this.setState({ isNotFound: true })
                    }
                    this.setState({ isLoading: false })
                }
            })
        }
    }

    search = () => {
        this.setState({ transList: [], isNotFound: false, isSearchMode: true }, () => { this.loadSearch(); });
    }

    clearSearch = () => {
        this.setState({ transList: [], isSearchMode: false, isNotFound:false }, () => { this.loadData(); })
    }

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
            let options = res.data.map((item, i) => ({ value: item.license_number, label: item.license_number, id: item.id }));
            console.log(res.data)
            this.setState({ license_list: options })
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

    loadMore = () => {
        if (this.state.isSearchMode) {
            this.loadSearch();
        } else {
            this.loadData();
        }

    }

    loadData = () => {
        const token = getToken();
        if (!token) {
            this.props.history.push('/login');
        } else {
            this.setState({ isLoading: true })
            axios.get(`https://mlffts-api.herokuapp.com/transaction?limit=6&offset=${this.state.transList.length}`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
                if (this.state.transList.length == 0 && res.data.data.length <= 6) {
                    this.setState({ noMoreData: true })
                }
                let oldData = this.state.transList;
                let allData = oldData.concat(res.data.data)
                if (res.data.data.length === 0) {
                    this.setState({ noMoreData: true })
                }
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
                    }else if (err.response.status === 404) {
                        this.setState({isNotFound: true, noMoreData:true})
                    }
                    this.setState({ isLoading: false })
                }
            })
        }
    }

    loadPDF = (id) => {
        const token = getToken();
        if (!token) {
            this.props.history.push('/login');
        } else {
            axios.get(`https://mlffts-api.herokuapp.com/transaction/single-gen?transaction_id=${id}`, {
                responseType: 'blob',
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
                const file = new Blob(
                    [res.data],
                    { type: 'application/pdf' });

                const fileURL = URL.createObjectURL(file);

                window.open(fileURL);
            }
            ).catch(err => {
                // alert(err);
                console.log(err);
                if (err.response) {
                    console.log(err.response)
                    // if (err.response.status === 500) {
                    //     // not verify email

                    // }
                    // this.setState({ isLoading: false })
                }
            })
        }
    }

    monthSelect = selected => {
        this.setState({ monthSelected: selected });
    }

    lpSelect = selected => {
        this.setState({ lpSelected: selected });
    }

    loadPDFMonth = () => {
        console.log(this.state.monthSelected, this.state.lpSelected)
        if (!this.state.lpSelected) {

        }
        if (this.state.monthSelected && this.state.lpSelected) {
            const token = getToken();
            if (!token) {
                this.props.history.push('/login');
            } else {
                const monthYear = this.state.monthSelected.value;
                const month = monthYear.slice(0, 2);
                const nextMonth = month === '12' ? '01' : (parseInt(month, 10) + 101).toString().substr(1);
                const year = monthYear.slice(3, 5);
                const start = `20${year}-${month}-01 00:00:00`
                const end = `20${year}-${nextMonth}-01 00:00:00`

                console.log(start, end)

                axios.get(`https://mlffts-api.herokuapp.com/transaction/gen?date_from=${start}&date_to${end}&lp_id=${this.state.lpSelected.id}`, {
                    responseType: 'blob',
                    headers: { Authorization: `Bearer ${token}` }
                }).then(res => {
                    const file = new Blob(
                        [res.data],
                        { type: 'application/pdf' });

                    const fileURL = URL.createObjectURL(file);

                    window.open(fileURL);
                }
                ).catch(err => {
                    // alert(err);
                    console.log(err);
                    if (err.response) {
                        console.log(err.response)
                        // if (err.response.status === 500) {
                        //     // not verify email

                        // }
                        // this.setState({ isLoading: false })
                    }
                })
            }
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
                                <a className="navbar-link has-text-white Sarabun">
                                    {this.state.user ? this.state.user.firstname : null}
                                </a>
                                <div className="navbar-dropdown is-boxed is-right ">
                                    {
                                        this.state.user.type !== 1 ?
                                            <Link to="/profile" className="navbar-item Sarabun is-1rem">
                                                <Lang lang={this.props.lang} en='Profile' th="โปรไฟล์" />
                                            </Link>
                                            :
                                            null
                                    }
                                    <a className="navbar-item Sarabun is-1rem" onClick={this.logout}>
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
                                    render={(props) => <Profile {...props} user={this.state.user ? this.state.user : null} lang={this.props.lang} />}
                                />

                                <Route path="/" exact >
                                    <div className="section-home Sarabun">
                                        <div className="columns is-centered">
                                            <div className="column is-3 is-hidden-tablet">
                                                {/* mobi */}
                                            </div>
                                            <div className="column is-3 is-hidden-mobile">
                                                <div className="search-container">
                                                    <div className="has-text-centered add-btm-padding ">
                                                        <h1 className={`title ${this.props.lang === 'en' ? 'is-5' : 'is-5'} is-size-4-widescreen home-title`}><Lang lang={this.props.lang} en='Transaction' th="ประวัติค่าผ่านทาง" /></h1>
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

                                                        <br />
                                                        {/* <hr className="my-hr" /> */}

                                                        <div className="entry-select-container ">

                                                            <Lang lang={this.props.lang} en='Select Car' th="เลือกรถ" />:

                                                            <div style={{ width: '200px' }}>
                                                                <Select
                                                                    styles={styles}
                                                                    options={this.state.license_list}
                                                                    isClearable={true}
                                                                    isSearchable="false"
                                                                    placeholder={this.props.lang === 'en' ? 'Select Car' : 'เลือกรถ'}
                                                                />
                                                            </div>

                                                        </div>


                                                    </div>
                                                    <div className="has-text-centered">

                                                        <button className="button search-button Sarabun has-text-white" onClick={this.search}>
                                                            <Lang lang={this.props.lang} en='Search' th="ค้นหา" />
                                                        </button>
                                                    </div>

                                                    <hr className="my-hr" />

                                                    <div className="box">

                                                        <div className="has-text-centered add-btm-padding ">
                                                            <h1 className={`title ${this.props.lang === 'en' ? 'is-5' : 'is-5'} is-size-4-widescreen home-title`}><Lang lang={this.props.lang} en='Monthly Transaction' th="ประวัติค่าผ่านทางรายเดือน" /></h1>

                                                            <div className="entry-select-container ">

                                                                <Lang lang={this.props.lang} en='Month' th="เดือน" />:

                                                            <div style={{ width: '200px' }}>
                                                                    <Select
                                                                        styles={styles}
                                                                        options={this.props.lang === 'en' ? this.state.months_en : this.state.months_th}
                                                                        isClearable={true}
                                                                        isSearchable="false"
                                                                        onChange={this.monthSelect}
                                                                        value={this.state.monthSelected}
                                                                        placeholder={this.props.lang === 'en' ? 'Select Month' : 'เลือกเดือน'}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <br />

                                                            {this.state.monthSelected ? <div className="entry-select-container ">
                                                                <Lang lang={this.props.lang} en='Select Car' th="เลือกรถ" />:
                                                            <div style={{ width: '200px' }}>
                                                                    <Select
                                                                        styles={styles}
                                                                        options={this.state.license_list}
                                                                        isClearable={true}
                                                                        isSearchable="false"
                                                                        onChange={this.lpSelect}
                                                                        value={this.state.lpSelected}
                                                                        placeholder={this.props.lang === 'en' ? 'Select Car' : 'เลือกรถ'}
                                                                    />
                                                                </div>
                                                            </div> : null}

                                                            <div className="has-text-centered">
                                                                <button className="button search-button Sarabun has-text-white" onClick={this.loadPDFMonth}>
                                                                    <Lang lang={this.props.lang} en='Download' th="ดาวน์โหลด" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="column is-7 ">
                                                {this.state.isSearchMode && <div className="clear-button-box">
                                                    <button className="button clear-button is-right" onClick={this.clearSearch}>
                                                        <span><Lang lang={this.props.lang} en="Clear" th="ยกเลิก" /></span>
                                                        <span className="icon is-small">
                                                            <i className="fas fa-times " ></i>
                                                        </span>
                                                    </button>
                                                </div>}
                                                <div className="card-container" id="style-2">
                                                    {this.state.transList.map((item, i) => {
                                                        let time = new Date(item.last_update);
                                                        let timeString = time.toLocaleString();
                                                        return <Card
                                                            key={item.id}
                                                            id={item.id}
                                                            lang={this.props.lang}
                                                            entry={<Lang lang={this.props.lang} en={item.from_en} th={item.from_th} />}
                                                            exit={<Lang lang={this.props.lang} en={item.to_en} th={item.to_th} />}
                                                            cost={item.cost}
                                                            time={timeString}
                                                            lp={item.lp_info}
                                                            pdf={() => this.loadPDF(item.id)} />
                                                    })}

                                                    <div className="columns is-centered" >
                                                        <div className="column is-10">
                                                            {
                                                                this.state.isNotFound ?
                                                                    <div className="has-text-centered" style={{ marginTop: '10px' }}>
                                                                        <Lang lang={this.props.lang} en={'Data Not Found'} th={'ไม่พบข้อมูล'} />
                                                                    </div>
                                                                    : null
                                                            }
                                                            <div style={this.state.noMoreData ? { 'display': 'none' } : { 'display': 'block' }}>
                                                                <button className={this.state.isLoading ? "button is-fullwidth is-loading has-text-white more-btn" : "button more-btn is-fullwidth"}

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