import { describe, expect, it } from 'vitest';
import { gregorianCalendar, createCalendarSystem } from '@vega-ui/i18n';
import { normalizeTemplateDate } from '../../template';

describe('normalizeTemplateDate', () => {
  it('keeps a valid value', () => {
    expect(normalizeTemplateDate(gregorianCalendar, '15.01.2026', 'dd.mm.yyyy')).toBe('15.01.2026');
    expect(normalizeTemplateDate(gregorianCalendar, '15.0', 'dd.mm.yyyy')).toBe('15.0');
  });

  it('pads a digit that cannot start a two-digit segment', () => {
    expect(normalizeTemplateDate(gregorianCalendar, '4', 'dd.mm.yyyy')).toBe('04');
    expect(normalizeTemplateDate(gregorianCalendar, '3', 'dd.mm.yyyy')).toBe('3');
    expect(normalizeTemplateDate(gregorianCalendar, '15.2', 'dd.mm.yyyy')).toBe('15.02');
    expect(normalizeTemplateDate(gregorianCalendar, '15.01.2026, 3', 'dd.mm.yyyy, HH:MM')).toBe('15.01.2026, 03');
  });

  it('clamps complete segments to their range', () => {
    expect(normalizeTemplateDate(gregorianCalendar, '00', 'dd.mm.yyyy')).toBe('01');
    expect(normalizeTemplateDate(gregorianCalendar, '39', 'dd.mm.yyyy')).toBe('31');
    expect(normalizeTemplateDate(gregorianCalendar, '15.01.2026, 25:61', 'dd.mm.yyyy, HH:MM')).toBe('15.01.2026, 23:59');
  });

  it('clamps the day to the length of the month once the year is known', () => {
    expect(normalizeTemplateDate(gregorianCalendar, '31.02', 'dd.mm.yyyy')).toBe('31.02');
    expect(normalizeTemplateDate(gregorianCalendar, '31.02.2026', 'dd.mm.yyyy')).toBe('28.02.2026');
    expect(normalizeTemplateDate(gregorianCalendar, '2026.02.3', 'yyyy.mm.dd')).toBe('2026.02.03');
  });

  it('clamps by the calendar system', () => {
    expect(normalizeTemplateDate(createCalendarSystem('persian'), '31.06.1404', 'dd.mm.yyyy')).toBe('31.06.1404');
    expect(normalizeTemplateDate(createCalendarSystem('persian'), '31.07.1404', 'dd.mm.yyyy')).toBe('30.07.1404');
    expect(normalizeTemplateDate(createCalendarSystem('hebrew'), '01.13.5784', 'dd.mm.yyyy')).toBe('01.13.5784');
    expect(normalizeTemplateDate(createCalendarSystem('hebrew'), '01.13.5785', 'dd.mm.yyyy')).toBe('01.12.5785');
    expect(normalizeTemplateDate(gregorianCalendar, '01.13.2026', 'dd.mm.yyyy')).toBe('01.12.2026');
  });

  it('replaces the digits of other numbering systems', () => {
    expect(normalizeTemplateDate(gregorianCalendar, '٣٩', 'dd.mm.yyyy')).toBe('31');
    expect(normalizeTemplateDate(createCalendarSystem('persian'), '۱۴۰۵/۰۱/۰۱', 'yyyy/mm/dd')).toBe('1405/01/01');
  });

  it('keeps a two-digit year and clamps the day by its expanded year', () => {
    expect(normalizeTemplateDate(gregorianCalendar, '00', 'yy', { referenceDate: '2026-06-15' })).toBe('00');
    expect(normalizeTemplateDate(gregorianCalendar, '02/31/27', 'mm/dd/yy', { referenceDate: '2026-06-15' })).toBe('02/28/27');
    expect(normalizeTemplateDate(gregorianCalendar, '02/31/28', 'mm/dd/yy', { referenceDate: '2026-06-15' })).toBe('02/29/28');
    expect(normalizeTemplateDate(gregorianCalendar, '02/31/00', 'mm/dd/yy', { referenceDate: '1950-06-15' })).toBe('02/28/00');
  });
});
