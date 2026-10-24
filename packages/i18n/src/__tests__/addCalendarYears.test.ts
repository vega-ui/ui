import { describe, expect, it } from 'vitest';
import { addCalendarYears, gregorianCalendar, createCalendarSystem } from '..';

describe('addCalendarYears', () => {
  it('moves by Gregorian years and returns the year start', () => {
    expect(addCalendarYears(gregorianCalendar, '2026-10-21', 1)).toBe('2027-01-01');
    expect(addCalendarYears(gregorianCalendar, '2026-10-21', -2)).toBe('2024-01-01');
  });

  it('moves by Hebrew years of different lengths', () => {
    expect(addCalendarYears(createCalendarSystem('hebrew'), '2023-09-16', 2)).toBe('2025-09-23');
  });

  it('treats each Japanese era part of a year as its own year', () => {
    const japanese = createCalendarSystem('japanese');

    expect(addCalendarYears(japanese, '2018-06-01', 1)).toBe('2019-01-01');
    expect(addCalendarYears(japanese, '2018-06-01', 2)).toBe('2019-05-01');
    expect(addCalendarYears(japanese, '2018-06-01', 3)).toBe('2020-01-01');
  });
});
