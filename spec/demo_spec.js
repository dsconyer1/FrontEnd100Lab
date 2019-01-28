import { notAllowE } from '../src/daryl';
import { add } from './utils';
describe('some things', () => {
    it('should behave...', () => {
        expect(2 + 2).toBe(5);
    });
    it('can add DELETE ME', () => {
        expect(add(2, 2)).toBe(4);
    });
    it('external', () => {
        expect(noEAllowed('tacos')).toBeTrue();
    });
});
describe('Tip Calculator tests', () => {
    xit('after init, billAmount should be 0', () => {
        // init();
        // expect(tipPercent).toBe(0);
    });
    it('should not allow e', () => {
       expect(notAllowE).toBeUndefined(); 
       expect(1).toBe(2);
    });
}); 
 