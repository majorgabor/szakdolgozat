import React, { Component } from 'react';
import { fetchAjax } from '../actions/fetchAjax.js';

import NavBar from '../components/navBar.js';
import Articles from '../components/articles.js';
import Carousel from '../components/carousel.js';
import Loading from '../components/loading.js';

import { carouselItems } from '../constants/indexPageConstants.js';

class IndexPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            user: null,
        };
    }

    onAjaxSussecc() {
        return (response) =>  {
            this.setState({
                isLoaded: true,
                user: response.user
            });
        };
    }


    componentDidMount() {
        fetchAjax(
            'http://localhost:80/back-end/API/',
            {
                method: 'GET',
                credentials: 'include',
            },
            this.onAjaxSussecc()
        );
    }
    
    render() {
        const navBarProps = {
            page: 'index',
            user: this.state.user,
        };
        if(!this.state.isLoaded) {
            return (
                <Loading />
            );
        } else {
            return (
                <div>
                    <NavBar {...navBarProps} />
                    <Articles />
                    <Carousel carouselItems={carouselItems} /> 
                </div>
            );
        }
    }
}

export default IndexPage;