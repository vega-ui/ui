import { describe, expect, it } from 'vitest';
import { compare } from '../compare';

describe('compare', () => {
  it('compares numbers', () => {
    expect(compare(1, 2)).toBe(-1);
    expect(compare(2, 1)).toBe(1);
    expect(compare(1, 1)).toBe(0);
    expect(compare(-1, 0)).toBe(-1);
    expect(compare(0, -0)).toBe(0);
  });

  it('compares strings lexicographically', () => {
    expect(compare('a', 'b')).toBe(-1);
    expect(compare('b', 'a')).toBe(1);
    expect(compare('a', 'a')).toBe(0);
    expect(compare('2024-01-01', '2024-12-31')).toBe(-1);
  });

  it('compares bigints', () => {
    expect(compare(1n, 2n)).toBe(-1);
    expect(compare(2n, 1n)).toBe(1);
    expect(compare(1n, 1n)).toBe(0);
  });

  it('compares dates by timestamp', () => {
    const earlier = new Date(2024, 0, 1);
    const later = new Date(2024, 11, 31);

    expect(compare(earlier, later)).toBe(-1);
    expect(compare(later, earlier)).toBe(1);
    expect(compare(new Date(2024, 0, 1), new Date(2024, 0, 1))).toBe(0);
  });

  it('returns 0 for NaN pairs', () => {
    expect(compare(NaN, NaN)).toBe(0);
  });

  it('tolerates nullish pairs at runtime', () => {
    // @ts-expect-error nullish values are not Comparable
    expect(compare(undefined, undefined)).toBe(0);
    // @ts-expect-error nullish values are not Comparable
    expect(compare(null, null)).toBe(0);
  });

  it('sorts arrays ascending', () => {
    expect([3, 1, 2].sort(compare)).toEqual([1, 2, 3]);
    expect(['c', 'a', 'b'].sort(compare)).toEqual(['a', 'b', 'c']);
  });

  it('rejects non-comparable types at the type level', () => {
    // @ts-expect-error objects have no universal ordering
    compare({}, {});
    // @ts-expect-error arrays coerce to strings and would order incorrectly
    compare([2], [10]);
    // @ts-expect-error relational comparison of symbols throws at runtime
    expect(() => compare(Symbol('a'), Symbol('b'))).toThrow(TypeError);
  });
});