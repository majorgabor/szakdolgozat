import React, { Component } from 'react';
import { fetchAjax } from '../actions/fetchAjax.js';

import NavBar from '../components/navBar.js';
import HorisontalPills from '../components/horisontalPills.js';
import ScorePanel from '../components/scorePanel.js';
import Loading from '../components/loading.js';

import ServerURL from '../constants/serverUrl.js';
import * as ScoreBoardPageConstants from '../constants/scoreBoardPageConstants.js';

class ScoreBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            username: null,
            sbBattles: null,
            sbWins: null,
            sbPoints: null,
        };

    }

    componentDidMount() {
        fetchAjax(ServerURL.scoreboard, 'POST', null, this.onAjaxSuccess());
    }

    onAjaxSuccess() {
        return (response) => {
            console.log(response);
            this.setState({
                isLoaded: true,
                username: response.username || null,
                sbBattles: response.battles,
                sbWins: response.wins,
                sbPoints: response.points,
            });
        }
    };

    render() {
        const { isLoaded, username, sbBattles, sbWins, sbPoints } = this.state;
        
        ScoreBoardPageConstants.navBarProps.user = username;
        ScoreBoardPageConstants.horisontalPillsProps[0].body = (<ScorePanel scoreBoardData={sbBattles} />);
        ScoreBoardPageConstants.horisontalPillsProps[1].body = (<ScorePanel scoreBoardData={sbWins} />);
        ScoreBoardPageConstants.horisontalPillsProps[2].body = (<ScorePanel scoreBoardData={sbPoints} />);

        if(!isLoaded) {
            return (
                <Loading />
            );
        }
        if(isLoaded) {
            return (
                <div>
                    <NavBar {...ScoreBoardPageConstants.navBarProps}/>
                    <div className="card offset-xl-2 col-xl-8 offset-lg-1 col-lg-10">
                        <div className="card-body">
                            <h5>Score Board</h5>
                        </div>
                    </div>
                    <HorisontalPills tabs={ScoreBoardPageConstants.horisontalPillsProps} />
                </div>
            );
        }
    }
}

export default ScoreBoard;