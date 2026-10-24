import { describe, expect, it } from 'vitest';
import { getISOTimePart } from '../../date';

describe('getISOTimePart', () => {
  it('returns the time of a date time', () => {
    expect(getISOTimePart('2026-03-15T09:30')).toBe('09:30');
    expect(getISOTimePart('2026-03-15T09:30:15')).toBe('09:30:15');
  });

  it('returns undefined without a time', () => {
    expect(getISOTimePart('2026-03-15')).toBeUndefined();
    expect(getISOTimePart(undefined)).toBeUndefined();
  });
});
