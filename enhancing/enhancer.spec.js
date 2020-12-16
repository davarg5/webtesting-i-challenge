const enhancer = require('./enhancer.js');
// test away!

describe('Items', () => {
    let ironSword;
    beforeEach(() => {
        ironSword = {
            name: 'iron sword',
            durability: 50,
            enhancement: 10
        }
    });
    it('items have properties of name, durability, and enhancement', () => {
        expect(ironSword.name).toBe('iron sword');
        expect(ironSword.durability).toBe(50);
        expect(ironSword.enhancement).toBe(10);
    });
    it('items enchancement property is between 0 and 20', () => {
        expect(ironSword.enhancement).toBeGreaterThanOrEqual(0);
        expect(ironSword.enhancement).toBeLessThanOrEqual(20);
    });
    it('items durability property is between 0 and 100', () => {
        expect(ironSword.durability).toBeGreaterThanOrEqual(0);
        expect(ironSword.durability).toBeLessThanOrEqual(100);
    });
    it('repair restores durability to 100', () => {
        expect(ironSword.durability).toBe(50);
        const repairedSword = enhancer.repair(ironSword);
        expect(repairedSword.durability).toBe(100);
    });
})

describe('When enhancements succeeds', () => {
    let ironSword;
    beforeEach(() => {
        ironSword = {
            name: 'iron sword',
            durability: 50,
            enhancement: 10
        }
    });
    it('increases enhancement level by one', () => {
        expect(ironSword.enhancement).toBe(10);
        const enhancedSword = enhancer.success(ironSword);
        expect(enhancedSword.enhancement).toBe(11);
    })
    it('enhancement level is not changed if enhancement level 20', () => {
        const goldSword = {
            name: 'gold sword',
            durability: 75,
            enhancement: 20
        }
        expect(goldSword.enhancement).toBe(20);
        const enhancedSword = enhancer.success(goldSword);
        expect(enhancedSword.enhancement).toBe(20);
    })
    it('durability is not changed', () => {
        expect(ironSword.durability).toBe(50);
        const enhancedSword = enhancer.success(ironSword);
        expect(enhancedSword.durability).toBe(50);
    })
})

describe('When enhancements fails', () => {
    let ironSword;
    beforeEach(() => {
        ironSword = {
            name: 'iron sword',
            durability: 50,
            enhancement: 10
        }
    });
    it('durability is decreased by 5 if enhancement level is less than 15', () => {
        expect(ironSword.enhancement).toBeLessThan(15);
        expect(ironSword.durability).toBe(50);
        const failedSword = enhancer.fail(ironSword);
        expect(failedSword.durability).toBe(45);
    })
    it('durability is decreased by 10 if enhancement level is greater than or equal to 15', () => {
        const platinumSword = {
            name: 'platinum sword',
            durability: 75,
            enhancement: 15
        }
        expect(platinumSword.enhancement).toBeGreaterThanOrEqual(15);
        expect(platinumSword.durability).toBe(75);
        const failedSword = enhancer.fail(platinumSword);
        expect(failedSword.durability).toBe(65); // fix
    })
    it('enhancement level is decreased by 1 if enhancement level is greater than 16', () => {
        const goldSword = {
            name: 'gold sword',
            durability: 75,
            enhancement: 20
        }
        expect(goldSword.enhancement).toBeGreaterThan(16);
        expect(goldSword.durability).toBe(75);
        const failedSword = enhancer.fail(goldSword);
        expect(failedSword.durability).toBe(65);
        expect(failedSword.enhancement).toBe(19);
    })
})


