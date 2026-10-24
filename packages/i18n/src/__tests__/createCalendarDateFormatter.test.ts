import { describe, expect, it } from 'vitest';
import { createCalendarDateFormatter, createCalendarSystem, gregorianCalendar } from '..';

describe('createCalendarDateFormatter', () => {
  it('formats many days with the same options', () => {
    const formatMonth = createCalendarDateFormatter(gregorianCalendar, 'en-US', { month: 'long' });

    expect(formatMonth('2026-01-01')).toBe('January');
    expect(formatMonth('2026-03-15')).toBe('March');
  });

  it('formats in the calendar system', () => {
    const formatMonth = createCalendarDateFormatter(createCalendarSystem('persian'), 'en-US', { month: 'long' });

    expect(formatMonth('2025-03-21')).toBe('Farvardin');
  });
});
