import { describe, expect, it } from 'vitest';
import { getCalendarMonthsDistance, gregorianCalendar, createCalendarSystem } from '..';

describe('getCalendarMonthsDistance', () => {
  it('counts Gregorian months in both directions', () => {
    expect(getCalendarMonthsDistance(gregorianCalendar, '2026-01-31', '2026-04-01')).toBe(3);
    expect(getCalendarMonthsDistance(gregorianCalendar, '2026-04-01', '2025-12-31')).toBe(-4);
    expect(getCalendarMonthsDistance(gregorianCalendar, '2026-04-01', '2026-04-30')).toBe(0);
  });

  it('counts the 13 months of a Hebrew leap year', () => {
    expect(getCalendarMonthsDistance(createCalendarSystem('hebrew'), '2023-09-16', '2024-10-03')).toBe(13);
  });
});
