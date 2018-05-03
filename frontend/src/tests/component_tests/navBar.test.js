import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import chai, { expect } from 'chai';
import Enzyme, { render } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavBar from '../../components/navBar.js';

Enzyme.configure({ adapter: new Adapter() });
chai.use(chaiEnzyme());

describe('navbar.js', () => {
    
    describe('<NavBar />', () => {
        const props = {
            page: null,
            user: null,
        };

        it('dosen\'t shows username when user not logged in', () => {
            const wrapper = render(
                <BrowserRouter>
                    <NavBar {...props} />
                </BrowserRouter>
            );
            expect(wrapper.find('#username')).to.not.exist;
            
        });

        it('shows username when user logged in', () => {
            const localProps = {
                ...props,
                user: 'logged_in_user',
            };
            const wrapper = render(
                <BrowserRouter>
                    <NavBar {...localProps} />
                </BrowserRouter>
            );
            expect(wrapper.find('#username')).to.exist;
        });
    })
})