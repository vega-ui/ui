import { describe, expect, it } from 'vitest';
import { addCalendarYears, formatCalendarDate, getCalendarYearStart, createCalendarSystem } from '..';
import { BuddhistCalendar } from './BuddhistCalendar';

describe('extending GregorianCalendar', () => {
  const buddhist = new BuddhistCalendar();
  const reference = createCalendarSystem('buddhist');

  it('shifts the year and keeps Gregorian months and days', () => {
    expect(buddhist.toFields('2026-02-15')).toEqual({ year: 2569, month: 2, day: 15 });
    expect(buddhist.fromFields({ year: 2569, month: 2, day: 15 })).toBe('2026-02-15');
    expect(buddhist.getDaysInMonth({ year: 2567, month: 2 })).toBe(29);
  });

  it('matches the Buddhist calendar of Intl', () => {
    for (const date of ['2024-02-29', '2026-01-01', '2026-12-31']) {
      const { year, month, day } = reference.toFields(date);

      expect(buddhist.toFields(date)).toEqual({ year, month, day });
      expect(buddhist.fromFields({ year, month, day })).toBe(date);
    }
  });

  it('works with calendar helpers and Intl formatting', () => {
    expect(getCalendarYearStart(buddhist, '2026-06-15')).toBe('2026-01-01');
    expect(addCalendarYears(buddhist, '2024-02-29', 1)).toBe('2025-01-01');
    expect(formatCalendarDate(buddhist, '2026-06-15', 'en-US', { year: 'numeric' })).toContain('2569');
  });

  it('keeps overridden methods bound when passed as callbacks', () => {
    expect(['2026-02-15'].map(buddhist.toFields)).toEqual([{ year: 2569, month: 2, day: 15 }]);
  });
});
