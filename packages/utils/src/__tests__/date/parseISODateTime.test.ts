import { describe, expect, it } from 'vitest';
import { parseISODateTime } from '../../date';

describe('parseISODateTime', () => {
  it('parses hours and minutes as local time', () => {
    const date = parseISODateTime('2025-05-12T14:30');

    expect(date?.getDate()).toBe(12);
    expect(date?.getHours()).toBe(14);
    expect(date?.getMinutes()).toBe(30);
    expect(date?.getSeconds()).toBe(0);
  });

  it('parses seconds', () => {
    expect(parseISODateTime('2025-05-12T14:30:15')?.getSeconds()).toBe(15);
  });

  it.each([
    '',
    '2025-05-12',
    '2025-05-12 14:30',
    '2025-05-12T24:00',
    '2025-05-12T14:60',
    '2025-02-31T10:00',
  ])('returns undefined for %j', (value) => {
    expect(parseISODateTime(value)).toBeUndefined();
  });
  
  it('returns undefined without a value', () => {
    expect(parseISODateTime(undefined)).toBeUndefined();
  });
});
