import React from 'react';
import chai, { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Adapter from 'enzyme-adapter-react-16';

import HorisontalPills from '../../components/horisontalPills.js';

Enzyme.configure({ adapter: new Adapter() });
chai.use(chaiEnzyme());

describe('HorisontalPills.js', () => {

    describe('<HorisontalPills />', () => {
        const props = {
            tabs: [],
        }
        
        it('renders empty pill right', () => {
            const wrapper = shallow(<HorisontalPills {...props} />);
            expect(wrapper.find('.card .nav-pills')).to.exist;
            expect(wrapper.find('.card .nav-pills a.nav-link')).to.not.exist;
            expect(wrapper.find('.card .tab-content')).to.exist;
            expect(wrapper.find('.card .tab-content div.tab-pane')).to.not.exist;
        });

        it('renders 1 pill right', () => {
            const localProps = {
                ...props,
                tabs: [
                    {
                        name: 'profile',
                        body: 'this is your profile',
                    }
                ],
            }
            const wrapper = shallow(<HorisontalPills {...localProps} />);
            expect(wrapper.find('.card .nav-pills')).to.exist;
            expect(wrapper.find('.card .nav-pills a.nav-link.active')).to.exist;
            expect(wrapper.find('.card .nav-pills a.nav-link.active').text()).to.equals('Profile');
            expect(wrapper.find('.card .tab-content')).to.exist;
            expect(wrapper.find('.card .tab-content div.tab-pane.active.show')).to.exist;
            expect(wrapper.find('.card .tab-content div.tab-pane.active.show').text()).to.equals('this is your profile');
        });

        it('renders more pills right', () => {
            const localProps = {
                ...props,
                tabs: [
                    {
                        name: 'pill1',
                        body: 'this is pill1',
                    },
                    {
                        name: 'pill2',
                        body: 'this is pill2',
                    },
                    {
                        name: 'pill3',
                        body: 'this is pill3',
                    }
                ],
            }
            const wrapper = shallow(<HorisontalPills {...localProps} />);
            expect(wrapper.find('.card .nav-pills')).to.exist;
            expect(wrapper.find('.card .nav-pills a.nav-link.active').at(0)).to.exist;
            expect(wrapper.find('.card .nav-pills a.nav-link').at(1)).to.exist;
            expect(wrapper.find('.card .nav-pills a.nav-link').at(2)).to.exist;            
            expect(wrapper.find('.card .tab-content')).to.exist;
            expect(wrapper.find('.card .tab-content div.tab-pane.active.show').at(0)).to.exist;            
            expect(wrapper.find('.card .tab-content div.tab-pane').at(1)).to.exist;
            expect(wrapper.find('.card .tab-content div.tab-pane').at(2)).to.exist;
        });
    });

});