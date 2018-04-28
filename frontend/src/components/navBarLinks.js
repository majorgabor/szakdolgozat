import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PageURL from '../constants/pageUrl.js';

class NavBarLinks extends Component {
    
    render() {

        const login = (
            <li className="nav-item">
                <Link className="nav-link" to={PageURL.login} >
                    <span className="oi oi-account-login" title="login" aria-hidden="true"></span>
                LogIn</Link>
            </li>
        );

        const logout = (
            <li className="nav-item">
                <Link className="nav-link" to={PageURL.logout} >
                    <span className="oi oi-account-logout" title="logout" aria-hidden="true"></span>
                Logout</Link>
            </li>
        );

        const signup = (
            <li className="nav-item">
                <Link className="nav-link" to={PageURL.signup}>
                    <span className="oi oi-people" title="singup" aria-hidden="true"></span>
                Sign Up</Link>
            </li>
        );

        const account = (
            <li className="nav-item">
                <Link className="nav-link" to={PageURL.account} >
                    <span className="oi oi-person" title="account" aria-hidden="true"></span>
                Account</Link>
            </li>
        );
        const { page, loggedin } = this.props;
        return (
            <ul className="navbar-nav ml-auto">
                { page === 'index' && !loggedin && login }
                { page === 'index' && !loggedin && signup }
                { page === 'index' && loggedin && account }
                { page === 'index' && loggedin && logout }

                { page === 'login' && signup }
                
                { page === 'signup' && login }

                { page === 'account' && logout }
            </ul>
        );
    }
}

export default NavBarLinks;