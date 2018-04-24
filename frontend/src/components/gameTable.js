import React, { Component } from 'react';
import $ from 'jquery';

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
        for(let i = 0; i < 10; i++) {
            table[i] = [];
            for(let j = 0; j < 10; j++) {
                table[i][j] = 10*i+j;
            }
        }
        return (
            <div id={name}>
                {table.map(function(row, i) {
                    return (
                        <div className="row" key={i}>
                        {row.map(function(cell, j) {
                            return (
                                <div className="card fieldCell" data-x={i} data-y={j} key={10*i+j}></div>
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