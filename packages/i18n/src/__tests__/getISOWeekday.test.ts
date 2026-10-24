import { describe, expect, it } from 'vitest';
import { getISOWeekday } from '..';

describe('getISOWeekday', () => {
  it('returns the day of the week, Sunday first', () => {
    expect(getISOWeekday('2026-10-18')).toBe(0);
    expect(getISOWeekday('2026-10-19')).toBe(1);
    expect(getISOWeekday('2026-10-24')).toBe(6);
  });
});
