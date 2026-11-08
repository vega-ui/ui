import { describe, expect, it } from 'vitest';
import { formatCalendarDate, gregorianCalendar } from '..';

describe('formatCalendarDate', () => {
  it('formats in the Gregorian calendar regardless of the time zone', () => {
    expect(formatCalendarDate(gregorianCalendar, '2026-01-01', 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })).toBe('January 1, 2026');
  });
});
