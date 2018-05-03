import React, { Component } from 'react';

import { classname } from '../actions/classname.js';

class VerticalPills extends Component {

    render() {
        const { tabs } = this.props;
        return (
            <div className="card offset-xl-2 col-xl-8 offset-lg-1 col-lg-10">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                { !!tabs && tabs.map(function(tab, i) {
                                    return (
                                        <a
                                            key={i}
                                            className={classname('nav-link', i === 0 && 'active')}
                                            id={'v-pills-'+tab.name+'-tab'}
                                            data-toggle="pill"
                                            href={'#v-pills-'+tab.name}
                                            role="tab"
                                            aria-controls={'v-pills-'+tab.name}
                                            aria-selected={''+ i === 0 }>
                                                {tab.name.charAt(0).toUpperCase() + tab.name.slice(1)}
                                        </a>
                                    );
                                }) }
                            </div>
                            <hr className="d-block d-md-none"/>
                        </div>
                        <div className="col-md-9">
                            <div className="tab-content" id="v-pills-tabContent">
                                { !!tabs && tabs.map(function(tab, i) {
                                    return (
                                        <div
                                            key={i}
                                            className={classname('tab-pane fade', i === 0 && 'show active')}
                                            id={'v-pills-'+tab.name}
                                            role="tabpanel"
                                            aria-labelledby={'v-pills-'+tab.name+'-tab'}>
                                                {tab.body}
                                        </div>                                        
                                    );
                                }) }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default VerticalPills;