import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Lang from '../helpers/Lang';

class Verify extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="navbar-space">
                {/* <div className="lang-box long-box-login">
                    <span id="th-button" className={this.props.lang === 'th' ? 'lang-active' : ''}
                        onClick={this.props.toggleLang}
                    >TH</span>
                    /
                    <span id="en-button" className={this.props.lang === 'en' ? 'lang-active' : ''}
                        onClick={this.props.toggleLang}
                    >EN</span>
                </div> */}
                <div className="has-text-centered Sarabun verify-box">
                    <div className="verify-icon">
                        <i class="fas fa-user-check"></i>
                    </div>
                    <p className="title">Account Activated</p>
                    <p className="subtitle">This account has been activated successfully.</p>

                    <Link to="/"><button className="verify-button button is-dark">Log In Now</button></Link>
                </div>
            </div>
        )
    }
}

export default withRouter(Verify);