import { describe, expect, it } from 'vitest';
import { formatCalendarDay, gregorianCalendar, createCalendarSystem } from '..';

describe('formatCalendarDay', () => {
  it('formats the day number', () => {
    expect(formatCalendarDay(gregorianCalendar, '2026-03-05', 'en-US', 'numeric')).toBe('5');
    expect(formatCalendarDay(gregorianCalendar, '2026-03-05', 'en-US', '2-digit')).toBe('05');
  });

  it('drops the suffix some locales add to a standalone day', () => {
    expect(formatCalendarDay(gregorianCalendar, '2026-03-15', 'ja-JP', 'numeric')).toBe('15');
    expect(formatCalendarDay(gregorianCalendar, '2026-03-15', 'zh-CN', 'numeric')).toBe('15');
  });

  it('uses the digits of the locale and the day of the calendar system', () => {
    expect(formatCalendarDay(createCalendarSystem('persian'), '2025-03-21', 'fa-IR', 'numeric')).toBe('۱');
  });
});
