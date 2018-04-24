import React, { Component } from 'react';

class HorisontalPills extends Component {

    render() {
        const { tabs } = this.props;
        return (
            <div className="card offset-xl-2 col-xl-8 offset-gl-1 col-gl-10">
                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    {tabs.map(function (tab, i) {
                        const className = i === 0 ? "nav-link active" : "nav-link";
                        return (
                            <li className="nav-item">
                                <a
                                    key={i}
                                    className={className}
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
                        const className = i === 0 ? "tab-pane fade show active" : "tab-pane fade";
                        return (
                            <div
                                key={i}
                                className={className}
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