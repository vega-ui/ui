import { describe, expect, it } from 'vitest';
import { addISODays } from '..';

describe('addISODays', () => {
  it('adds days across month and year boundaries', () => {
    expect(addISODays('2026-01-31', 1)).toBe('2026-02-01');
    expect(addISODays('2026-12-31', 1)).toBe('2027-01-01');
    expect(addISODays('2024-02-28', 1)).toBe('2024-02-29');
  });

  it('subtracts days', () => {
    expect(addISODays('2026-03-01', -1)).toBe('2026-02-28');
  });

  it('throws outside the years 0001–9999', () => {
    expect(addISODays('0001-01-02', -1)).toBe('0001-01-01');
    expect(() => addISODays('0001-01-01', -1)).toThrow(RangeError);
    expect(() => addISODays('9999-12-31', 1)).toThrow(RangeError);
  });
});
