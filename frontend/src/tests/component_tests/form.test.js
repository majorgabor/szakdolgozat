import React from 'react';
import chai, { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';

import Form from '../../components/form.js';
import * as Ajax from '../../actions/fetchAjax.js';

Enzyme.configure({ adapter: new Adapter() });
chai.use(chaiEnzyme());

describe('form.js', () => {

    describe('<form />', () => {
        const props = {
            title: null,
            submitText: null,
            fields: null,
            checkBoxs: null,
            redirectURL: null,
            triggerRefresh: () => {},
        };

        beforeAll(() => {
            sinon.stub(Ajax, 'fetchAjax').withArgs().returns(true);
        });

        afterAll(() => {
            Ajax.fetchAjax.restore();
        })

        it('renders emtpy form right', () => {
            const localProps = {
                ...props,
                title: 'Form',
                submitText: "Submit",
            };
            const wrapper = shallow(<Form {...localProps} />);
            expect(wrapper.find('h3').text()).to.equal('Form');
            expect(wrapper.find('InputTextField')).to.not.exist;
            expect(wrapper.find('InputCheckBox')).to.not.exist;            
            expect(wrapper.find('input[type="submit"][value="Submit"]')).to.exist;
            expect(wrapper.find('.alert')).to.not.exist;
            expect(wrapper.find('Redirect')).to.not.exist;
        });

        it('renders only inputField form right', () => {
            const localProps = {
                ...props,
                title: 'Form',
                submitText: "Submit",
                fields: [
                    {
                        fieldName: 'firstname',
                        title: 'Firstname',
                        type: 'text',
                        placeholder: 'Enter Firstname',
                    },
                ],
            };
            const wrapper = shallow(<Form {...localProps} />);
            expect(wrapper.find('h3').text()).to.equal('Form');
            expect(wrapper.find('InputTextField')).to.exist;
            expect(wrapper.find('InputCheckBox')).to.not.exist;            
            expect(wrapper.find('input[type="submit"][value="Submit"]')).to.exist;
            expect(wrapper.find('.alert')).to.not.exist;
            expect(wrapper.find('Redirect')).to.not.exist;
        });

        it('renders only inputCheckBox form right', () => {
            const localProps = {
                ...props,
                title: 'Form',
                submitText: "Submit",
                checkBoxs: [
                    {
                        boxName: 'agree',
                        boxValue: true,
                        boxText: 'I accept',
                        link: {
                            href: '#',
                            modal: {
                                toggle: 'modal',
                                target: '#userTermsModal'
                            },
                            text: 'terms & conditions'
                        }
                    },
                ]
            };
            const wrapper = shallow(<Form {...localProps} />);
            expect(wrapper.find('h3').text()).to.equal('Form');
            expect(wrapper.find('InputTextField')).to.not.exist;
            expect(wrapper.find('InputCheckBox')).to.exist;            
            expect(wrapper.find('input[type="submit"][value="Submit"]')).to.exist;
            expect(wrapper.find('.alert')).to.not.exist;
            expect(wrapper.find('Redirect')).to.not.exist;
        });

        it('renders inputField and inputCheckBox form right', () => {
            const localProps = {
                ...props,
                title: 'Form',
                submitText: "Submit",
                fields: [
                    {
                        fieldName: 'firstname',
                        title: 'Firstname',
                        type: 'text',
                        placeholder: 'Enter Firstname',
                    },
                ],
                checkBoxs: [
                    {
                        boxName: 'agree',
                        boxValue: true,
                        boxText: 'I accept',
                        link: {
                            href: '#',
                            modal: {
                                toggle: 'modal',
                                target: '#userTermsModal'
                            },
                            text: 'terms & conditions'
                        }
                    },
                ]
            };
            const wrapper = shallow(<Form {...localProps} />);
            expect(wrapper.find('h3').text()).to.equal('Form');
            expect(wrapper.find('InputTextField')).to.exist;
            expect(wrapper.find('InputCheckBox')).to.exist;            
            expect(wrapper.find('input[type="submit"][value="Submit"]')).to.exist;
            expect(wrapper.find('.alert')).to.not.exist;
            expect(wrapper.find('Redirect')).to.not.exist;
        });

        it('calls triggerRefresh on submit', () => {
            const localProps = {
                ...props,
                title: 'Form',
                submitText: "Submit",
                triggerRefresh: sinon.spy(),
            };
            const wrapper = shallow(<Form {...localProps} />);
            wrapper.find('form').simulate('submit', new Event('submit'));
            expect(localProps.triggerRefresh.called).to.be.true;
        });
    })
});