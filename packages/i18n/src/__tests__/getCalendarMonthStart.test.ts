import { describe, expect, it } from 'vitest';
import { getCalendarMonthStart, gregorianCalendar, createCalendarSystem } from '..';

describe('getCalendarMonthStart', () => {
  it('returns the first day of the Gregorian month', () => {
    expect(getCalendarMonthStart(gregorianCalendar, '2026-05-31')).toBe('2026-05-01');
  });

  it('returns the first day of the Persian month, which starts mid Gregorian month', () => {
    expect(getCalendarMonthStart(createCalendarSystem('persian'), '2025-04-10')).toBe('2025-03-21');
  });
});
