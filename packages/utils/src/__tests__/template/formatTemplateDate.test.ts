import { describe, expect, it } from 'vitest';
import { gregorianCalendar, createCalendarSystem } from '@vega-ui/i18n';
import { formatTemplateDate } from '../../template';

describe('formatTemplateDate', () => {
  it('writes a Gregorian date by the template', () => {
    expect(formatTemplateDate(gregorianCalendar, '2026-01-05', 'dd.mm.yyyy')).toBe('05.01.2026');
    expect(formatTemplateDate(gregorianCalendar, '2026-01-05', 'mm/dd/yyyy')).toBe('01/05/2026');
    expect(formatTemplateDate(gregorianCalendar, '2026-01-05', 'yyyy-mm-dd')).toBe('2026-01-05');
  });

  it('writes the time of a date time', () => {
    expect(formatTemplateDate(gregorianCalendar, '2026-01-05T08:30', 'dd.mm.yyyy, HH:MM')).toBe('05.01.2026, 08:30');
    expect(formatTemplateDate(gregorianCalendar, '2026-01-05T08:30:15', 'dd.mm.yyyy HH:MM:SS')).toBe('05.01.2026 08:30:15');
  });

  it('writes midnight for a date without time', () => {
    expect(formatTemplateDate(gregorianCalendar, '2026-01-05', 'dd.mm.yyyy, HH:MM')).toBe('05.01.2026, 00:00');
  });

  it('writes the fields of the calendar system', () => {
    expect(formatTemplateDate(createCalendarSystem('persian'), '2025-03-21', 'dd/mm/yyyy')).toBe('01/01/1404');
    expect(formatTemplateDate(createCalendarSystem('hebrew'), '2024-10-03', 'dd.mm.yyyy')).toBe('01.01.5785');
  });
});
