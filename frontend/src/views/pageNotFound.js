import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PageURL from  '../constants/pageUrl.js';

class PageNotFound extends Component {
    render() {
        return (
            <div>
                <h1>Opps! Are you lost?</h1>
                <h2>404 page not found</h2>
                <Link to={PageURL.index}>Back to main page</Link>
            </div>
        )
    }
}

export default PageNotFound;