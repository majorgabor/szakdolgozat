import React, { Component } from 'react';

class ScorePanel extends Component {

    render() {
        const {scoreBoardData} = this.props;
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Battles</th>
                        <th>Wins</th>
                        <th>Scores</th>
                    </tr>
                </thead>
                <tbody>
                    {!!scoreBoardData && scoreBoardData.map(function(user, i) {
                        return (
                            <tr key={i}>
                                <th scope="row">{i+1+'.'}</th>
                                <td>{user.username}</td>
                                <td>{user.battles}</td>
                                <td>{user.wins}</td>
                                <td>{user.points}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }
}

export default ScorePanel;