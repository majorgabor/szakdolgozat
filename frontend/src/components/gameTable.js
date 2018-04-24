import React, { Component } from 'react';
import $ from 'jquery';
import classname from '../actions/classname.js';
import { shipArray } from '../actions/gameLogic.js';

class GameTable extends Component {

    componentDidMount() {
        const {name, leftClick, rightClick} = this.props;
        $('#'+name).find('.row').find('.card').on('click', function() {
            leftClick(name, parseInt(this.dataset.x), parseInt(this.dataset.y));
        }).on('contextmenu', function() {
            rightClick(name, parseInt(this.dataset.x), parseInt(this.dataset.y));
        });
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
                                <div className={classname('card fieldCell')} data-x={i} data-y={j} key={10*i+j}></div>
                            );
                        })}
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default GameTable;