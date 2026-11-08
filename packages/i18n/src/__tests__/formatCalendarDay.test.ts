import { describe, expect, it } from 'vitest';
import { formatCalendarDay, gregorianCalendar } from '..';

describe('formatCalendarDay', () => {
  it('formats the day number', () => {
    expect(formatCalendarDay(gregorianCalendar, '2026-03-05', 'en-US', 'numeric')).toBe('5');
    expect(formatCalendarDay(gregorianCalendar, '2026-03-05', 'en-US', '2-digit')).toBe('05');
  });
});
