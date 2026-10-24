import { describe, expect, it } from 'vitest';
import { createCalendarSystem, gregorianCalendar } from '..';
import { getNumericDateParts } from '../locale/getNumericDateParts';

const describeParts = (parts: Intl.DateTimeFormatPart[]) => parts.map(({ type }) => type).join(' ');

describe('getNumericDateParts', () => {
  it('returns the numeric fields of the locale', () => {
    expect(describeParts(getNumericDateParts(gregorianCalendar, 'de-DE'))).toBe('day literal month literal year');
  });

  it('removes the bidi marks from literals', () => {
    const literals = getNumericDateParts(createCalendarSystem('islamic-umalqura'), 'ar-SA')
      .filter(({ type }) => type === 'literal')
      .map(({ value }) => value);

    expect(literals).toContain('/');
    expect(literals.join('')).not.toMatch(/[‎‏؜]/);
  });

  it('falls back to the Gregorian fields when the calendar names its months', () => {
    expect(getNumericDateParts(createCalendarSystem('hebrew'), 'en-US')).toEqual(getNumericDateParts(gregorianCalendar, 'en-US'));
    expect(getNumericDateParts(createCalendarSystem('chinese'), 'zh-CN')).toEqual(getNumericDateParts(gregorianCalendar, 'zh-CN'));
  });

  it('keeps the calendar when its months are numeric', () => {
    const persian = getNumericDateParts(createCalendarSystem('persian'), 'en-US');

    expect(persian.find(({ type }) => type === 'year')?.value).toBe('1348');
  });
});
