import chai, { expect } from 'chai';

import { classname } from '../actions/classname.js';

describe('classname.js', () => {

    describe('classname()', () => {

        it('renturns empty string wthout input', () => {
            const result = classname();
            expect(result).to.equal('');
        });

        it('renturns the input string', () => {
            const result = classname('apple');
            expect(result).to.equal('apple');
        });

        it('renturns one string from multiple input string', () => {
            const result = classname('apple', 'peach', 'lemon', 'grape');
            expect(result).to.equal('apple peach lemon grape');
        });

        it('renturns without whitespace', () => {
            const result = classname('       apple       ');
            expect(result).to.equal('apple');
        });

        it('renturns one string from multiple input string', () => {
            const result = classname(' apple', '  peach  ', 'lemon   ', 'grape  ');
            expect(result).to.equal('apple peach lemon grape');
        });

        it('renturns classnames only if condition true', () => {
            const result = classname('apple', 'peach', false, 'grape');
            expect(result).to.equal('apple peach grape');
        });
    })
});