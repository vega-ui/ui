import { describe, expect, it } from 'vitest';
import { countDecimals } from '../countDecimals';

describe('countDecimals', () => {
  it('counts the decimals of a fraction', () => {
    expect(countDecimals(0.25)).toBe(2);
    expect(countDecimals(-1.5)).toBe(1);
  });

  it('returns 0 for integers', () => {
    expect(countDecimals(100)).toBe(0);
    expect(countDecimals(0)).toBe(0);
  });

  it('reads exponent notation', () => {
    expect(countDecimals(1e-7)).toBe(7);
    expect(countDecimals(1.5e-7)).toBe(8);
    expect(countDecimals(1e21)).toBe(0);
  });
});
