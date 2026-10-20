import { describe, expect, it } from 'vitest';
import { getMonthStart } from '../../date';

describe('getMonthStart', () => {
  it('returns local midnight of the first day of the month', () => {
    expect(getMonthStart(new Date(2026, 4, 31, 23, 59))).toEqual(new Date(2026, 4, 1));
  });
  
  it('keeps the first day as is', () => {
    expect(getMonthStart(new Date(2026, 0, 1))).toEqual(new Date(2026, 0, 1));
  });
});
