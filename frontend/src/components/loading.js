import React, { Component } from 'react';
import loading from '../images/loading.gif';

class Loading extends Component {
    render() {
        return (
             <div>
                <img className = "loadingSpinner" src={loading}  alt='' style={{transform: 'scaleX(-1)'}}/>
             </div>
        );
    }
}

export default Loading;