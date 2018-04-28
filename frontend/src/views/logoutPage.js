import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { fetchAjax } from '../actions/fetchAjax.js';

import Loading from '../components/loading.js';

import ServerURL from '../constants/serverUrl.js';
import PageURL from '../constants/pageUrl.js';

class LogoutPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            responseCode: null,
        };
    }

    onAjaxSuccess() {
        return (response) => {
            if(Number.isInteger(response)) {
                this.setState({
                    responseCode: response,
                });
            } else {
                this.setState({
                    isLoaded: true,
                });
            }
        }
    }

    componentDidMount() {
        fetchAjax(ServerURL.logout, 'GET', null, this.onAjaxSuccess());
    }

    render() {
        const { isLoaded, responseCode } = this.state;
        if(responseCode && (responseCode === 403 || responseCode === 405)) {
            return (
                <Redirect to={PageURL.index} />
            );
        }
        if(!isLoaded) {
            return (
                <Loading />
            );
        } else {
            return (
                <Redirect to={PageURL.login} />
            );
        }
    }
}

export default LogoutPage;