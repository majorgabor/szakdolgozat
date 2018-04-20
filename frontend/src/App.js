import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import IndexPage from './views/indexPage.js';
import LoginPage from './views/loginPage.js';
import SignupPage from './views/signupPage.js';
import LogoutPage from './views/logoutPage.js';
import AccountPage from './views/accountPage.js';
import GamePage from './views/gamePage.js';
import PageNotFound from './views/pageNotFound.js';

class App extends Component {

    constructor(props) {
        super(props);

        // this.state = {
        //     loggedInUser: null,
        // };
        // this.onChangeUser = this.onChangeUser.bind(this);
    }

    // onChangeUser(newValue) {
    //     this.setState({
    //         loggedInUser: newValue,
    //     });
    // }

    render() {
        return (
            <Switch>
                <Route path='/' exact component={IndexPage} />
                <Route path='/login' component={LoginPage} />
                <Route path='/signup' component={SignupPage} />
                <Route path='/logout' component={LogoutPage} />
                <Route path='/account' component={AccountPage} />
                <Route path='/game' component={GamePage} />
                <Route component={PageNotFound} />
            </Switch>
        );
    }
}

export default App;
