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

  it('clamps a complete value to min and max', () => {
    const bounds = { min: '2026-01-10', max: '2026-01-20' };

    expect(normalizeTemplateDate(gregorianCalendar, '05.01.2026', 'dd.mm.yyyy', bounds)).toBe('10.01.2026');
    expect(normalizeTemplateDate(gregorianCalendar, '25.01.2026', 'dd.mm.yyyy', bounds)).toBe('20.01.2026');
    expect(normalizeTemplateDate(gregorianCalendar, '05.01.20', 'dd.mm.yyyy', bounds)).toBe('05.01.20');
  });

  it('clamps a date time to min and max', () => {
    const template = 'dd.mm.yyyy, HH:MM';
    const bounds = { min: '2026-01-10T09:00', max: '2026-01-20T18:00:30' };

    expect(normalizeTemplateDate(gregorianCalendar, '10.01.2026, 08:59', template, bounds)).toBe('10.01.2026, 09:00');
    expect(normalizeTemplateDate(gregorianCalendar, '10.01.2026, 09:00', template, bounds)).toBe('10.01.2026, 09:00');
    expect(normalizeTemplateDate(gregorianCalendar, '20.01.2026, 19:00', template, bounds)).toBe('20.01.2026, 18:00');
  });

  it('replaces the digits of other numbering systems', () => {
    expect(normalizeTemplateDate(gregorianCalendar, '٣٩', 'dd.mm.yyyy')).toBe('31');
    expect(normalizeTemplateDate(createCalendarSystem('persian'), '۱۴۰۵/۰۱/۰۱', 'yyyy/mm/dd')).toBe('1405/01/01');
  });
});
