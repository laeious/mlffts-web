import React from 'react';

function Navbar(props) {
    return (
        <nav className="navbar  is-fixed-top" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item is-test">
                    <h1 className="title is-4">
                        MLFFTS
                    </h1>
                </a>
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

export default Navbar;