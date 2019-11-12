import React from 'react';

function Navbar(props) {
    return (
        <nav class="navbar  is-fixed-top" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <p className="label">MLFFTS</p>
            </div>
            <div class="navbar-menu">
                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                            <a class="navbar-item is-test">
                                <strong>{props.user.name}</strong>
                            </a>
                            <a class="navbar-item">
                                <figure class="image is-24x24">
                                    <img class="is-rounded" src={props.user.picture} />
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