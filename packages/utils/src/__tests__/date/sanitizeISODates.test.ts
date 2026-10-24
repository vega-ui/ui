import { describe, expect, it } from 'vitest';
import { sanitizeISODates } from '../../date';

describe('sanitizeISODates', () => {
  it('keeps undefined', () => {
    expect(sanitizeISODates(undefined)).toBeUndefined();
  });
  
  it('keeps an existing single date', () => {
    expect(sanitizeISODates('2026-01-15')).toBe('2026-01-15');
  });
  
  it('returns null for an empty or malformed single date', () => {
    expect(sanitizeISODates('')).toBeNull();
    expect(sanitizeISODates('2026-02-31')).toBeNull();
  });
  
  it('drops empty or malformed dates from an array', () => {
    expect(sanitizeISODates(['2026-01-10', '', '2026-02-31', '2026-01-15'])).toEqual(['2026-01-10', '2026-01-15']);
  });
});
