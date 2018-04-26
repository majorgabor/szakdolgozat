import React from 'react';
import chai, { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import GameTable from '../components/gameTable.js';
chai.use(chaiEnzyme());
describe('index page', () => {
    it('renders', () => {
        const wrapper = shallow(<GameTable />);
        expect(wrapper.find('.fieldCell').at(0)).to.exist;
    });
});