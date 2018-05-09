import React from 'react';
import chai, { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';

import GameTable from '../../components/gameTable.js';
import { shipArray, enemyArea } from '../../actions/gameLogic.js';

Enzyme.configure({ adapter: new Adapter() });
chai.use(chaiEnzyme());

describe('index page', () => {
    
    describe('<GameTable />', () => {
        const props = {
            name: null,
            isYouTurn: false,
            leftClick: () => {},
            rightClick: () => {},
            hoverInField: () => {},
        }

        beforeAll(() => {
            shipArray[2][7] = 5;
            shipArray[4][2] = 'missed';
            shipArray[5][3] = 'hit';

            enemyArea[8][5] = 'missed';
            enemyArea[3][7] = 'hit';
            enemyArea[6][1] = 'sank';
        });

        afterAll(() => {
            shipArray[2][7] = null;
            shipArray[4][2] = null;
            shipArray[5][3] = null;

            enemyArea[8][5] = null;
            enemyArea[3][7] = null;
            enemyArea[6][1] = null;
        });

        it('renders game table right', () => {
            const wrapper = shallow(<GameTable {...props}/>);
            expect(wrapper.find('.fieldCell').at(0).key()).to.equal('0');
            expect(wrapper.find('.fieldCell').at(99).key()).to.equal('99');
            expect(wrapper.find('.fieldCell[data-x=2][data-y=7]').key()).to.equal('27');           
        });

        it('renders myShips field class right', () => {
            const localProps = {
                ...props,
                name: 'myShips',
            };
            shipArray[2][7] = 5;
            shipArray[4][2] = 'missed';
            shipArray[5][3] = 'hit';
            const wrapper = shallow(<GameTable {...localProps}/>);
            expect(wrapper.find('.ship[data-x=2][data-y=7]')).to.exist;
            expect(wrapper.find('.missed[data-x=4][data-y=2]')).to.exist;
            expect(wrapper.find('.hit[data-x=5][data-y=3]')).to.exist;
        });

        it('renders enemyArea field class right', () => {
            const localProps = {
                ...props,
                name: 'enemyArea',
            };
            
            const wrapper = shallow(<GameTable {...localProps}/>);
            expect(wrapper.find('.missed[data-x=8][data-y=5]')).to.exist;
            expect(wrapper.find('.hit[data-x=3][data-y=7]')).to.exist;
            expect(wrapper.find('.hit[data-x=6][data-y=1]')).to.exist;
        });
    });
});