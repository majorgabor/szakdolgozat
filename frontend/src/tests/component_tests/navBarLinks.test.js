import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import chai, { expect } from 'chai';
import Enzyme, { render } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavBarLinks from '../../components/navBarLinks.js';

Enzyme.configure({ adapter: new Adapter() });
chai.use(chaiEnzyme());

describe('navBarLinks.js', () => {

    describe('<NavBarLinks />', () => {
        const props = {
            page: null,
            loggedin: null,
        };

        it('shows links on index page right', () => {
            let localProps = {
                ...props,
                page: 'index',
            };
            let wrapper = render(
                <BrowserRouter>
                    <NavBarLinks {...localProps} />
                </BrowserRouter>
            );
            expect(wrapper.find('span[title="login"]')).to.exist;
            expect(wrapper.find('span[title="logout"]')).to.not.exist;
            expect(wrapper.find('span[title="signup"]')).to.exist;
            expect(wrapper.find('span[title="account"]')).to.not.exist;
            expect(wrapper.find('span[title="scoreboard"]')).to.exist;

            localProps = {
                ...props,
                page: 'index',
                loggedin: 'user_logged_in',
            };
            wrapper = render(
                <BrowserRouter>
                    <NavBarLinks {...localProps} />
                </BrowserRouter>
            );
            expect(wrapper.find('span[title="login"]')).to.not.exist;
            expect(wrapper.find('span[title="logout"]')).to.exist;
            expect(wrapper.find('span[title="signup"]')).to.not.exist;
            expect(wrapper.find('span[title="account"]')).to.exist;
            expect(wrapper.find('span[title="scoreboard"]')).to.exist;
        });

        it('shows links on login page right', () => {
            const localProps = {
                ...props,
                page: 'login',
            };
            const wrapper = render(
                <BrowserRouter>
                    <NavBarLinks {...localProps} />
                </BrowserRouter>
            );
            expect(wrapper.find('span[title="login"]')).to.not.exist;
            expect(wrapper.find('span[title="logout"]')).to.not.exist;
            expect(wrapper.find('span[title="signup"]')).to.exist;
            expect(wrapper.find('span[title="account"]')).to.not.exist;
            expect(wrapper.find('span[title="scoreboard"]')).to.exist;
        });

        it('shows links on signup page right', () => {
            const localProps = {
                ...props,
                page: 'signup',
            };
            const wrapper = render(
                <BrowserRouter>
                    <NavBarLinks {...localProps} />
                </BrowserRouter>
            );
            expect(wrapper.find('span[title="login"]')).to.exist;
            expect(wrapper.find('span[title="logout"]')).to.not.exist;
            expect(wrapper.find('span[title="signup"]')).to.not.exist;
            expect(wrapper.find('span[title="account"]')).to.not.exist;
            expect(wrapper.find('span[title="scoreboard"]')).to.exist;
        });

        it('shows links on account page right', () => {
            const localProps = {
                ...props,
                page: 'account',
                loggedin: 'logged_in_user',
            };
            const wrapper = render(
                <BrowserRouter>
                    <NavBarLinks {...localProps} />
                </BrowserRouter>
            );
            expect(wrapper.find('span[title="login"]')).to.not.exist;
            expect(wrapper.find('span[title="logout"]')).to.exist;
            expect(wrapper.find('span[title="signup"]')).to.not.exist;
            expect(wrapper.find('span[title="account"]')).to.not.exist;
            expect(wrapper.find('span[title="scoreboard"]')).to.exist;
        });

        it('shows links on scoreboard page right', () => {
            let localProps = {
                ...props,
                page: 'scoreboard',
            };
            let wrapper = render(
                <BrowserRouter>
                    <NavBarLinks {...localProps} />
                </BrowserRouter>
            );
            expect(wrapper.find('span[title="login"]')).to.exist;
            expect(wrapper.find('span[title="logout"]')).to.not.exist;
            expect(wrapper.find('span[title="signup"]')).to.exist;
            expect(wrapper.find('span[title="account"]')).to.not.exist;
            expect(wrapper.find('span[title="scoreboard"]')).to.not.exist;

            localProps = {
                ...props,
                page: 'scoreboard',
                loggedin: 'logged_in_user',
            };
            wrapper = render(
                <BrowserRouter>
                    <NavBarLinks {...localProps} />
                </BrowserRouter>
            );
            expect(wrapper.find('span[title="login"]')).to.not.exist;
            expect(wrapper.find('span[title="logout"]')).to.exist;
            expect(wrapper.find('span[title="signup"]')).to.not.exist;
            expect(wrapper.find('span[title="account"]')).to.exist;
            expect(wrapper.find('span[title="scoreboard"]')).to.not.exist;
        });
    });
});
