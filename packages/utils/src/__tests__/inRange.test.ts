import { describe, expect, it } from 'vitest';
import { inRange } from '../inRange';

describe('inRange', () => {
  it('includes both bounds of an ascending range', () => {
    expect(inRange(5, [5, 10])).toBe(true);
    expect(inRange(7, [5, 10])).toBe(true);
    expect(inRange(10, [5, 10])).toBe(true);
  });

  it('excludes values outside an ascending range', () => {
    expect(inRange(4, [5, 10])).toBe(false);
    expect(inRange(11, [5, 10])).toBe(false);
  });

  it('accepts a descending range', () => {
    expect(inRange(7, [10, 5])).toBe(true);
    expect(inRange(10, [10, 5])).toBe(true);
    expect(inRange(5, [10, 5])).toBe(true);
    expect(inRange(11, [10, 5])).toBe(false);
    expect(inRange(4, [10, 5])).toBe(false);
  });

  it('is false for an empty range', () => {
    expect(inRange(0, [])).toBe(false);
  });
});
