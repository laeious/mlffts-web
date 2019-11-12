import React from 'react';

function Navbar(props) {
    return (
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <p className="label">MLFFTS</p>
                </div>
            </nav>

            <div class="navbar-menu">
                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                            <a class="button is-primary">
                                <strong>{props.user.name}</strong>
                            </a>
                            <a class="button is-light">
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