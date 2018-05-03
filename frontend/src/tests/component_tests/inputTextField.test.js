import React from 'react';
import chai, { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';

import InputTextField from '../../components/inputTextField.js';

Enzyme.configure({ adapter: new Adapter() });
chai.use(chaiEnzyme());

describe('inputTextField.js', () => {

    describe('<InputTextField />', () => {
        const props = {
            fieldName: null,
            title: null,
            type: null,
            placeholder: null,
            initalFieldValue: null,
            error: null,
            changeFieldValue: () => {}
        };

        it('renders text field right', () => {
            const localProps = {
                ...props,
                fieldName: 'username',
                title: 'Username',
                type: 'text',
                placeholder: 'Enter username',
            };
            const wrapper = shallow(<InputTextField {...localProps} />);
            expect(wrapper.find('.form-group.row')).to.exist;
            expect(wrapper.find('label.control-label.col-sm-3').props().htmlFor).to.equal('username');
            expect(wrapper.find('label.control-label.col-sm-3').text()).to.equal('Username:');
            expect(wrapper.find('input#username')).to.exist;
            expect(wrapper.find('input[type="text"]')).to.exist;
            expect(wrapper.find('input[name="username"]')).to.exist;
            expect(wrapper.find('input[placeholder="Enter username"]')).to.exist;
        });

        it('renders password field right', () => {
            const localProps = {
                ...props,
                fieldName: 'password',
                title: 'Password',
                type: 'password',
                placeholder: 'Enter password',
            };
            const wrapper = shallow(<InputTextField {...localProps} />);
            expect(wrapper.find('.form-group.row')).to.exist;
            expect(wrapper.find('label.control-label.col-sm-3').props().htmlFor).to.equal('password');
            expect(wrapper.find('label.control-label.col-sm-3').text()).to.equal('Password:');
            expect(wrapper.find('input#password')).to.exist;
            expect(wrapper.find('input').props().type).to.equal('password');
            expect(wrapper.find('input').props().name).to.equal('password');
            expect(wrapper.find('input').props().placeholder).to.equal('Enter password');
        });

        it('shows error right', () => {
            let localProps = {
                ...props,
            };
            let wrapper = shallow(<InputTextField {...localProps} />);
            expect(wrapper.find('span.error')).to.not.exist;

            localProps = {
                ...props,
                error: 'error'
            };
            wrapper = shallow(<InputTextField {...localProps} />);
            expect(wrapper.find('span.error')).to.exist;
            expect(wrapper.find('span.error').text()).to.equal('error');
        });

        it('calls changeFieldValue on blur', () => {
            const localProps = {
                ...props,
                fieldName: 'username',
                changeFieldValue: sinon.spy(),
            }
            const wrapper = shallow(<InputTextField {...localProps} />);
            wrapper.find('input').simulate('blur', {target: {value: 'new value'}});
            expect(localProps.changeFieldValue.called).to.be.true;
            expect(localProps.changeFieldValue.calledWith('username')).to.be.true;
        });
    });
});