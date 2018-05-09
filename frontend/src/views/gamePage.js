import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';
import { socket } from '../actions/wsclient.js';
import { fetchAjax } from '../actions/fetchAjax';
import { timer, mainTimerFunc } from '../actions/timer.js';
import { isPlacebal, markShip, shipIndicator, resetTable, randomShips, validFire, markFiredMissleResult, shipArray, isShipSank, isGameOver } from '../actions/gameLogic.js';

import NavBar from '../components/navBar.js';
import GameTable from '../components/gameTable.js';
import InfoPanel from '../components/infoPanel.js';

import PageStatus from '../enums/gamePageStatus.js';
import Position from '../enums/position.js';

import PageURL from '../constants/pageUrl.js';
import ServerURL from '../constants/serverUrl.js';

class GamePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageStatus: PageStatus.placeShips,
            myUsername: null,
            enemy: null,
            mainPanelText: null,
            myShipsPanelText: ' ',
            enemyAreaPanelText: null,
            infoCardText: null,
            youTurn: false,
        };
        this.x = -1;
        this.y = -1;

        resetTable();

        this.exit = this.exit.bind(this);
        this.onLeftClick = this.onLeftClick.bind(this);
        this.onFire = this.onFire.bind(this);
        this.ready = this.ready.bind(this);
        this.backToAccountFunc = this.backToAccountFunc.bind(this);
    }

    componentWillUnmount() {
        socket.removeAllListeners();
        clearTimeout(timer);      
    }
    
    componentDidMount() {
        $('#ready').prop("disabled", true);
        $('#reset').prop("disabled", true);
        if(!this.state.enemy) {
            $('#mobileButton').show();
            socket.emit('getUsernames', null);
            socket.on('gotUsernames', (me, enemy) =>{
                this.setState({
                    myUsername: me,
                    enemy: enemy,
                });
            });
            mainTimerFunc(45, 'myShipsPanel-timer', () => {
                this.exit();
            });
        }
        socket.on('backToAccount', () => {
            this.backToAccountFunc();
        });
        socket.on('youTurn', (result) => {
            this.setState({
                myShipsPanelText: !!result ? 'The enemy '+result+' your ship.' : null,
                enemyAreaPanelText: ' ',
                youTurn: true,
                pageStatus: PageStatus.youTurn,
            });
            // mainTimerFunc(15, 'enemyAreaPanel-timer', () => {
            //     this.exit();
            // });
            $('#fire').prop('disabled', true);
        });
        socket.on('youWait', (result) => {
            if(!!result) {
                markFiredMissleResult(this.x, this.y, result);
            }
            this.setState({
                enemyAreaPanelText: !!result ? 'You '+result+' the enemy ship.' : null,
                youTurn: false,
                pageStatus: PageStatus.enemyTurn,
            });
        });
        socket.on('missleArrived', (x, y) => {
            const shipId = shipArray[x][y];
            let result = 'MISSED';
            shipArray[x][y] = 'missed';
            if(!!shipId) {
                result = 'HIT';
                shipArray[x][y] = 'hit';
                if(isShipSank(shipId)) {
                    result = 'SANK';
                    if(isGameOver()) {
                        socket.emit('gameOver', null);
                        return;
                    }
                }
            }
            socket.emit('missleArrivedResult', result);
        });
        socket.on('enemyLeftGame', () => {
            this.setState({
                infoCardText: (<p>Your enemy left the game.</p>),
                pageStatus: PageStatus.showInfo,
            });
        });
        socket.on('winnerIs', (data) => {
            $('#bactToAccount').prop('disabled', true);
            
            data !== this.state.enemy ? fetchAjax(ServerURL.gameover, 'POST', JSON.stringify({isWin: true}), this.onAjaxSuccess()) :
                                        fetchAjax(ServerURL.gameover, 'POST', JSON.stringify({isWin: false}), this.onAjaxSuccess());

            this.setState({
                infoCardText: (<p>The Winner Is <strong>{data}</strong>.</p>),
                pageStatus: PageStatus.showInfo,
            });
        });
    }

    onAjaxSuccess() {
        return() => {
            $('#bactToAccount').prop('disabled', false);
        }
    };

    onLeftClick(field, x, y, position) {
        if (field === 'myShips') {
            if (isPlacebal(x, y, position)) {
                markShip(x, y, position);
            }
        } else if(this.state.youTurn && field === 'enemyArea') {
            if(validFire(x, y)) {
                $('#fire').prop('disabled', false);
                if(this.x !== x || this.y !== y) {
                    this.x = x;
                    this.y = y;
                }
            } else {
                $('#fire').prop('disabled', true);
                $('.fieldCell').removeClass('missileTargetSelected');
                console.log('already fired!');
            }
        }
    }

    hoverInField(field, x, y, orientation) {
        if (field === "myShips") {
            shipIndicator(x, y, orientation, isPlacebal(x, y, orientation));
        }
    }

    ready() {
        $('#mobileButton').hide();
        clearTimeout(timer);
        socket.emit('shipsReady', null);
        this.setState({
            myShipsPanelText: null,
            pageStatus: PageStatus.waitForEnemyToPlaceShips,
        });
    }

    onFire() {
        clearTimeout(timer);
        socket.emit('fireMissle', this.x, this.y);
        $('#enemyAreaPanel-timer').text('');
        $('.fieldCell').removeClass('missileTargetSelected');
    }

    exit() {
        socket.emit('userExit', null);
        this.backToAccountFunc();
    }

    backToAccountFunc() {
        this.setState({
            enemy: null,
            pageStatus: PageStatus.backToAccount,
        });
    }
    
    render() {
        const { pageStatus, myUsername, enemy, infoCardText, mainPanelText, myShipsPanelText, enemyAreaPanelText, youTurn } = this.state;
        if(pageStatus === PageStatus.backToLogin) {
            return(
                <Redirect to={PageURL.login} />
            );
        }
        if(pageStatus === PageStatus.backToAccount) {
            return(
                <Redirect to={PageURL.account} />
            );
        }
        const navBarProps = {
            page: 'game',
            user: myUsername,
        };
        const mainCard = (
            <div className="card offset-xl-2 col-xl-8">
                <div className="card-body">
                    <h5 className="card-title">{'Your enemy is '+enemy}</h5>
                    <p className="card-text">If you leave the game, your enemy wins.</p>
                    <button  onClick={this.exit} className="btn btn-primary">Exit Game</button>
                </div>
            </div>
        );
        const myShipsCard = (
            <div className="card-body">
                <h5 className="card-title">Your Ships</h5>
                <GameTable name={"myShips"} leftClick={this.onLeftClick} hoverInField={this.hoverInField} isYouTurn={youTurn}/>
                {pageStatus === PageStatus.placeShips &&
                    <div id="placeShipsButtons" className="container">
                        <div className="btn-group" id="myShipsButtons">
                            <button onClick={resetTable} id="reset" type="button" className="btn btn-primary">Reset Table</button>
                            <button onClick={this.ready} id="ready" type="button" className="btn btn-primary">Ready</button>
                            <button onClick={randomShips} id="random" type="button" className="btn btn-primary">Random</button>
                        </div>
                    </div>}
                { !!myShipsPanelText && <InfoPanel name="myShipsPanel" text={myShipsPanelText} /> }
            </div>
        );
        const enemyAreaCard = (
            <div className="card-body">
                <h5 className="card-title">Enemy Area</h5>
                <GameTable name={"enemyArea"} leftClick={this.onLeftClick} hoverInField={this.hoverInField} isYouTurn={youTurn}/>
                {pageStatus === PageStatus.youTurn &&
                    <div id="placeShipsButtons" className="container">
                        <button onClick={this.onFire} id="fire" type="button" className="btn btn-primary">Fire</button>
                    </div>}
                { !!enemyAreaPanelText && <InfoPanel name="enemyAreaPanel" text={enemyAreaPanelText} /> }
            </div>
        );
        if(pageStatus === PageStatus.placeShips) {
            return (
                <div>
                    <NavBar {...navBarProps} />
                    { mainCard }
                    <div className="row">
                        <div className="card col-xl-6">
                            { myShipsCard }
                        </div>
                        <div className="card col-xl-6">
                            <div className="card-body">
                                <h5 className="card-title">Place Your Ships!</h5>
                                <p>Rules...</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        if(pageStatus === PageStatus.waitForEnemyToPlaceShips) {
            return (
                <div>
                    <NavBar {...navBarProps} />
                    { mainCard }
                    <div className="row">
                        <div className="card col-xl-6">
                            { myShipsCard }
                        </div>
                        <div className="card col-xl-6">
                            <div className="card-body">
                                <h5 className="card-title">Waiting for enemy.</h5>
                                <p>Please wait while the enemy player place the ships.</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        if(pageStatus === PageStatus.youTurn) {
            return (
                <div>
                    <NavBar {...navBarProps} />
                    { mainCard }
                    <InfoPanel
                        name="mainPanel"
                        text="You turn. Fire a missile on the Enemy Area." />
                    <div className="row">
                        <div className="card col-xl-6">
                            { myShipsCard }
                        </div>
                        <div className="card col-xl-6">
                            { enemyAreaCard }
                        </div>
                    </div>
                </div>
            );
        }
        if(pageStatus === PageStatus.enemyTurn) {
            return (
                <div>
                    <div></div>
                    <NavBar {...navBarProps} />
                    { mainCard }
                    <InfoPanel
                        name="mainPanel"
                        text="Enemy turn. Please wait." />
                    <div className="row">
                        <div className="card col-xl-6">
                            { myShipsCard }
                        </div>
                        <div className="card col-xl-6">
                            { enemyAreaCard }
                        </div>
                    </div>
                </div>
            );
        }
        if(pageStatus === PageStatus.showInfo) {
            return (
                <div>
                    <NavBar {...navBarProps} />
                    <div className="row">
                        <div className="card offset-md-3 col-md-6">
                            <div className="card-body">
                                <h5 className="card-title">Game Over!</h5>
                                { infoCardText }
                                <button onClick={this.backToAccountFunc} id="bactToAccount" type="button" className="btn btn-primary">Back To Account</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default GamePage;