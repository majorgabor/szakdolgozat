import React, { Component } from 'react';
import { fetchAjax } from '../actions/fetchAjax.js';

import NavBar from '../components/navBar.js';
import Articles from '../components/articles.js';
import Carousel from '../components/carousel.js';
import Loading from '../components/loading.js';

import ServerURL from '../constants/serverUrl.js';
import { carouselItems, articles } from '../constants/indexPageConstants.js';

class IndexPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            user: null,
        };
    }

    onAjaxSuccess() {
        return (response) =>  {
            this.setState({
                isLoaded: true,
                username: response.user
            });
        };
    }


    componentDidMount() {
        fetchAjax(ServerURL.index, 'GET', null, this.onAjaxSuccess());
    }
    
    render() {
        const { isLoaded, username } = this.state;
        const navBarProps = {
            page: 'index',
            user: username,
        };
        if(!isLoaded) {
            return (
                <Loading />
            );
        } else {
            return (
                <div>
                    <NavBar {...navBarProps} />
                    <Articles articles={articles} />
                    <Carousel carouselItems={carouselItems} /> 
                </div>
            );
        }
    }
}

export default IndexPage;