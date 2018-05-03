import React from 'react';
import chai, { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Adapter from 'enzyme-adapter-react-16';

import InfoPanel from '../../components/infoPanel.js';

Enzyme.configure({ adapter: new Adapter() });
chai.use(chaiEnzyme());

describe('infopanel.js', () => {

    describe('<InfoPanel />', () => {
        const props = {
            name: null,
            text: null,
        };

        it('renders text right', () => {
            const localProps = {
                ...props,
                name: 'myPanel',
                text: 'panelText',
            };
            const wrapper = shallow(<InfoPanel {...localProps} />);
            expect(wrapper.find('div#myPanel.alert')).to.exist;
            expect(wrapper.find('div#myPanel-text').text()).to.equal('panelText');
        });

        it('renders text right', () => {
            const localProps = {
                ...props,
                name: 'myPanel',                
            };
            const wrapper = shallow(<InfoPanel {...localProps} />);
            expect(wrapper.find('div#myPanel-timer')).to.exist;
            expect(wrapper.find('div#myPanel-timer').text()).to.equal('');
        });
    });
});