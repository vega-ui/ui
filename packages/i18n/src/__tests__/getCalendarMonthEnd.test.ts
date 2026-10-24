import { describe, expect, it } from 'vitest';
import { getCalendarMonthEnd, gregorianCalendar, createCalendarSystem } from '..';

describe('getCalendarMonthEnd', () => {
  it('returns the last day of the Gregorian month', () => {
    expect(getCalendarMonthEnd(gregorianCalendar, '2024-02-10')).toBe('2024-02-29');
  });

  it('returns the last day of the Persian month', () => {
    expect(getCalendarMonthEnd(createCalendarSystem('persian'), '2025-03-21')).toBe('2025-04-20');
  });
});
