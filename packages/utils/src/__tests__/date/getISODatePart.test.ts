import { describe, expect, it } from 'vitest';
import { getISODatePart } from '../../date';

describe('getISODatePart', () => {
  it('returns the date of a date time', () => {
    expect(getISODatePart('2026-03-15T09:30')).toBe('2026-03-15');
    expect(getISODatePart('2026-03-15T09:30:15')).toBe('2026-03-15');
  });

  it('returns a date as is', () => {
    expect(getISODatePart('2026-03-15')).toBe('2026-03-15');
  });

  it('returns undefined for undefined', () => {
    expect(getISODatePart(undefined)).toBeUndefined();
  });
});
