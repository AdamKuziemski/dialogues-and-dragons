import { CompareOperator } from './compare-operator';

describe('CompareOperator', () => {
  const equals = new CompareOperator('==');
  const notEquals = new CompareOperator('!=');
  const lessOrEqual = new CompareOperator('<=');
  const lessThan = new CompareOperator('<');
  const greaterOrEqual = new CompareOperator('>=');
  const greaterThan = new CompareOperator('>');

  describe('Numbers', () => {
    it('should return that 2 == 2', () => expect(equals.compare(2, 2)).toBe(true));
    it('should return that 4 != 2', () => expect(notEquals.compare(4, 2)).toBe(true));
    it('should return that 2 < 4', () => expect(lessThan.compare(2, 4)).toBe(true));
    it('should return that 4 > 2', () => expect(greaterThan.compare(4, 2)).toBe(true));

    it('should return that 2 <= 2, and 1 <= 2', () => {
      expect(lessOrEqual.compare(2, 2)).toBe(true);
      expect(lessOrEqual.compare(1, 2)).toBe(true);
    });

    it('should return that 2 >= 2, and 4 >= 2', () => {
      expect(greaterOrEqual.compare(2, 2)).toBe(true);
      expect(greaterOrEqual.compare(4, 2)).toBe(true);
    });
  });

  describe('Strings', () => {
    it('should return that "abc" == "abc"', () => expect(equals.compare('abc', 'abc')).toBe(true));
    it('should return that "abc" != "Abc" (case-sensitive)', () => expect(equals.compare('abc', 'Abc')).toBe(false));
    it('should return that "abc" != "def"', () => expect(notEquals.compare('abc', 'def')).toBe(true));
    it('should return that "aaa" < "bbb"', () => expect(lessThan.compare('aaa', 'bbb')).toBe(true));
    it('should return that "zzz" > "aaa"', () => expect(greaterThan.compare('zzz', 'aaa')).toBe(true));

    it('should return that "aaa" <= "aaa", and "aaa" <= "bbb"', () => {
      expect(lessOrEqual.compare('aaa', 'aaa')).toBe(true);
      expect(lessOrEqual.compare('aaa', 'bbb')).toBe(true);
    });

    it('should return that "bbb" >= "bbb", and "bbb" >= "aaa"', () => {
      expect(greaterOrEqual.compare('bbb', 'bbb')).toBe(true);
      expect(greaterOrEqual.compare('bbb', 'aaa')).toBe(true);
    });
  });

  describe('Booleans', () => {
    it('should return that true == true', () => expect(equals.compare(true, true)).toBe(true));
    it('should return that false == false', () => expect(equals.compare(false, false)).toBe(true));
    it('should return that true != false', () => expect(notEquals.compare(true, false)).toBe(true));
    it('should return that false < true', () => expect(lessThan.compare(false, true)).toBe(true));
    it('should return that false <= true', () => expect(lessOrEqual.compare(false, true)).toBe(true));
    it('should return that true > false', () => expect(greaterThan.compare(true, false)).toBe(true));
    it('should return that true >= false', () => expect(greaterOrEqual.compare(true, false)).toBe(true));
  });

  describe('Wrong types', () => {
    it(`shouldn't compare number and string`, () => {
      expect(() => equals.compare(2, 'test')).toThrowError('Cannot compare different types: number string');
    });

    it(`shouldn't compare boolean and string`, () => {
      expect(() => equals.compare(true, 'true')).toThrowError('Cannot compare different types: boolean string');
    });

    it(`shouldn't compare boolean and number`, () => {
      expect(() => equals.compare(true, 1)).toThrowError('Cannot compare different types: boolean number');
    });

    it(`shouldn't compare null`, () => {
      expect(() => equals.compare(null, null)).toThrowError('Trying to compare (to) a null or undefined value: null null');
    });

    it(`shouldn't compare undefined`, () => {
      expect(equals.compare).toThrowError('Trying to compare (to) a null or undefined value: undefined undefined');
    });
  });
});
