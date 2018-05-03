import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { fetchAjax } from '../actions/fetchAjax.js';

import NavBar from '../components/navBar.js';
import Form from '../components/form.js';
import Loading from '../components/loading.js';
import Modal from '../components/modal.js';

import ServerURL from '../constants/serverUrl.js';
import PageURL from '../constants/pageUrl.js';
import { sigupFormFields, signupFormCheckBoxs } from '../constants/signupFormInputs.js';

class SignupPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            error: null,
            responseCode: null,
        };
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
                });
            }
        };
    }

    componentDidMount() {
        fetchAjax(ServerURL.signup, 'GET', null, this.onAjaxSuccess());
    }

    render() {
        const { responseCode, isLoaded } = this.state;
        if (responseCode && (responseCode === 403 || responseCode === 405)) {
            return (
                <Redirect to={PageURL.index} />
            );
        }
        const navBarProps = {
            page: 'signup',
            user: null
        };
        const formProps = {
            fetchURL: ServerURL.signup,
            redirectURL: PageURL.login,
            title: 'SignUp',
            submitText: 'SigUp',
            fields: sigupFormFields,
            checkBoxs: signupFormCheckBoxs
        }
        const modalProps = {
            name: 'userTermsModal',
            title: 'User Terms And Conditions',
            body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem id ipsa itaque odio, iure nulla magnam dolore iste soluta repellat ex, explicabo ea tenetur eius assumenda consequatur. A, qui expedita.',
            footer: 'footer',
        };
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
                            <div className="jumbotron">
                                <Form {...formProps} />
                            </div>
                        </div>
                    </div>
                    <Modal {...modalProps}/>
                </div>
            );
        }
    }
}

export default SignupPage;