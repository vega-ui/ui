import { describe, it, expect } from 'vitest';
import { createCalendarSystem, getDateSeparator, gregorianCalendar } from '..';

describe('getDateSeparator', () => {
  it('returns a string', () => {
    expect(typeof getDateSeparator(gregorianCalendar, 'en-US')).toBe('string');
  });
  
  it('en-US uses "/" as date separator', () => {
    expect(getDateSeparator(gregorianCalendar, 'en-US')).toBe('/');
  });
  
  it('ru-RU uses "." as date separator', () => {
    expect(getDateSeparator(gregorianCalendar, 'ru-RU')).toBe('.');
  });
  
  it('de-DE uses "." as date separator', () => {
    expect(getDateSeparator(gregorianCalendar, 'de-DE')).toBe('.');
  });
  
  it('sv-SE uses "-" as date separator', () => {
    expect(getDateSeparator(gregorianCalendar, 'sv-SE')).toBe('-');
  });
  
  it('returns a non-empty separator for undefined locale', () => {
    const sep = getDateSeparator(gregorianCalendar);
    expect(typeof sep).toBe('string');
    expect(sep.length).toBeGreaterThan(0);
  });
  
  it('separator length is usually 1 character', () => {
    const sep = getDateSeparator(gregorianCalendar, 'en-US');
    expect(sep.length).toBeGreaterThanOrEqual(1);
  });

  it('takes the separator between the fields, not the one before an era', () => {
    expect(getDateSeparator(createCalendarSystem('japanese'), 'en-US')).toBe('/');
    expect(getDateSeparator(createCalendarSystem('hebrew'), 'he-IL')).toBe('.');
  });

  it('leaves out the bidi marks', () => {
    expect(getDateSeparator(createCalendarSystem('islamic-umalqura'), 'ar-SA')).toBe('/');
  });
});
