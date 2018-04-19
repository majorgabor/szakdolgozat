import React, { Component } from 'react';

import NavBar from '../components/navBar.js';

class GamePage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { username } = this.props;

        const navBarProps = {
            page: 'game',
            user: username,
        }
        return (
            <div>
                <NavBar {...navBarProps} />
                game
            </div>
        );
    }
}

export default GamePage;