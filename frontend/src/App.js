import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import IndexPage from './views/indexPage.js';
import LoginPage from './views/loginPage.js';
import SignupPage from './views/signupPage.js';
import LogoutPage from './views/logoutPage.js';
import AccountPage from './views/accountPage.js';
import GamePage from './views/gamePage.js';
import ScoreBoardPage from './views/scoreBoardPage.js';
import PageNotFound from './views/pageNotFound.js';

import PageURL from './constants/pageUrl.js';

class App extends Component {

    render() {
        return (
            <Switch>
                <Route path={PageURL.index} exact component={IndexPage} />
                <Route path={PageURL.login} component={LoginPage} />
                <Route path={PageURL.signup} component={SignupPage} />
                <Route path={PageURL.logout} component={LogoutPage} />
                <Route path={PageURL.account} component={AccountPage} />
                <Route path={PageURL.game} component={GamePage} />
                <Route path={PageURL.scoreboard} component={ScoreBoardPage} />
                <Route component={PageNotFound} />
            </Switch>
        );
    }
}

export default App;
