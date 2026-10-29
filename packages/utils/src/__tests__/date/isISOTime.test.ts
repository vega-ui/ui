import { describe, expect, it } from 'vitest';
import { isISOTime } from '../../date';

describe('isISOTime', () => {
  it('accepts HH:mm and HH:mm:ss', () => {
    expect(isISOTime('09:30')).toBe(true);
    expect(isISOTime('23:59:59')).toBe(true);
  });

  it('rejects malformed and out of range values', () => {
    expect(isISOTime(undefined)).toBe(false);
    expect(isISOTime('')).toBe(false);
    expect(isISOTime('9:30')).toBe(false);
    expect(isISOTime('24:00')).toBe(false);
    expect(isISOTime('09:60')).toBe(false);
    expect(isISOTime('2026-01-01T09:30')).toBe(false);
  });
});
