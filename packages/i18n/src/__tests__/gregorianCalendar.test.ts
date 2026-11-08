import { describe, expect, it } from 'vitest';
import { GregorianCalendar, gregorianCalendar } from '..';

describe('gregorianCalendar', () => {
  it('splits an ISO day into fields', () => {
    expect(gregorianCalendar.identifier).toBe('gregory');
    expect(gregorianCalendar.toFields('2026-02-15')).toEqual({ year: 2026, month: 2, day: 15 });
  });

  it('joins fields into an ISO day', () => {
    expect(gregorianCalendar.fromFields({ year: 87, month: 1, day: 5 })).toBe('0087-01-05');
  });

  it('knows month lengths, including leap years', () => {
    expect(gregorianCalendar.getDaysInMonth({ year: 2024, month: 2 })).toBe(29);
    expect(gregorianCalendar.getDaysInMonth({ year: 2026, month: 2 })).toBe(28);
    expect(gregorianCalendar.getDaysInMonth({ year: 2026, month: 12 })).toBe(31);
    expect(gregorianCalendar.getDaysInMonth({ year: 87, month: 2 })).toBe(28);
  });

  it('keeps methods working when they are passed as callbacks', () => {
    const { toFields } = new GregorianCalendar();

    expect(['2026-02-15'].map(toFields)).toEqual([{ year: 2026, month: 2, day: 15 }]);
  });
});
