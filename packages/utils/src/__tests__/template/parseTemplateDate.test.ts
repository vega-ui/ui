import { describe, expect, it } from 'vitest';
import { gregorianCalendar, createCalendarSystem } from '@vega-ui/i18n';
import { formatTemplateDate, parseTemplateDate } from '../../template';

describe('parseTemplateDate', () => {
  it('reads a Gregorian date by the template', () => {
    expect(parseTemplateDate(gregorianCalendar, '05.01.2026', 'dd.mm.yyyy')).toBe('2026-01-05');
    expect(parseTemplateDate(gregorianCalendar, '01/05/2026', 'mm/dd/yyyy')).toBe('2026-01-05');
  });

  it('reads a date time', () => {
    expect(parseTemplateDate(gregorianCalendar, '05.01.2026, 08:30', 'dd.mm.yyyy, HH:MM')).toBe('2026-01-05T08:30');
    expect(parseTemplateDate(gregorianCalendar, '05.01.2026 08:30:15', 'dd.mm.yyyy HH:MM:SS')).toBe('2026-01-05T08:30:15');
  });

  it('returns undefined for an incomplete or malformed value', () => {
    expect(parseTemplateDate(gregorianCalendar, '05.01.20', 'dd.mm.yyyy')).toBeUndefined();
    expect(parseTemplateDate(gregorianCalendar, 'aa.bb.cccc', 'dd.mm.yyyy')).toBeUndefined();
    expect(parseTemplateDate(gregorianCalendar, '05/01/2026', 'dd.mm.yyyy')).toBeUndefined();
  });

  it('returns undefined for a day or time that does not exist', () => {
    expect(parseTemplateDate(gregorianCalendar, '30.02.2026', 'dd.mm.yyyy')).toBeUndefined();
    expect(parseTemplateDate(gregorianCalendar, '05.13.2026', 'dd.mm.yyyy')).toBeUndefined();
    expect(parseTemplateDate(gregorianCalendar, '05.01.2026, 24:00', 'dd.mm.yyyy, HH:MM')).toBeUndefined();
  });

  it('reads the fields of the calendar system', () => {
    const persian = createCalendarSystem('persian');
    const hebrew = createCalendarSystem('hebrew');

    expect(parseTemplateDate(persian, '31/06/1404', 'dd/mm/yyyy')).toBe('2025-09-22');
    expect(parseTemplateDate(hebrew, '01.13.5784', 'dd.mm.yyyy')).toBe('2024-09-04');
    expect(parseTemplateDate(hebrew, '01.13.5785', 'dd.mm.yyyy')).toBeUndefined();
  });

  it('reads the digits of other numbering systems', () => {
    expect(parseTemplateDate(gregorianCalendar, '٠٥.٠١.٢٠٢٦', 'dd.mm.yyyy')).toBe('2026-01-05');
    expect(parseTemplateDate(createCalendarSystem('persian'), '۱۴۰۵/۰۱/۰۱', 'yyyy/mm/dd')).toBe('2026-03-21');
  });

  it('reads a two-digit year around the reference date and writes it back the same', () => {
    expect(parseTemplateDate(gregorianCalendar, '01/15/26', 'mm/dd/yy', '2026-06-15')).toBe('2026-01-15');
    expect(parseTemplateDate(gregorianCalendar, '03/04/99', 'mm/dd/yy', '2026-06-15')).toBe('1999-03-04');
    expect(parseTemplateDate(gregorianCalendar, '29.02.00', 'dd.mm.yy', '2026-06-15')).toBe('2000-02-29');
    expect(formatTemplateDate(gregorianCalendar, '1999-03-04', 'mm/dd/yy')).toBe('03/04/99');
  });

  it('returns undefined for a two-digit year without a reference date', () => {
    expect(parseTemplateDate(gregorianCalendar, '01/15/26', 'mm/dd/yy')).toBeUndefined();
  });
});
