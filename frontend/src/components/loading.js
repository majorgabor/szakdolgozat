import React, { Component } from 'react';
import loading from '../images/loading.gif';

class Loading extends Component {
    render() {
        return (
             <div className="loadingPinnerContainer">
                <img className = "loadingSpinner" src={loading}  alt=''/>
             </div>
        );
    }
}

export default Loading;