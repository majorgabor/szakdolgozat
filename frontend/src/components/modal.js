import React, { Component } from 'react';

class Modal extends Component {

    render() {
        const { name, title, body, footer } = this.props;
        return (
            <div className="modal fade" id={name} tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 id={name+'-title'} className="modal-title">
                                {title}
                            </h5>
                            <button id={'close-'+name} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div id={name+'-body'} className="modal-body">
                            {body}
                        </div>
                        <div id={name+'-footer'} className="modal-footer">
                            {footer}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;