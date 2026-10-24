import { describe, expect, it } from 'vitest';
import { getCalendarMonthsOfYear, gregorianCalendar, createCalendarSystem } from '..';

describe('getCalendarMonthsOfYear', () => {
  it('returns the 12 Gregorian month starts', () => {
    const months = getCalendarMonthsOfYear(gregorianCalendar, '2026-10-21');

    expect(months).toHaveLength(12);
    expect(months[0]).toBe('2026-01-01');
    expect(months[11]).toBe('2026-12-01');
  });

  it('returns 13 months for a Hebrew leap year and 12 otherwise', () => {
    const hebrew = createCalendarSystem('hebrew');

    expect(getCalendarMonthsOfYear(hebrew, '2024-03-15')).toHaveLength(13);
    expect(getCalendarMonthsOfYear(hebrew, '2024-12-01')).toHaveLength(12);
  });

  it('keeps only the months of each era in a Japanese era change year', () => {
    const japanese = createCalendarSystem('japanese');

    expect(getCalendarMonthsOfYear(japanese, '2019-02-10')).toEqual(['2019-01-01', '2019-02-01', '2019-03-01', '2019-04-01']);
    expect(getCalendarMonthsOfYear(japanese, '2019-06-10')).toEqual([
      '2019-05-01', '2019-06-01', '2019-07-01', '2019-08-01', '2019-09-01', '2019-10-01', '2019-11-01', '2019-12-01',
    ]);
  });
});
