import { describe, expect, it } from 'vitest';
import { isoDateToUTC } from '..';

describe('isoDateToUTC', () => {
  it('returns UTC midnight of the day', () => {
    expect(isoDateToUTC('2026-02-15').toISOString()).toBe('2026-02-15T00:00:00.000Z');
  });

  it('keeps years before 100', () => {
    const date = isoDateToUTC('0042-03-01');

    expect(date.getUTCFullYear()).toBe(42);
    expect(date.getUTCMonth()).toBe(2);
    expect(date.getUTCDate()).toBe(1);
  });
});
