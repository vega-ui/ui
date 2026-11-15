import { describe, expect, it } from 'vitest';
import { createCalendarDateFormatter, createCalendarSystem } from '..';

describe('createCalendarDateFormatter', () => {
  it('formats in the calendar system', () => {
    const formatMonth = createCalendarDateFormatter(createCalendarSystem('persian'), 'en-US', { month: 'long' });

    expect(formatMonth('2025-03-21')).toBe('Farvardin');
  });
});
