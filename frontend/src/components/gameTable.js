import React, { Component } from 'react';
import $ from 'jquery';
import { classname } from '../actions/classname.js';
import { shipArray, enemyArea } from '../actions/gameLogic.js';

import Position from '../enums/position.js';

class GameTable extends Component {

    componentWillUnmount() {
        $(window).off();
        $('#myShips').off();
        $('#enemyArea').off();
    }
    
    componentDidMount() {
        const {name, isYouTurn, leftClick, rightClick, hoverInField} = this.props;
        let position = Position.horisontal;
        let thisX = 0;
        let thisY = 0;

        $('#myShips').find('.row').find('.fieldCell')
        .on('click', function() {
            leftClick(name, thisX, thisY, position);
        })
        .on('mouseenter', function() {
            thisX = parseInt(this.dataset.x);
            thisY = parseInt(this.dataset.y);
            hoverInField(name, thisX, thisY, position);
        })
        .on('mouseleave', function() {
            $('.fieldCell').removeClass('shipIsPlaceable');
            $('.fieldCell').removeClass('shipNotPlaceable');
        });

        $('#myShips')
        .on('mouseenter', function() {
            console.log('enter');
            $(window).keypress(function (e) {
                e.preventDefault();
                position = position ? Position.horisontal : Position.vertical;
                $('.fieldCell').removeClass('shipIsPlaceable');
                $('.fieldCell').removeClass('shipNotPlaceable');
                hoverInField(name, thisX, thisY, position);
            });
        })
        .on('mouseleave', function() {
            $(window).off();
        });

        if(isYouTurn) {
            $('#enemyArea').find('.row').find('.fieldCell')
            .on('click', function() {
                $('.fieldCell').removeClass('missileTargetSelected');
                $(this).addClass('missileTargetSelected');
                leftClick(name, parseInt(this.dataset.x), parseInt(this.dataset.y), null);
            })
            .on('mouseenter', function() {
                $(this).addClass('missileTarget');
            })
            .on('mouseleave', function() {
                $('.fieldCell').removeClass('missileTarget');
            });
        } else {
            $('#enemyArea').find('.row').find('.fieldCell').off();
        }
    }

    render() {
        const { name } = this.props;
        let table = [];
        return (
            <div id={name}>
                {shipArray.map(function(row, i) {
                    return (
                        <div className="row" key={i}>
                        {row.map(function(cell, j) {
                            return (
                                <div
                                    className={classname(
                                        'card fieldCell',
                                        name === 'myShips' && !!shipArray[i][j] && 'ship',
                                        name === 'myShips' && shipArray[i][j] === 'miss' && 'miss',
                                        name === 'myShips' && shipArray[i][j] === 'hit' && 'hit',
                                        name === 'enemyArea' && enemyArea[i][j] === 'miss' && 'miss',
                                        name === 'enemyArea' && (enemyArea[i][j] === 'hit' || enemyArea[i][j] === 'sank') && 'hit',
                                    )}
                                    data-x={i}
                                    data-y={j}
                                    key={10*i+j}>
                                </div>
                            );
                        })}
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default GameTable;