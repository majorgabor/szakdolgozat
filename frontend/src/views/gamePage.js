import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';
import { socket, shipsReady, fireMissle, userExit } from '../actions/wsclient.js';
import { isPlacebal, markShip, resetTable, randomShips, validFire, markFiredMissle } from '../actions/gameLogic.js';
import { jQuerys } from '../actions/gameLogic.js';

import NavBar from '../components/navBar.js';
import GameTable from '../components/gameTable.js';
import InfoPanel from '../components/infoPanel.js';
import Modal from '../components/modal.js';

class GamePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            enemy: null,
            exit: false,
        };
        this.x = undefined;
        this.y = undefined;

        this.exit = this.exit.bind(this);
        this.onLeftClick = this.onLeftClick.bind(this);
        this.onFire = this.onFire.bind(this);
    }
    
    componentDidMount() {
        $('.closeModal').hide();
        $('#gameModalButton').hide();
        $("#exitModalButton").hide();
        $('#close-gameInfo').hide();
        $('#close-myShipsTimer').hide();
        $('#ready').prop("disabled", true);
        $('#reset').prop("disabled", true);
        socket.emit('getEnemyUsername', null);
        socket.on('enemyUsername', (data) =>{
            this.setState({
                enemy: data,
            });
        });
        socket.on('enemyLeftGame', () => {
            $("#close-gameModal").click();
            $('#exitModalButton').click();
            $('.exitGame').hide();
            setTimeout(function() {
                $('#close-exitModal').click();
                this.setState({
                    exit: true,
                });
            }.bind(this), 2000);
        });
        socket.on('winnerIs', (data) => {
            $('#close-gameModal').click();
            $('#exitModalButton').click();
            $('#exitModal-title').text('Game Over!');
            $('#exitModal-body').html('<p>The Winner Is <strong>'+data+'</strong>.</p>');
            // $('#close-exitModal').click();
            setTimeout(function() {
                $('#close-exitModal').click();
                this.setState({
                    exit: true,
                });
            }.bind(this), 5000);
        });
    }
    onLeftClick(field, x, y) {
        if (field === 'myShips') {
            if (isPlacebal(x, y, 'horisontal')) {
                markShip(x, y, 'horisontal');
            }
        } else if(field === 'battlefield') {
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
        $('#myShipsButtons').hide();
        $('#myShipsTimer').hide();
        $('#close-myShipsTimer').click();
        $('#gameInfo-text').text('Waiting for enemy to place ships.');
        shipsReady();
    }

    onFire() {
        if(validFire(this.x, this.y)) {
            markFiredMissle(this.x, this.y);
            fireMissle(this.x, this.y);
        } else {
            console.log('already fired!');
        }
    }

    exit() {
        $("#close-gameModal").click();
        userExit();
        this.setState({
            exit: true,
        });
    }
    
    render() {
        const { username } = this.props;
        const { enemy, exit } = this.state;
        if(exit) {
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
        return (
            <div>
                <NavBar {...navBarProps} />
                <div className="card offset-xl-3 col-xl-6 offset-lg-2 col-lg-8 offset-md-1 col-md-10">
                    <div className="card-body">
                        <h5 className="card-title">{'Your enemy is '+enemy}</h5>
                        <p className="card-text">If you leav the game, your enemy wins.</p>
                        <button  onClick={this.exit} className="btn btn-primary">Exit Game</button>
                    </div>
                </div>
                <InfoPanel
                    name="gameInfo"
                    text="Place down your ships! Left click horisintal, right click vertical position. Start with 5 long ship." />
                <div className="row">
                    <div className="card col-md-6">
                        <div className="card-body">
                            <h5 className="card-title">Your Ships</h5>
                            <GameTable
                                name={"myShips"}
                                leftClick={this.onLeftClick}
                                rightClick={this.onRightCLick} />
                            <div id="placeShipsButtons" className="container">
                                <div className="btn-group" id="myShipsButtons">
                                    <button
                                        onClick={resetTable}
                                        id="reset"
                                        type="button"
                                        className="btn btn-primary">
                                            Reset Table
                                    </button>
                                    <button
                                        onClick={this.ready}
                                        id="ready"
                                        type="button"
                                        className="btn btn-primary"
                                        data-toggle="modal"
                                        data-target={"#"+gameModalProps.name}
                                        data-backdrop="static"
                                        data-keyboard="false">
                                            Ready
                                    </button>
                                    <button
                                        onClick={randomShips}
                                        id="random"
                                        type="button"
                                        className="btn btn-primary">
                                            Random
                                    </button>
                                </div>
                            </div>
                            <InfoPanel
                                name="myShipsTimer"
                                text={null} />
                        </div>
                    </div>
                    <div className="card col-md-6">
                        <div className="card-body">
                            <h5 className="card-title">Enemy Area</h5>
                            <GameTable
                                name={"battlefield"}
                                leftClick={this.onLeftClick}
                                rightClick={this.onRightCLick} />
                            <button
                                onClick={this.onFire}
                                className="btn btn-primary">
                                    Fire
                            </button>
                            <InfoPanel text={null} />
                        </div>
                    </div>
                </div>
                <button
                    id="gameModalButton"
                    type="button"
                    data-toggle="modal"
                    data-target={"#"+gameModalProps.name}
                    data-backdrop="static"
                    data-keyboard="false">
                </button>
                <Modal {...gameModalProps} />
                <button
                    id="exitModalButton"
                    type="button"
                    data-toggle="modal"
                    data-target={"#"+exitModalProps.name}
                    data-backdrop="static"
                    data-keyboard="false">
                </button>
                <Modal {...exitModalProps} />
            </div>
        );
    }
}

export default GamePage;