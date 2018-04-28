import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../constants/indexPageConstants';

class Articles extends Component {
    render() {
        return (
            <div id="articles" className="row">
                <div className="article offset-lg-1 col-lg-3 col-md-4">
                    <img className="rounded-circle" src={articles[0].src} alt={articles[0].alt} width="140" height="140" />
                    <h2>{articles[0].title}</h2>
                    <p>{articles[0].text}</p>
                    <p><Link className="btn btn-primary" to={articles[0].to} role="button">{articles[0].link} &raquo;</Link></p>
                </div>
                <div className="article col-lg-4 col-md-4">
                    <img className="rounded-circle" src={articles[1].src} alt={articles[1].alt} width="140" height="140" />
                    <h2>{articles[1].title}</h2>
                    <p>{articles[1].text}</p>
                    <p><Link className="btn btn-primary" to={articles[1].to} role="button">{articles[1].link} &raquo;</Link></p>
                </div>
                <div className="article col-lg-3 col-md-4">
                    <img className="rounded-circle" src={articles[2].src} alt={articles[2].alt} width="140" height="140" />
                    <h2>{articles[2].title}</h2>
                    <p>{articles[2].text}</p>
                    <p><Link className="btn btn-primary" to={articles[2].to} role="button">{articles[2].link} &raquo;</Link></p>
                </div>
            </div>
        );
    }
}

export default Articles;