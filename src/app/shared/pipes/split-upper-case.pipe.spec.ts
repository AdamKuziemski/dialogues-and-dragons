import { SplitUpperCasePipe } from './split-upper-case.pipe';

describe('SplitUpperCasePipe', () => {
  const pipe = new SplitUpperCasePipe();

  it('should create an instance', () => expect(pipe).toBeTruthy());
  it('should split a camelCase', () => expect(pipe.transform('camelCase')).toBe('camel Case'));
  it('should split a PascalCase', () => expect(pipe.transform('PascalCase')).toBe('Pascal Case'));
  it('should not split an all lowercase string', () => expect(pipe.transform('lowercase')).toBe('lowercase'));
  it('should not split a number', () => expect(pipe.transform('123123')).toBe('123123'));
  it('should return an empty string when transforming an empty string', () => expect(pipe.transform('')).toBe(''));
  it('should return an empty string when transforming a null', () => expect(pipe.transform(null)).toBe(''));
  it('should return an empty string when transforming an undefined', () => expect(pipe.transform(undefined)).toBe(''));
});
