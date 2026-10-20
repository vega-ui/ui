import { describe, expect, it } from 'vitest';
import { formatISODate } from '../../date';

describe('formatISODate', () => {
  it('formats the local calendar date', () => {
    expect(formatISODate(new Date(2025, 4, 12))).toBe('2025-05-12');
  });

  it('does not shift the day near midnight', () => {
    expect(formatISODate(new Date(2025, 4, 12, 23, 59))).toBe('2025-05-12');
    expect(formatISODate(new Date(2025, 4, 12, 0, 0))).toBe('2025-05-12');
  });

  it('pads years below 1000 to four digits', () => {
    const date = new Date(2000, 0, 5);
    date.setFullYear(87);

    expect(formatISODate(date)).toBe('0087-01-05');
  });
  
  it('returns an empty string without a date', () => {
    expect(formatISODate(undefined)).toBe('');
  });
});
