import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
    console.log(props.user)

    if (!props.user) {
        return (
            <nav className="navbar  is-fixed-top has-background-grey-darker" role="navigation" aria-label="main navigation">
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
                        <div class="navbar-item has-dropdown is-hoverable navbar-hover">
                            <a class="navbar-link has-text-white navbar-hover">
                                <b>HELLo</b>
                            </a>
                            <div class="navbar-dropdown is-boxed is-right">
                            <a class="navbar-item">
                                Profile
                            </a>
                            {/* <hr class="navbar-divider"/> */}
                            <a class="navbar-item">
                                Log out
                            </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }

    return (
        <nav className="navbar  is-fixed-top has-background-grey-darker" role="navigation" aria-label="main navigation">
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
                        <div className="buttons">
                            <a className="navbar-item button is-link has-text-white">
                                    <b>เข้าสู่ระบบ</b>
                                </a>
                            <a className="navbar-item button is-link has-text-white">
                                    <b>สมัครสมาชิก</b>
                                </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;