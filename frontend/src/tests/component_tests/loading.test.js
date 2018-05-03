import React from 'react';
import chai, { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Loading from '../../components/loading.js';
import loading from '../../images/loading.gif';

Enzyme.configure({ adapter: new Adapter() });
chai.use(chaiEnzyme());

describe('loading.js', () => {

    describe('<Loading />', () => {

        it('renders right', () => {
        const wrapper = shallow(<Loading />);
        expect(wrapper.find('.loadingSpinner')).to.exist;
        expect(wrapper.find('.loadingSpinner').props().src).to.equal(loading);
        });
    });
});