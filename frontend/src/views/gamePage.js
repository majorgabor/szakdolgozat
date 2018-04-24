import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';
import { socket } from '../actions/wsclient.js';
import { counter, mainCounter } from '../actions/timer.js';
import { isPlacebal, markShip, resetTable, randomShips, validFire, markFiredMissle, shipArray, isShipSank, isGameOver } from '../actions/gameLogic.js';

import NavBar from '../components/navBar.js';
import GameTable from '../components/gameTable.js';
import InfoPanel from '../components/infoPanel.js';
import Modal from '../components/modal.js';

import PageStatus from '../enums/gamePageStatus.js';

class GamePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageStatus: PageStatus.placeShips,
            enemy: null,
            infoPanelText: null,
            infoCardText: null,
        };
        this.x = undefined;
        this.y = undefined;

        this.exit = this.exit.bind(this);
        this.onLeftClick = this.onLeftClick.bind(this);
        this.onFire = this.onFire.bind(this);
        this.ready = this.ready.bind(this);
    }
    
    componentDidMount() {
        $('#close-gameInfo').hide();//!!!
        $('#ready').prop("disabled", true);
        $('#reset').prop("disabled", true);
        socket.emit('getEnemyUsername', null);
        socket.on('enemyUsername', (data) =>{
            this.setState({
                enemy: data,
            });
        });
        socket.on('youTurn', (data) => {
            this.setState({
                infoPanelText: data,
            });
            setTimeout(function() {
                this.setState({
                    pageStatus: PageStatus.youTurn,
                });
            }.bind(this), 2000);
        });
        socket.on('youWait', (data) => {
            this.setState({
                pageStatus: PageStatus.enemyTurn,
                infoPanelText: data,
            });
        });
        socket.on('missleArrived', (data) => {
            const shipId = shipArray[data.x][data.y];
            let result = 'MISS';
            if(!!shipId) {
                result = 'HIT';
                shipArray[data.x][data.y] = null;
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
                pageStatus: PageStatus.enemyTurn,
                infoPanelText: (<p>Your enemy left the game.<br />Please wait.</p>),
            });
            setTimeout(function() {
                this.setState({
                    pageStatus: PageStatus.backToAccount,
                });
            }.bind(this), 2000);
        });
        socket.on('winnerIs', (data) => {
            this.setState({
                pageStatus: PageStatus.enemyTurn,
                infoPanelText: (<p>The Winner Is <strong>{data}</strong>.</p>),
            });
            setTimeout(function() {
                this.setState({
                    pageStatus: PageStatus.backToAccount,
                });
            }.bind(this), 5000);
        });
    }
    onLeftClick(field, x, y) {
        if (field === 'myShips') {
            if (isPlacebal(x, y, 'horisontal')) {
                markShip(x, y, 'horisontal');
            }
        } else if(field === 'enemyArea') {
            this.x = x;
            this.y = y;
        }
    }

    onRightCLick(field, x, y) {
        if (field === "myShips") {
            if (isPlacebal(x, y, 'vertical')) {
                markShip(x, y, 'vertical');
            }
        }
    }

    ready() {
        this.setState({
            pageStatus: PageStatus.waitForEnemyToPlaceShips,
        });
        socket.emit('shipsReady', null);
    }

    onFire() {
        let x = this.x;
        let y = this.y;
        if(validFire(x, y)) {
            markFiredMissle(x, y);
            socket.emit('fireMissle', {x, y},);
        } else {
            console.log('already fired!');
        }
    }

    exit() {
        socket.emit('userExit', null);
        this.setState({
            pageStatus: PageStatus.backToAccount,
        });
    }
    
    render() {
        const { username } = this.props;
        const { pageStatus, enemy, infoCardText, infoPanelText } = this.state;
        if(pageStatus === PageStatus.backToLogin) {
            return(
                <Redirect to="/login" />
            );
        }
        if(pageStatus === PageStatus.backToAccount) {
            return(
                <Redirect to="/account" />
            );
        }
        const navBarProps = {
            page: 'game',
            user: 'username',
        };
        const gameModalProps = {
            name: 'gameModal',
            title: 'Wait!',
            body: (<div id="gameModal-body">Waiting for enemy to place ships.</div>),
            footer: (<button onClick={this.exit} type="button" className="exitGame btn btn-danger">EXIT GAME</button>)
        };
        const exitModalProps = {
            name: 'exitModal',
            title: (<div id="exitModal-title">Enemy left the game.</div>),
            body: (<div id="exitModal-body">Your enemy left the game.</div>),
            footer: 'Please wait.',
        };
        //---------------
        const mainCard = (
            <div className="card offset-xl-3 col-xl-6 offset-lg-2 col-lg-8 offset-md-1 col-md-10">
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
                <GameTable name={"myShips"} leftClick={this.onLeftClick} rightClick={this.onRightCLick} />
                {pageStatus === PageStatus.placeShips && <div>
                    <div id="placeShipsButtons" className="container">
                        <div className="btn-group" id="myShipsButtons">
                            <button onClick={resetTable} id="reset" type="button" className="btn btn-primary">Reset Table</button>
                            <button onClick={this.ready} id="ready" type="button" className="btn btn-primary">Ready</button>
                            <button onClick={randomShips} id="random" type="button" className="btn btn-primary">Random</button>
                        </div>
                    </div>
                    <InfoPanel name="myShipsTimer" text={null} />
                </div>}
            </div>
        );
        const enemyAreaCard = (
            <div className="card-body">
                <h5 className="card-title">Enemy Area</h5>
                <GameTable name={"enemyArea"} leftClick={this.onLeftClick} />
                {pageStatus === PageStatus.youTurn && <div>
                    <div id="placeShipsButtons" className="container">
                        <button onClick={this.onFire} id="reset" type="button" className="btn btn-primary">Fire</button>
                    </div>
                    <InfoPanel name="enemyAreaTimer" text={null} />
                </div>}
            </div>
        );
        if(pageStatus === PageStatus.placeShips) {
            return (
                <div>
                    <NavBar {...navBarProps} />
                    { mainCard }
                    <div className="row">
                        <div className="card col-md-6">
                            { myShipsCard }
                        </div>
                        <div className="card col-md-6">
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
                        <div className="card col-md-6">
                            { myShipsCard }
                        </div>
                        <div className="card col-md-6">
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
                    { !!infoPanelText && <InfoPanel
                        name="gameInfo"
                        text={infoPanelText} /> }
                    <div className="row">
                        <div className="card col-md-6">
                            { myShipsCard }
                        </div>
                        <div className="card col-md-6">
                            { enemyAreaCard }
                        </div>
                    </div>
                </div>
            );
        }
        if(pageStatus === PageStatus.enemyTurn) {
            return (
                <div>
                    <NavBar {...navBarProps} />
                    { mainCard }
                    <InfoPanel
                        name="gameInfo"
                        text="Enemy turn. Please wait." />
                    <div className="row">
                        <div className="card col-md-6">
                            { myShipsCard }
                        </div>
                        <div className="card col-md-6">
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
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default GamePage;