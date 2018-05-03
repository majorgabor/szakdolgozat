import React, { Component } from 'react';

class DataPanel extends Component {

    render() {
        const { data } = this.props;
        return (
                <table className="table">
                    <tbody>
                    { !! data && Object.keys(data).map(function(key, i) {
                        return (
                            <tr key={i}>
                                <th>{key}</th>
                                <td>{data[key]}</td>
                            </tr>
                        );
                    }) }
                </tbody>
            </table>
        );
    }
}

export default DataPanel;