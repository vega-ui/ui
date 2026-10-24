import { describe, expect, it } from 'vitest';
import { createCalendarDayFormatter, createCalendarSystem, gregorianCalendar } from '..';

describe('createCalendarDayFormatter', () => {
  it('formats the day numbers of many days', () => {
    const formatDay = createCalendarDayFormatter(gregorianCalendar, 'en-US', '2-digit');

    expect(formatDay('2026-03-05')).toBe('05');
    expect(formatDay('2026-03-15')).toBe('15');
  });

  it('drops the suffix some locales add to a standalone day', () => {
    expect(createCalendarDayFormatter(gregorianCalendar, 'ja-JP', 'numeric')('2026-03-15')).toBe('15');
  });

  it('uses the digits of the locale and the day of the calendar system', () => {
    expect(createCalendarDayFormatter(createCalendarSystem('persian'), 'fa-IR', 'numeric')('2025-03-21')).toBe('۱');
  });
});
