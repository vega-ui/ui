import { describe, it, expect } from 'vitest';
import { createCalendarSystem, getDateFormat, gregorianCalendar } from '..';

describe('getDateFormat', () => {
  it('returns a non-empty string', () => {
    const fmt = getDateFormat(gregorianCalendar, 'en-US');
    expect(typeof fmt).toBe('string');
    expect(fmt.length).toBeGreaterThan(0);
  });
  
  it('contains DD, MM, YYYY tokens', () => {
    const fmt = getDateFormat(gregorianCalendar, 'en-US');
    expect(fmt).toContain('DD');
    expect(fmt).toContain('MM');
    expect(fmt).toContain('YYYY');
  });
  
  it('does not contain numeric date parts from the sample date', () => {
    const fmt = getDateFormat(gregorianCalendar, 'en-US');
    expect(fmt).not.toContain('1970');
    expect(fmt).not.toContain('02');
    expect(fmt).not.toContain('2');
    expect(fmt).not.toContain('01');
    expect(fmt).not.toContain('1');
  });
  
  it('en-US is month/day/year order', () => {
    const fmt = getDateFormat(gregorianCalendar, 'en-US');
    expect(fmt).toMatch(/^MM.*DD.*YYYY$/);
    expect(fmt.indexOf('MM')).toBeLessThan(fmt.indexOf('DD'));
    expect(fmt.indexOf('DD')).toBeLessThan(fmt.indexOf('YYYY'));
  });
  
  it('en-GB is day/month/year order', () => {
    const fmt = getDateFormat(gregorianCalendar, 'en-GB');
    expect(fmt).toMatch(/^DD.*MM.*YYYY$/);
    expect(fmt.indexOf('DD')).toBeLessThan(fmt.indexOf('MM'));
    expect(fmt.indexOf('MM')).toBeLessThan(fmt.indexOf('YYYY'));
  });
  
  it('ru-RU is day.month.year order', () => {
    const fmt = getDateFormat(gregorianCalendar, 'ru-RU');
    expect(fmt).toMatch(/^DD.*MM.*YYYY$/);
    expect(fmt).toContain('.');
    expect(fmt.indexOf('DD')).toBeLessThan(fmt.indexOf('MM'));
    expect(fmt.indexOf('MM')).toBeLessThan(fmt.indexOf('YYYY'));
  });
  
  it('de-DE is day.month.year order', () => {
    const fmt = getDateFormat(gregorianCalendar, 'de-DE');
    expect(fmt).toMatch(/^DD.*MM.*YYYY$/);
    expect(fmt).toContain('.');
    expect(fmt.indexOf('DD')).toBeLessThan(fmt.indexOf('MM'));
    expect(fmt.indexOf('MM')).toBeLessThan(fmt.indexOf('YYYY'));
  });
  
  it('ja-JP is year/month/day order', () => {
    const fmt = getDateFormat(gregorianCalendar, 'ja-JP');
    expect(fmt).toMatch(/^YYYY.*MM.*DD$/);
    expect(fmt.indexOf('YYYY')).toBeLessThan(fmt.indexOf('MM'));
    expect(fmt.indexOf('MM')).toBeLessThan(fmt.indexOf('DD'));
  });
  
  it('uses the runtime locale without a locale', () => {
    const fmt = getDateFormat(gregorianCalendar);
    expect(typeof fmt).toBe('string');
    expect(fmt).toContain('DD');
    expect(fmt).toContain('MM');
    expect(fmt).toContain('YYYY');
  });
  
  it('preserves locale-specific literals (at least one non-token char)', () => {
    const fmt = getDateFormat(gregorianCalendar, 'en-US');
    const literalsOnly = fmt.replace(/DD|MM|YYYY/g, '');
    expect(literalsOnly.length).toBeGreaterThan(0);
  });
  
  it('handles locales that use spaces as literals (sanity)', () => {
    const fmt = getDateFormat(gregorianCalendar, 'fr-CA');
    expect(fmt).toContain('DD');
    expect(fmt).toContain('MM');
    expect(fmt).toContain('YYYY');
  });

  it('leaves out the era of the calendar', () => {
    const japanese = createCalendarSystem('japanese');

    expect(getDateFormat(japanese, 'ja-JP')).toBe('YYYY/MM/DD');
    expect(getDateFormat(japanese, 'en-US')).toBe('MM/DD/YYYY');
    expect(getDateFormat(createCalendarSystem('persian'), 'en-US')).toBe('MM/DD/YYYY');
  });

  it('accepts the locales argument of Intl', () => {
    expect(getDateFormat(gregorianCalendar, ['de-DE', 'en-US'])).toBe('DD.MM.YYYY');
    expect(getDateFormat(gregorianCalendar, new Intl.Locale('en-GB'))).toBe('DD/MM/YYYY');
  });

  it('uses the Gregorian order of the locale when the calendar names its months', () => {
    expect(getDateFormat(createCalendarSystem('hebrew'), 'en-US')).toBe('MM/DD/YYYY');
    expect(getDateFormat(createCalendarSystem('hebrew'), 'he-IL')).toBe('DD.MM.YYYY');
    expect(getDateFormat(createCalendarSystem('chinese'), 'en-US')).toBe('MM/DD/YYYY');
  });

  it('leaves out the bidi marks', () => {
    expect(getDateFormat(createCalendarSystem('islamic-umalqura'), 'ar-SA')).toBe('DD/MM/YYYY');
  });
});
