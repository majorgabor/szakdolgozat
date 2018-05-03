import React from 'react';
import chai, { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Carousel from '../../components/carousel.js';

Enzyme.configure({ adapter: new Adapter() });
chai.use(chaiEnzyme());

describe('carousel.js', () => {

    describe('<Carousel />', () => {
        const props = {
            carouselItems: null,
        };

        it('renders empty carousel right', () => {
            const wrapper = shallow(<Carousel {...props} />);
            expect(wrapper.find('#myCarousel')).to.exist;
            expect(wrapper.find('.carousel-indicators')).to.exist;
            expect(wrapper.find('.carousel-inner')).to.exist;
            expect(wrapper.find('.carousel-inner')).to.exist;
            expect(wrapper.find('.carousel-control-prev[data-slide="prev"]')).to.exist;
            expect(wrapper.find('.carousel-control-prev-icon')).to.exist;
            expect(wrapper.find('.carousel-control-next[data-slide="next"]')).to.exist;
            expect(wrapper.find('.carousel-control-next-icon')).to.exist;
        });

        it('renders carousel without links right', () => {
            const localProps = {
                carouselItems: [
                    {
                        active: true,
                        src: 'picture1.jpg',
                        alt: 'alt1',
                        title: 'title1',
                        subtitle: 'subtitle1',
                        links: null,
                    },
                    {
                        active: false,
                        src: 'picture2.jpg',
                        alt: 'alt2',
                        title: 'title2',
                        subtitle: 'subtitle2',
                        links: null
                    }
                ],
            };
            const wrapper = shallow(<Carousel {...localProps} />);
            expect(wrapper.find('li[data-target="#myCarousel"].active')).to.exist;
            expect(wrapper.find('li[data-target="#myCarousel"]').at(0).key()).to.equal('0');
            expect(wrapper.find('li[data-target="#myCarousel"]').at(1).key()).to.equal('1');
            expect(wrapper.find('.carousel-item.active')).to.exist;
            expect(wrapper.find('.carousel-item').at(0).key()).to.equal('0');
            expect(wrapper.find('.carousel-item').at(1).key()).to.equal('1');
            expect(wrapper.find('img[src="picture1.jpg"][alt="alt1"]')).to.exist;
            expect(wrapper.find('img[src="picture2.jpg"][alt="alt2"]')).to.exist;
            expect(wrapper.find('.carousel_background > h3').at(0).text()).to.equal('title1');
            expect(wrapper.find('.carousel_background > p').at(0).text()).to.equal('subtitle1');
            expect(wrapper.find('.carousel_background > h3').at(1).text()).to.equal('title2');
            expect(wrapper.find('.carousel_background > p').at(1).text()).to.equal('subtitle2');
        });

        it('renders carousel without links right', () => {
            const localProps = {
                carouselItems: [
                    {
                        active: true,
                        src: 'picture1.jpg',
                        alt: 'alt1',
                        title: 'title1',
                        subtitle: 'subtitle1',
                        links: [
                            {to: '/link1', title: 'tolink1'}
                        ]
                    },
                    {
                        active: false,
                        src: 'picture2.jpg',
                        alt: 'alt2',
                        title: 'title2',
                        subtitle: 'subtitle2',
                        links: [
                            {to: '/link2.1', title: 'tolink2.1'},
                            {to: '/link2.2', title: 'tolink2.2'}
                        ]
                    }
                ],
            };
            const wrapper = shallow(<Carousel {...localProps} />);
            expect(wrapper.find('Link.btn.btn-lg.btn-primary[to="/link1"][role="button"]').key()).to.equal('0.0');
            expect(wrapper.find('Link.btn.btn-lg.btn-primary[to="/link2.1"][role="button"]').key()).to.equal('1.0');
            expect(wrapper.find('Link.btn.btn-lg.btn-primary[to="/link2.2"][role="button"]').key()).to.equal('1.1');
        });
    });
});