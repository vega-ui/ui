import { describe, expect, it } from 'vitest';
import { gregorianCalendar, createCalendarSystem } from '@vega-ui/i18n';
import { expandTwoDigitYear } from '../../template/expandTwoDigitYear';

describe('expandTwoDigitYear', () => {
  it('reads the year within 80 years before and 19 years after the reference year', () => {
    expect(expandTwoDigitYear(gregorianCalendar, '26', '2026-06-15')).toBe(2026);
    expect(expandTwoDigitYear(gregorianCalendar, '45', '2026-06-15')).toBe(2045);
    expect(expandTwoDigitYear(gregorianCalendar, '46', '2026-06-15')).toBe(1946);
    expect(expandTwoDigitYear(gregorianCalendar, '00', '2026-06-15')).toBe(2000);
    expect(expandTwoDigitYear(gregorianCalendar, '99', '2026-06-15')).toBe(1999);
  });

  it('reads the year in the calendar system of the reference date', () => {
    expect(expandTwoDigitYear(createCalendarSystem('persian'), '05', '2026-06-15')).toBe(1405);
  });

  it('returns undefined without a valid reference date', () => {
    expect(expandTwoDigitYear(gregorianCalendar, '26')).toBeUndefined();
    expect(expandTwoDigitYear(gregorianCalendar, '26', '2026-02-30')).toBeUndefined();
  });
});
