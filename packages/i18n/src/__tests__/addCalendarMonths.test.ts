import { describe, expect, it } from 'vitest';
import { addCalendarMonths, gregorianCalendar, createCalendarSystem } from '..';

describe('addCalendarMonths', () => {
  it('moves by Gregorian months and returns the month start', () => {
    expect(addCalendarMonths(gregorianCalendar, '2026-01-31', 1)).toBe('2026-02-01');
    expect(addCalendarMonths(gregorianCalendar, '2026-01-15', -1)).toBe('2025-12-01');
    expect(addCalendarMonths(gregorianCalendar, '2026-01-15', 0)).toBe('2026-01-01');
  });

  it('moves by Persian months', () => {
    expect(addCalendarMonths(createCalendarSystem('persian'), '2025-03-25', 1)).toBe('2025-04-21');
  });

  it('walks through all 13 months of a Hebrew leap year', () => {
    const hebrew = createCalendarSystem('hebrew');

    expect(addCalendarMonths(hebrew, '2023-09-16', 13)).toBe('2024-10-03');
  });
});
