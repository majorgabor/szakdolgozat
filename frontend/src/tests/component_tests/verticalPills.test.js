import React from 'react';
import chai, { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Adapter from 'enzyme-adapter-react-16';

import VerticalPills from '../../components/verticalPills.js';

Enzyme.configure({ adapter: new Adapter() });
chai.use(chaiEnzyme());

describe('verticalPills.js', () => {

    describe('<VerticalPills />', () => {
        const props = {
            tabs: [],
        }
        
        it('renders empty pill right', () => {
            const wrapper = shallow(<VerticalPills {...props} />);
            expect(wrapper.find('.card .col-md-3')).to.exist;
            expect(wrapper.find('.card .col-md-3 a.nav-link')).to.not.exist;
            expect(wrapper.find('.card .col-md-9')).to.exist;
            expect(wrapper.find('.card .col-md-9 div.tab-pane')).to.not.exist;
        });

        it('renders 1 pill right', () => {
            const localProps = {
                tabs: [
                    {
                        name: 'profile',
                        body: 'this is your profile',
                    }
                ],
            }
            const wrapper = shallow(<VerticalPills {...localProps} />);
            expect(wrapper.find('.card .col-md-3')).to.exist;
            expect(wrapper.find('.card .col-md-3 a.nav-link.active')).to.exist;
            expect(wrapper.find('.card .col-md-3 a.nav-link.active').text()).to.equals('Profile');
            expect(wrapper.find('.card .col-md-9')).to.exist;
            expect(wrapper.find('.card .col-md-9 div.tab-pane.active.show')).to.exist;
            expect(wrapper.find('.card .col-md-9 div.tab-pane.active.show').text()).to.equals('this is your profile');
        });

        it('renders more pills right', () => {
            const localProps = {
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
            const wrapper = shallow(<VerticalPills {...localProps} />);
            expect(wrapper.find('.card .col-md-3')).to.exist;
            expect(wrapper.find('.card .col-md-3 a.nav-link.active').at(0)).to.exist;
            expect(wrapper.find('.card .col-md-3 a.nav-link').at(1)).to.exist;
            expect(wrapper.find('.card .col-md-3 a.nav-link').at(2)).to.exist;            
            expect(wrapper.find('.card .col-md-9')).to.exist;
            expect(wrapper.find('.card .col-md-9 div.tab-pane.active.show').at(0)).to.exist;            
            expect(wrapper.find('.card .col-md-9 div.tab-pane').at(1)).to.exist;
            expect(wrapper.find('.card .col-md-9 div.tab-pane').at(2)).to.exist;
        });
    });

});