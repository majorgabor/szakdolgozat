import React from 'react';
import chai, { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Modal from '../../components/modal.js';

Enzyme.configure({ adapter: new Adapter() });
chai.use(chaiEnzyme());

describe('midal.js', () => {

    describe('<Modal />', () => {
        const props = {
            name: null,
            title: null,
            body: null,
            footer: null,
        };

        it('render empty modal right', () => {
            const wrapper = shallow(<Modal {...props} />);
            expect(wrapper.find('div.modal')).to.exist;
            expect(wrapper.find('h5.modal-title').text()).to.equal('');
            expect(wrapper.find('div.modal-body').text()).to.equal('');
            expect(wrapper.find('div.modal-footer').text()).to.equal('');
        });
        
        it('render empty, but maned modal right', () => {
            const localProps = {
                ...props,
                name: 'myModal',
            };
            const wrapper = shallow(<Modal {...localProps} />);
            expect(wrapper.find('div#myModal')).to.exist;
            expect(wrapper.find('h5#myModal-title').text()).to.equal('');
            expect(wrapper.find('div#myModal-body').text()).to.equal('');
            expect(wrapper.find('div#myModal-footer').text()).to.equal('');
        });

        it('render fully filled modal right', () => {
            const localProps = {
                ...props,
                name: 'myModal',
                title: 'mytitle',
                body: 'mybody',
                footer: 'myfooter'
            };
            const wrapper = shallow(<Modal {...localProps} />);
            expect(wrapper.find('div#myModal')).to.exist;
            expect(wrapper.find('h5#myModal-title').text()).to.equal('mytitle');
            expect(wrapper.find('div#myModal-body').text()).to.equal('mybody');
            expect(wrapper.find('div#myModal-footer').text()).to.equal('myfooter');
        });
    });

});