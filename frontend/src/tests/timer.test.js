import chai, { expect } from 'chai';
import sinon from 'sinon';

import * as $ from 'jquery';

import { mainTimerFunc } from '../actions/timer.js';

describe('timer.js', () => {

    describe('mainTimerFunc()', () => {
        let clock;
        let callback;

        beforeEach(() => {
            clock = sinon.useFakeTimers();
            callback = sinon.spy();
        });

        afterEach(() => {
            clock.restore();
            callback = null;
        });

        it('works perfectly', () => {
            mainTimerFunc(10, 'apple', callback);
            clock.tick(9999);
            expect(callback.called).to.be.false;
            clock.tick(1);
            expect(callback.called).to.be.true;
        });
    });
});