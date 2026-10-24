import { describe, expect, it } from 'vitest';
import { addISODays, createCalendarSystem, DAYS_IN_WEEK, getCalendarYearStart, getISOWeekday } from '..';

describe('DAYS_IN_WEEK', () => {
  it('is seven days', () => {
    expect(DAYS_IN_WEEK).toBe(7);
  });

  it('keeps the weekday across the year boundaries of every calendar', () => {
    for (const identifier of ['persian', 'hebrew', 'islamic-umalqura', 'ethiopic', 'chinese', 'japanese']) {
      const start = getCalendarYearStart(createCalendarSystem(identifier), '2026-06-15');
      const before = addISODays(start, -DAYS_IN_WEEK);

      expect(getISOWeekday(before)).toBe(getISOWeekday(start));
    }
  });
});
