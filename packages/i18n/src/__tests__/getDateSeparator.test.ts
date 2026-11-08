import { describe, it, expect } from 'vitest';
import { createCalendarSystem, getDateSeparator, gregorianCalendar } from '..';

describe('getDateSeparator', () => {
  it('en-US uses "/" as date separator', () => {
    expect(getDateSeparator(gregorianCalendar, 'en-US')).toBe('/');
  });
  
  it('ru-RU uses "." as date separator', () => {
    expect(getDateSeparator(gregorianCalendar, 'ru-RU')).toBe('.');
  });
  
  it('sv-SE uses "-" as date separator', () => {
    expect(getDateSeparator(gregorianCalendar, 'sv-SE')).toBe('-');
  });
  
  it('takes the separator between the fields, not the one before an era', () => {
    expect(getDateSeparator(createCalendarSystem('japanese'), 'en-US')).toBe('/');
    expect(getDateSeparator(createCalendarSystem('hebrew'), 'he-IL')).toBe('.');
  });
});
