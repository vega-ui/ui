import { describe, expect, it } from 'vitest';
import { getCalendarYearStart, gregorianCalendar, createCalendarSystem } from '..';

describe('getCalendarYearStart', () => {
  it('returns January 1 in the Gregorian calendar', () => {
    expect(getCalendarYearStart(gregorianCalendar, '2026-10-21')).toBe('2026-01-01');
  });

  it('returns 1 Tishrei in the Hebrew calendar', () => {
    expect(getCalendarYearStart(createCalendarSystem('hebrew'), '2024-12-01')).toBe('2024-10-03');
  });

  it('returns the start of the era when a Japanese era begins mid year', () => {
    expect(getCalendarYearStart(createCalendarSystem('japanese'), '2019-06-01')).toBe('2019-05-01');
  });
});
