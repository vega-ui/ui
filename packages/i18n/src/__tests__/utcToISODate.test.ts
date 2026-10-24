import { describe, expect, it } from 'vitest';
import { utcToISODate } from '..';

describe('utcToISODate', () => {
  it('formats the UTC day of a date', () => {
    expect(utcToISODate(new Date('2026-02-15T23:30:00.000Z'))).toBe('2026-02-15');
  });

  it('pads the year to four digits', () => {
    const date = new Date(Date.UTC(2000, 0, 5));
    date.setUTCFullYear(42);

    expect(utcToISODate(date)).toBe('0042-01-05');
  });

  it('throws outside the years 0001–9999', () => {
    expect(() => utcToISODate(new Date('0000-12-31T00:00:00.000Z'))).toThrow(RangeError);
    expect(() => utcToISODate(new Date('+010000-01-01T00:00:00.000Z'))).toThrow(RangeError);
    expect(() => utcToISODate(new Date(Number.NaN))).toThrow(RangeError);
  });
});
