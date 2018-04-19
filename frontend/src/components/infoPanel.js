import React, { Component } from 'react';

class InfoPanel extends Component {

    render() {
        return (
            <div className="alert alert-primary alert-dismissible fade show">
                <button type="button" className="close" data-dismiss="alert">&times;</button>
                {this.props.text}
            </div>
        );
    }
}

export default InfoPanel;