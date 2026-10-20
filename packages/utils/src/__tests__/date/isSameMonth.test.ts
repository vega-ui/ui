import { describe, expect, it } from 'vitest';
import { isSameMonth } from '../../date';

describe('isSameMonth', () => {
  it('returns true for days of the same month', () => {
    expect(isSameMonth(new Date(2026, 4, 1), new Date(2026, 4, 31, 23, 59))).toBe(true);
  });
  
  it('returns false for the same month of different years', () => {
    expect(isSameMonth(new Date(2026, 4, 1), new Date(2025, 4, 1))).toBe(false);
  });
  
  it('returns false for different months', () => {
    expect(isSameMonth(new Date(2026, 4, 31), new Date(2026, 5, 1))).toBe(false);
  });
});
