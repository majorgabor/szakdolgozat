import React, { Component } from 'react';

import { classname } from '../actions/classname.js';

class HorisontalPills extends Component {

    render() {
        const { tabs } = this.props;
        return (
            <div className="card score-card offset-xl-2 col-xl-8 offset-lg-1 col-lg-10">
                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    {tabs.map(function (tab, i) {
                        return (
                            <li key={i} className="nav-item">
                                <a
                                    className={classname('nav-link', i === 0 && 'active')}
                                    id={'pills-' + tab.name + '-tab'}
                                    data-toggle='pill'
                                    href={'#pills-' + tab.name}
                                    role="tab"
                                    aria-controls={'pills-' + tab.name}
                                    aria-selected={'' + i === 0}>
                                        {tab.name.charAt(0).toUpperCase() + tab.name.slice(1)}
                                </a>
                            </li>
                        );
                    })}
                </ul>
                <div className="tab-content" id="pills-tabContent">
                    {tabs.map(function (tab, i) {
                        return (
                            <div
                                key={i}
                                className={classname('tab-pane fade', i === 0 && 'active show')}
                                id={'pills-' + tab.name}
                                role="tabpanel"
                                aria-labelledby={'pills-' + tab.name + '-tab'}>
                                    {tab.body}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default HorisontalPills;