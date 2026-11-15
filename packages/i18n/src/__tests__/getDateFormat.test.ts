import { describe, it, expect } from 'vitest';
import { createCalendarSystem, getDateFormat, gregorianCalendar } from '..';

describe('getDateFormat', () => {
  it('en-US is month/day/year order', () => {
    const fmt = getDateFormat(gregorianCalendar, 'en-US');
    expect(fmt).toMatch(/^MM.*DD.*YYYY$/);
    expect(fmt.indexOf('MM')).toBeLessThan(fmt.indexOf('DD'));
    expect(fmt.indexOf('DD')).toBeLessThan(fmt.indexOf('YYYY'));
  });
  
  it('ja-JP is year/month/day order', () => {
    const fmt = getDateFormat(gregorianCalendar, 'ja-JP');
    expect(fmt).toMatch(/^YYYY.*MM.*DD$/);
    expect(fmt.indexOf('YYYY')).toBeLessThan(fmt.indexOf('MM'));
    expect(fmt.indexOf('MM')).toBeLessThan(fmt.indexOf('DD'));
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
