import { describe, expect, it } from 'vitest';
import { getSameMonthInCalendarYear, gregorianCalendar, createCalendarSystem } from '..';

describe('getSameMonthInCalendarYear', () => {
  it('keeps the month number in another Gregorian year', () => {
    expect(getSameMonthInCalendarYear(gregorianCalendar, '2026-05-20', '2030-01-01')).toBe('2030-05-01');
  });

  it('clamps month 13 of a Hebrew leap year to month 12 of a common year', () => {
    const hebrew = createCalendarSystem('hebrew');
    const elul5784 = getSameMonthInCalendarYear(hebrew, '2024-09-20', '2024-09-20');

    expect(hebrew.toFields(elul5784).month).toBe(13);
    expect(hebrew.toFields(getSameMonthInCalendarYear(hebrew, elul5784, '2024-12-01')).month).toBe(12);
  });
});
