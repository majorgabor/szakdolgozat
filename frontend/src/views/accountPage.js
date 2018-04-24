import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { fetchAjax } from '../actions/fetchAjax.js';
import { socket } from '../actions/wsclient.js';

import NavBar from '../components/navBar.js';
import VerticalPills from '../components/verticalPills.js';
import DataPanel from '../components/dataPanel.js';
import Form from '../components/form.js';
import Modal from '../components/modal.js';
import Loading from '../components/loading.js';

import PageStatus from '../enums/accountPageStatus.js';
import * as AccountPageConstants from '../constants/accountPageConstants.js';

class AccountPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            pageStatus: PageStatus.loading,
            userInfo: {},
            enemy: null,
            matchMakingCounter: 0,
            requestInfoText: null,
        };
        this.refresh = this.refresh.bind(this);
        this.startGame = this.startGame.bind(this);
        this.leaveMatchMaking = this.leaveMatchMaking.bind(this);
    }

    refresh() {
        fetchAjax(
            'http://localhost:80/szakdolgozat/back-end/API/account/',
            {
                method: 'GET',
                credentials: 'include',
            },
            this.onAjaxsuccess()
        );
    }

    onAjaxsuccess() {
        return (response) => {
            if(Number.isInteger(response)) {
                this.setState({
                    pageStatus: PageStatus.redirectToLogin,
                });
            } else {
                this.setState({
                    pageStatus: PageStatus.pageReady,
                    userInfo: response,
                });
            }
        };
    }

    componentDidMount() {
        console.log('component mounted');
        this.refresh()
        socket.on('numberOfWaitingUser', (data) => {
            this.setState({
                matchMakingCounter: data,
            });
        });
        socket.on('enemyFound', (data) => {
            this.setState({
                pageStatus: PageStatus.battleRequest,
                enemy: data
            });
            // mainCounter(10, 'matchmakingModal-footer', () => {
            //     battleRequestAnswer(false);
            // });
        });
        socket.on('enemyDiscarded', (data) => {
            // clearInterval(counter);
            this.setState({
                pageStatus: PageStatus.requestInfo,
                requestInfoText: 'Your enemy discarded.',
            });
            setTimeout(function() {
                console.log('startfrom-enemydiscarded');
                this.startGame();
            }.bind(this), 2500);
        });
        socket.on('startGame', (data) => {
            this.setState({
                pageStatus: PageStatus.redirectToGame,
            });
        });
    }

    startGame() {
        this.setState({
            pageStatus: PageStatus.matchmaking,
        });
        socket.emit('joinToMatchMaking', this.state.userInfo.username);
    }

    leaveMatchMaking() {
        this.setState({
            pageStatus: PageStatus.pageReady,
        });
        socket.emit('leaveMatchMaking', null);
    }

    battleRequestAnswer(answer) {
        return () => {
            socket.emit('battleRequestAnswer', answer);
            // clearInterval(counter);
            if(answer) {
                this.setState({
                    pageStatus: PageStatus.requestInfo,
                    requestInfoText: 'Waiting for your enemy answer.',
                });
            } else {
                console.log('startfrom-idiscarded');                
                this.startGame();
            }
        }
    }

    setModifyFormFieldsPlaceholder() {
        let setted = AccountPageConstants.modifyFormFields;
        setted[0].placeholder = this.state.userInfo.firstname;
        setted[1].placeholder = this.state.userInfo.lastname;
        setted[2].placeholder = this.state.userInfo.username;        
        return setted;
    }

    render() {
        const { pageStatus, userInfo, enemy, matchMakingCounter, requestInfoText } = this.state;
        if(pageStatus === PageStatus.loading) {
            return (
                <Loading />
            );
        }
        if(pageStatus === PageStatus.backToLogin) {
            return (
                <Redirect to='/login' />
            );
        }
        if(pageStatus === PageStatus.redirectToGame) {
            return (
                <Redirect to='/game' />
            );
        }

        AccountPageConstants.navBarProps.user = userInfo.username;
        const profileData = {
            name: userInfo.firstname+' '+userInfo.lastname,
            username: userInfo.username,
            email:userInfo.email,
        };
        const statisticData = {
            battles: userInfo.battles,
            wins: userInfo.wins,
            points: userInfo.points,
        };
        AccountPageConstants.modifyFormProps.fields = this.setModifyFormFieldsPlaceholder();
        AccountPageConstants.varticalPillsProps[0].body = (<DataPanel data={profileData} />);
        AccountPageConstants.varticalPillsProps[1].body = (<DataPanel data={statisticData} />);
        AccountPageConstants.varticalPillsProps[2].body = (<Form triggerRefresh={this.refresh} {...AccountPageConstants.modifyFormProps}/>);

        if(pageStatus === PageStatus.pageReady) {
            return (
                <div id="account">
                    <NavBar {...AccountPageConstants.navBarProps} />
                    <div className="card offset-xl-2 col-xl-8 offset-gl-1 col-gl-10">
                        <div className="card-body">
                            <button
                                onClick={this.startGame}
                                className="btn btn-primary btn-lg">
                                    Start game
                            </button>
                            <p>Play now for free!</p>
                        </div>
                    </div>
                    <VerticalPills tabs={AccountPageConstants.varticalPillsProps} />
                </div>
            );
        }
        if(pageStatus === PageStatus.matchmaking) {
            return (
                <div id="account">
                    <NavBar {...AccountPageConstants.navBarProps} />
                    <div className="card offset-xl-2 col-xl-8 offset-gl-1 col-gl-10">
                        <h5 className="card-header">Match Making</h5>
                        <div className="card-body">
                            <h5 className="card-title">There are {matchMakingCounter-1} other user waiting for matchmaking.</h5>
                            <p className="card-text">Please wait for yout enemy.</p>
                            <button
                                onClick={this.leaveMatchMaking}
                                className="btn btn-danger btn-lg">
                                    Leave Match Making
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
        if(pageStatus === PageStatus.battleRequest) {
            return (
                <div id="account">
                    <NavBar {...AccountPageConstants.navBarProps} />
                    <div className="card offset-xl-2 col-xl-8 offset-gl-1 col-gl-10">
                        <h5 className="card-header">Battle Request</h5>
                        <div className="card-body">
                            <h5 className="card-title">Your enemy is <b>{enemy}</b>.</h5>
                            <p className="card-text">Please wait for yout enemy.</p>
                            <button
                                onClick={this.battleRequestAnswer(true)}
                                id="accept"
                                type="button"
                                className="btn btn-success">
                                    Accept
                            </button>
                            <button
                                onClick={this.battleRequestAnswer(false)}
                                id="discard"
                                type="button"
                                className="btn btn-danger">
                                    Discard
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
        if(pageStatus === PageStatus.requestInfo) {
            return (
                <div id="account">
                    <NavBar {...AccountPageConstants.navBarProps} />
                    <div className="card offset-xl-2 col-xl-8 offset-gl-1 col-gl-10">
                        <h5 className="card-header">{requestInfoText}</h5>
                        <div className="card-body">
                            <p className="card-text">Please wait.</p>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default AccountPage;