import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { fetchAjax } from '../actions/fetchAjax.js';

import InputTextField from './inputTextField.js';
import InputCheckBox from './inputCheckBox';

class Form extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            success: null,
            error: {},
            message: null,
            redirect: false,
            values: {}
        };

        this.timeOut1;
        this.timeOut2;

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillUnmount() {
        clearTimeout(this.timeOut1);
        clearTimeout(this.timeOut2);
    }

    onAjaxSuccess() {
        return (response) => {
            const error = response.errors ? response.errors : {};
            this.setState({
                loading: false,
                success: response.success,
                error: error,
                message: response.message,
            });
            if (this.state.message) {
                this.timeOut1 = setTimeout(function () {
                    this.setState({
                        message: null,
                    });
                }.bind(this), 5000);
            }
            if (this.state.success) {
                this.timeOut2 = setTimeout(function () {
                    this.setState({
                        redirect: true,
                    });
                }.bind(this), 1000);
            }
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        clearTimeout(this.timeOut1);
        this.setState({
            loading: true,
        });
        fetchAjax(this.props.fetchURL, 'POST', JSON.stringify(this.state.values), this.onAjaxSuccess());
        if(!!this.props.triggerRefresh) {
            this.props.triggerRefresh();
        }
    }

    onChangeInputValue(field, newValue) {
        let values = this.state.values;
        values[field] = newValue;
        this.setState({
            values
        });
    }

    render() {
        const { title, submitText, fields, checkBoxs, redirectURL } = this.props;
        const { error, success, message, redirect } = this.state;
        const alertType = success ? 'success' : 'danger';
        return (
            <div>
                <h3>{title}</h3>
                <br />
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    { !!fields && fields.map(function (field, i) {
                        const errorMessage = error[field.fieldName] ? error[field.fieldName] : null;
                        return (
                            <InputTextField
                                key={i}
                                changeFieldValue={this.onChangeInputValue.bind(this)}
                                initalFieldValue={""}
                                error={errorMessage}
                                {...field} />
                        );
                    }, this) }
                    { !!checkBoxs && checkBoxs.map(function (checkbox, i) {
                        const errorMessage = error[checkbox.boxName] ? error[checkbox.boxName] : null;
                        return (
                            <InputCheckBox
                                key={i}
                                changeCheckBoxValue={this.onChangeInputValue.bind(this)}
                                error={errorMessage}
                                {...checkbox} />
                        );
                    }, this) }
                    <div className="form-group row">
                        <div className="offset-sm-3 col-sm-9">
                            <input type="submit" className="btn btn-dark" value={submitText} />
                        </div>
                    </div>
                </form>
                { !!message && <div className={"alert alert-" + alertType + " alert-dismissible"}>{message}</div> }
                { !!redirect && !!redirectURL && <Redirect to={redirectURL} /> }
            </div>
        );
    }
}

export default Form;