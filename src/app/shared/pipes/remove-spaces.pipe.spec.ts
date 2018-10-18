import { RemoveSpacesPipe } from './remove-spaces.pipe';

describe('RemoveSpacesPipe', () => {
  const pipe = new RemoveSpacesPipe();

  it('should create an instance', () => expect(pipe).toBeTruthy());
  it('should remove spaces', () => expect(pipe.transform('test test test')).toBe('testtesttest'));
  it('should leave a spaceless string untouched', () => expect(pipe.transform('aaabbb')).toBe('aaabbb'));
  it('should return an empty string when transforming an empty string', () => expect(pipe.transform('')).toBe(''));
  it('should return an empty string when transforming a null', () => expect(pipe.transform(null)).toBe(''));
  it('should return an empty string when transforming an undefined', () => expect(pipe.transform(undefined)).toBe(''));
});
