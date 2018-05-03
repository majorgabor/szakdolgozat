import React from 'react';
import chai, { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Adapter from 'enzyme-adapter-react-16';

import DataPanel from '../../components/dataPanel.js';

Enzyme.configure({ adapter: new Adapter() });
chai.use(chaiEnzyme());

describe('dataPanel.js', () => {

    describe('<DataPanel />', () => {
        const props = {
            data: null,
        };

        it('renders empty dataPanel right', () => {
            const wrapper = shallow(<DataPanel {...props} />);
            expect(wrapper.find('.table')).to.exist;
            expect(wrapper.find('tbody > tr')).to.not.exist;
        });

        it('renders dataPanel with data right', () => {
            const localProps = {
                ...props,
                data: {
                    first: 'firstValue',
                    second: 'secondValue',
                    third: 'thirdValue',
                }
            };
            const wrapper = shallow(<DataPanel {...localProps} />);
            expect(wrapper.find('.table')).to.exist;
            expect(wrapper.find('tbody > tr').at(0).find('th').text()).to.equal('first');
            expect(wrapper.find('tbody > tr').at(0).find('td').text()).to.equal('firstValue');
            expect(wrapper.find('tbody > tr').at(1).find('th').text()).to.equal('second');
            expect(wrapper.find('tbody > tr').at(1).find('td').text()).to.equal('secondValue');            
            expect(wrapper.find('tbody > tr').at(2).find('th').text()).to.equal('third');
            expect(wrapper.find('tbody > tr').at(2).find('td').text()).to.equal('thirdValue');            
        });
    });
});