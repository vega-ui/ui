import { describe, expect, it } from 'vitest';
import { getCalendarYearEnd, gregorianCalendar, createCalendarSystem } from '..';

describe('getCalendarYearEnd', () => {
  it('returns December 31 in the Gregorian calendar', () => {
    expect(getCalendarYearEnd(gregorianCalendar, '2026-02-01')).toBe('2026-12-31');
  });

  it('returns the last day of a 13-month Hebrew leap year', () => {
    expect(getCalendarYearEnd(createCalendarSystem('hebrew'), '2024-03-15')).toBe('2024-10-02');
  });

  it('returns the end of the era when a Japanese era ends mid year', () => {
    expect(getCalendarYearEnd(createCalendarSystem('japanese'), '2019-02-01')).toBe('2019-04-30');
  });
});
