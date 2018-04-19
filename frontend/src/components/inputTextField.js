import React, { Component } from 'react';

class InputTextField extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fieldValue: props.initalFieldValue,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    onFocusOut() {
        this.props.changeFieldValue(this.props.fieldName, this.state.fieldValue);
    }

    handleChange(event) {
        this.setState({
            fieldValue: event.target.value,
        });
    }

    render() {
        const { fieldName, title, type, placeholder, error } = this.props;
        return (
            <div className="form-group row">
                <label className="control-label col-sm-3" htmlFor={fieldName}>{title+':'}</label>
                <div className="col-sm-9">
                    <input
                        type={type}
                        className="form-control"
                        id={fieldName}
                        placeholder={placeholder}
                        name={fieldName}
                        onChange={(event) => this.handleChange(event)}
                        onBlur={this.onFocusOut.bind(this)}
                        value={this.state.fieldValue}/>
                </div>
                { error && <span id="error" className="control-label col-sm-9 offset-sm-3">{error}</span> }
            </div>
        );
    }
}

export default InputTextField;