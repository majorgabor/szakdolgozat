import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import NavBarLinks from './navBarLinks.js';

import PageURL from '../constants/pageUrl.js';

class NavBar extends Component {

    render() {
        const username = !!this.props.user ? (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <span id="username" className="navbar-text"><b>{'Logged in as ' + this.props.user}</b></span>
                </li>
            </ul>
        ) : null;

        return (
            <nav className="navbar navbar-expand-md bg-dark navbar-dark">
                <Link className="navbar-brand" to={PageURL.index}>Battleships game</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav">
                        { username }
                    </ul>
                        <NavBarLinks 
                            page={this.props.page} 
                            loggedin={this.props.user}/>
                </div>
            </nav>
        );
    }
}

export default NavBar;