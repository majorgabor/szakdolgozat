import React, { Component } from 'react';

class InputCheckBox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            boxValue: this.props.initalBoxValue
        };

        this.handleChange = this.handleChange.bind(this);
    }

    onFocusOut() {
        this.props.changeCheckBoxValue(this.props.boxName, this.state.boxValue);
    }

    handleChange(event) {
        this.setState({
            boxValue: !this.state.boxValue
        });
    }

    render() {
        const { boxName, boxValue, boxText, error, link } = this.props;
        return (
            <div className="form-group row">
                <div className="offset-sm-3 col-sm-9">
                    <div className="checkbox">
                        <input
                            type="checkbox" 
                            id={boxName} 
                            name={boxName}
                            value={boxValue}
                            onChange={(event) => this.handleChange(event)}
                            onBlur={this.onFocusOut.bind(this)}/>
                        <label htmlFor={boxName}>
                            {boxText}
                            { link && <a href={link.href} data-toggle={link.modal.toggle} data-target={link.modal.target}>{' '+link.text}</a> }
                        </label>
                    </div>
                </div>
                { error && <span className="error control-label col-sm-9 offset-sm-3">{error}</span> }
            </div>
        );
    }
}

export default InputCheckBox;