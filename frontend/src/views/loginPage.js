import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { fetchAjax } from '../actions/fetchAjax.js';

import NavBar from '../components/navBar.js';
import InfoPanel from '../components/infoPanel.js';
import Form from '../components/form.js';
import Loading from '../components/loading.js';

import ServerURL from '../constants/serverUrl.js';
import PageURL from '../constants/pageUrl.js';
import { loginFormFields, loginFormCheckBoxs } from '../constants/loginFormInputs.js';

class LoginPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            error: null,
            message: null,
            responseCode: null,
        }
    }

    onAjaxSuccess() {
        return (response) => {
            if (Number.isInteger(response)) {
                this.setState({
                    responseCode: response,
                });
            } else {
                this.setState({
                    isLoaded: true,
                    message: response.message,
                });
            }
        };
    }

    componentDidMount() {
        fetchAjax(ServerURL.login, 'GET', null, this.onAjaxSuccess());
    }

    render() {
        const { isLoaded, message, responseCode } = this.state;
        if (responseCode && (responseCode === 403 || responseCode === 405)) {
            return (
                <Redirect to='/' />
            );
        }
        const navBarProps = {
            page: 'login',
            user: null,
        };
        const formProps = {
            fetchURL: ServerURL.login,
            redirectURL: PageURL.account,
            title: 'LogIn',
            submitText: 'LogIn',
            fields: loginFormFields,
            checkBoxs: loginFormCheckBoxs,
        }
        if (!isLoaded) {
            return (
                <Loading />
            );
        } else {
            return (
                <div>
                    <NavBar {...navBarProps} />
                    <div id="first_row" className="row">
                        <div id="grid_style" className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8 offset-md-1 col-md-10 col-sm-12 col-12">
                            {message && <InfoPanel text={message} isCloseable={true} />}
                            <div className="jumbotron">
                                <Form {...formProps} />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default LoginPage;