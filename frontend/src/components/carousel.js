import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { classname } from '../actions/classname.js';

class Carousel extends Component {
    render() {
        const { carouselItems } = this.props;
        return (
            <div className="d-none d-md-block">
                <div id="myCarousel" className="carousel slide" data-ride="carousel"> 
                    <ul className="carousel-indicators">
                        { !!carouselItems && carouselItems.map(function(items, i) {
                            return (
                                <li key={i} data-target="#myCarousel" data-slide-to={i} className={ classname(i === 0 && "active")}></li>
                            );
                        }) }
                    </ul>
                    <div className="carousel-inner">
                        { !!carouselItems && carouselItems.map(function(item, i) {
                            return (
                                <div key={i} className={classname('carousel-item', item.active && 'active')}>
                                    <img src={item.src} alt={item.alt} />
                                    <div className="carousel-caption">
                                        <div className="carousel_background">
                                            <h3>{item.title}</h3>
                                            <p>{item.subtitle}</p>
                                            { !! item.links && item.links.map(function(link,j) {
                                                return (
                                                    <Link key={i+'.'+j} className="btn btn-lg btn-primary" to={link.to} role="button">{link.title}</Link>
                                                );
                                            }) } 
                                        </div>
                                    </div>
                                </div>
                            );
                        }) }
                    </div>
                    <a className="carousel-control-prev" href="#myCarousel" data-slide="prev">
                        <span className="carousel-control-prev-icon"></span>
                    </a>
                    <a className="carousel-control-next" href="#myCarousel" data-slide="next">
                        <span className="carousel-control-next-icon"></span>
                    </a>
                </div>
            </div>
        );
    }
}

export default Carousel;