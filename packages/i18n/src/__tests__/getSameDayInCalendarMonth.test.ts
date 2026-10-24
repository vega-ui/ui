import { describe, expect, it } from 'vitest';
import { getSameDayInCalendarMonth, gregorianCalendar, createCalendarSystem } from '..';

describe('getSameDayInCalendarMonth', () => {
  it('keeps the day number in another Gregorian month', () => {
    expect(getSameDayInCalendarMonth(gregorianCalendar, '2026-01-15', '2026-03-20')).toBe('2026-03-15');
  });

  it('clamps to the length of a shorter month', () => {
    expect(getSameDayInCalendarMonth(gregorianCalendar, '2026-01-31', '2026-02-01')).toBe('2026-02-28');
  });

  it('keeps the day number within Persian months', () => {
    const persian = createCalendarSystem('persian');

    expect(getSameDayInCalendarMonth(persian, '2025-03-30', '2025-04-21')).toBe('2025-04-30');
  });
});
