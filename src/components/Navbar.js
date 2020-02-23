import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
    console.log(props.user)
    if (props.user) {

        return (
            <nav className="navbar  is-fixed-top is-primary" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link to="/">
                        <div className="navbar-item">
                            <h1 className="title logo-nav">
                                MLFFTS
                        </h1>
                        </div>
                    </Link>
                </div>
                <div className="navbar-menu">
                    <div className="navbar-end">
                        <div className="navbar-item">
                         
                                <a className="navbar-item is-link botton is-link">
                                    <b>{props.user.firstname}</b>
                                </a>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
    return (
        <nav className="navbar  is-fixed-top is-primary" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link to="/">
                    <div className="navbar-item is-test">
                        <h1 className="title is-4 logo-nav">
                            MLFFTS
                        </h1>
                    </div>
                </Link>
            </div>
            <div className="navbar-menu">
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <a className="navbar-item ">
                                เข้าสู่ระบบ
                        </a>
                            <a className="navbar-item">
                                สมัครสมาชิก
                        </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;