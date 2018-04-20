import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { fetchAjax } from '../actions/fetchAjax.js';

import Loading from '../components/loading.js';

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
        fetchAjax(
            'http://localhost:80/szakdolgozat/back-end/API/auth/logout/',
            {
                method: 'GET',
                credentials: 'include',
            },
            this.onAjaxSuccess()
        );
    }

    render() {
        const { isLoaded, responseCode } = this.state;
        if(responseCode && (responseCode === 403 || responseCode === 405)) {
            return (
                <Redirect to='/' />
            );
        }
        if(!this.state.isLoaded) {
            return (
                <Loading />
            );
        } else {
            return (
                <Redirect to='/login' />
            );
        }
    }
}

export default LogoutPage;