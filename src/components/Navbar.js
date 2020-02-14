import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {

    if (props.user) {

        return (
            <nav className="navbar  is-fixed-top" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link to="/">
                        <a className="navbar-item is-test">
                            <h1 className="title logo-nav">
                                MLFFTS
                        </h1>
                        </a>
                    </Link>
                </div>
                <div className="navbar-menu">
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <a className="navbar-item is-test">
                                    <strong>{props.user.name}</strong>
                                </a>
                                <a className="navbar-item">
                                    <figure className="image is-24x24">
                                        <img className="is-rounded" src={props.user.picture} />
                                    </figure>
                                </a>
                            </div>
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
                    <a className="navbar-item is-test">
                        <h1 className="title is-4 logo-nav">
                            MLFFTS
                        </h1>
                    </a>
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