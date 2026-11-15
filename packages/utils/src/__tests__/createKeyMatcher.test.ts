import { describe, expect, it } from 'vitest';
import { createKeyMatcher } from '../createKeyMatcher';

describe('createKeyMatcher', () => {
  it('matches nothing without a matcher', () => {
    expect(createKeyMatcher<string>()('a')).toBe(false);
  });

  it('matches a single key, a list of keys, or a predicate', () => {
    expect(createKeyMatcher('a')('a')).toBe(true);
    expect(createKeyMatcher('a')('b')).toBe(false);
    expect(createKeyMatcher(['a', 'b'])('b')).toBe(true);
    expect(createKeyMatcher(['a', 'b'])('c')).toBe(false);
    expect(createKeyMatcher((key: number) => key > 2)(3)).toBe(true);
    expect(createKeyMatcher((key: number) => key > 2)(1)).toBe(false);
  });
});
