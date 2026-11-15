import { describe, expect, it } from 'vitest';
import { getPosition } from '../getPosition';

describe('Critical User Paths', () => {
  it('maps the value between min and max to 0..1', () => {
    expect(getPosition(30, 10, 60)).toBe(0.4);
  });
});

describe('Edge Cases', () => {
  it('clamps values outside the range', () => {
    expect(getPosition(-5, 0, 10)).toBe(0);
    expect(getPosition(15, 0, 10)).toBe(1);
  });

  it('returns 0 when max is not above min', () => {
    expect(getPosition(5, 10, 0)).toBe(0);
  });
});
