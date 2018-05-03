import React from 'react';
import chai, { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ScorePanel from '../../components/scorePanel.js';

Enzyme.configure({ adapter: new Adapter() });
chai.use(chaiEnzyme());

describe('scorePanel.js', () => {

    describe('<ScorePanel />', () => {
        const props = {
            scoreBoardData: null,
        };

        it('renders ScorePanel table without data right', () => {
            const wrapper = shallow(<ScorePanel {...props} />);
            expect(wrapper.find('thead')).to.exist;
            expect(wrapper.find('tbody > tr')).to.not.exist;
        });

        it('renders ScorePanel table with data right', () => {
            const localProps = {
                ...props,
                scoreBoardData: [
                    {
                        username: null,
                        battles: null,
                        wins: null,
                        score: null,
                    }
                ],
            };
            const wrapper = shallow(<ScorePanel {...localProps} />);
            expect(wrapper.find('thead')).to.exist;
            expect(wrapper.find('tbody > tr').key()).to.equal('0');
        });

        it('renders ScorePanel table with more data right', () => {
            const localProps = {
                ...props,
                scoreBoardData: [
                    {username: null,battles: null,wins: null,score: null},
                    {username: null,battles: null,wins: null,score: null},
                    {username: null,battles: null,wins: null,score: null},
                    {username: null,battles: null,wins: null,score: null},
                    {username: null,battles: null,wins: null,score: null},
                    {username: null,battles: null,wins: null,score: null},
                ],
            };
            const wrapper = shallow(<ScorePanel {...localProps} />);
            expect(wrapper.find('thead')).to.exist;
            expect(wrapper.find('tbody > tr').at(5).key()).to.equal('5');
        })
    });
});