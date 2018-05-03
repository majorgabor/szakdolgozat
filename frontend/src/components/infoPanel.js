import React, { Component } from 'react';

class InfoPanel extends Component {

    render() {
        const { name, text} = this.props;
        return (
            <div id={name} className="alert alert-primary alert-dismissible fade show">
                { !!text && <div id={name+'-text'}>
                    {text}
                </div> }
                <div id={name+'-timer'}></div>
            </div>
        );
    }
}

export default InfoPanel;