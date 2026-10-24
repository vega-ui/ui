import { describe, expect, it } from 'vitest';
import { getCalendarYearsDistance, gregorianCalendar, createCalendarSystem } from '..';

describe('getCalendarYearsDistance', () => {
  it('counts Gregorian years in both directions', () => {
    expect(getCalendarYearsDistance(gregorianCalendar, '2026-10-21', '2030-01-01')).toBe(4);
    expect(getCalendarYearsDistance(gregorianCalendar, '2026-10-21', '2020-12-31')).toBe(-6);
  });

  it('counts both parts of the Japanese era change as years', () => {
    expect(getCalendarYearsDistance(createCalendarSystem('japanese'), '2018-06-01', '2020-06-01')).toBe(3);
  });
});
