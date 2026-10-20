import { describe, expect, it } from 'vitest';
import { formatISODate, parseISODate } from '../../date';

describe('parseISODate', () => {
  it('parses into local midnight', () => {
    const date = parseISODate('2025-05-12');

    expect(date?.getFullYear()).toBe(2025);
    expect(date?.getMonth()).toBe(4);
    expect(date?.getDate()).toBe(12);
    expect(date?.getHours()).toBe(0);
  });

  it('round-trips with formatISODate', () => {
    expect(formatISODate(parseISODate('2024-02-29')!)).toBe('2024-02-29');
  });

  it('keeps years below 100', () => {
    expect(parseISODate('0087-01-05')?.getFullYear()).toBe(87);
  });

  it.each([
    '',
    '2025-5-12',
    '12.05.2025',
    '2025-05-12T10:00',
    '2025-13-01',
    '2025-02-31',
    '2023-02-29',
    '2025-00-10',
  ])('returns undefined for %j', (value) => {
    expect(parseISODate(value)).toBeUndefined();
  });
  
  it('returns undefined without a value', () => {
    expect(parseISODate(undefined)).toBeUndefined();
  });
});
