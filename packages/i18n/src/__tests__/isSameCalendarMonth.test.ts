import { describe, expect, it } from 'vitest';
import { isSameCalendarMonth, gregorianCalendar, createCalendarSystem } from '..';

describe('isSameCalendarMonth', () => {
  it('compares Gregorian months', () => {
    expect(isSameCalendarMonth(gregorianCalendar, '2026-05-01', '2026-05-31')).toBe(true);
    expect(isSameCalendarMonth(gregorianCalendar, '2026-05-31', '2026-06-01')).toBe(false);
  });

  it('compares Persian months spanning two Gregorian months', () => {
    const persian = createCalendarSystem('persian');

    expect(isSameCalendarMonth(persian, '2025-03-25', '2025-04-15')).toBe(true);
    expect(isSameCalendarMonth(persian, '2025-03-20', '2025-03-21')).toBe(false);
  });
});
