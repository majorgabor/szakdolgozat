import React from 'react';
import chai, { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';

import InputCheckBox from '../../components/inputCheckBox.js';

Enzyme.configure({ adapter: new Adapter() });
chai.use(chaiEnzyme());

describe('inputCheckBox.js', () => {

    describe('<InputCheckBox />', () => {
        const props = {
            boxName: null,
            boxValue: null,
            boxText: null,
            error: null,
            link: null,
            changeCheckBoxValue: () => {},
        };

        it('renders checkbox right', () => {
            const localProps = {
                ...props,
                boxName: 'agree',
                boxValue: 'i agree',
                boxText: 'Do you agree?',
                
            };
            const wrapper = shallow(<InputCheckBox {...localProps} />);
            expect(wrapper.find('input#agree')).to.exist;
            expect(wrapper.find('input[type="checkbox"]')).to.exist;
            expect(wrapper.find('input[name="agree"]')).to.exist;
            expect(wrapper.find('input[value="i agree"]')).to.exist;
            expect(wrapper.find('label[htmlFor="agree"]').text()).to.equal('Do you agree?');
        });

        it('renders checkbox link right', () => {
            const localProps = {
                ...props,
                boxName: 'agree',
                link: {
                    href: 'www.link.domain',
                    modle: null,
                    text: 'link text'
                }
            };
            const wrapper = shallow(<InputCheckBox {...localProps} />);
            expect(wrapper.find('label[htmlFor="agree"] > a').html()).to.equal(
                '<a href="www.link.domain"> link text</a>'
            );
        });

        it('renders checkbox modal-link right', () => {
            const localProps = {
                ...props,
                boxName: 'agree',
                link: {
                    href: 'www.link.domain',
                    modal: {
                        toggle: 'modal',
                        target: '#myModal'
                    },
                    text: 'link text'
                }
            };
            const wrapper = shallow(<InputCheckBox {...localProps} />);
            expect(wrapper.find('label[htmlFor="agree"] > a').html()).to.equal(
                '<a href="www.link.domain" data-toggle="modal" data-target="#myModal"> link text</a>'
            );
        });

        it('renders error right', () => {
            let localProps = {
                ...props,
            };
            let wrapper = shallow(<InputCheckBox {...localProps} />);
            expect(wrapper.find('span.error')).to.not.exist;

            localProps = {
                ...props,
                error: 'error',
            };
            wrapper = shallow(<InputCheckBox {...localProps} />);
            expect(wrapper.find('span.error')).to.exist;
            expect(wrapper.find('span.error').text()).to.equal('error');
        });

        it('calls changeCheckBoxValue right', () => {
            const localProps = {
                ...props,
                changeCheckBoxValue: sinon.spy(),
            };
            const wrapper = shallow(<InputCheckBox {...localProps} />);
            wrapper.find('input').simulate('blur', {target: {value: 'new value'}});
            expect(localProps.changeCheckBoxValue.called).to.be.true;
        });
    });
});