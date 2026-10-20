import { describe, expect, it } from 'vitest';
import { parseISODateTimestamps } from '../../date';

describe('parseISODateTimestamps', () => {
  it('keeps undefined', () => {
    expect(parseISODateTimestamps(undefined)).toBeUndefined();
  });
  
  it('parses a single date into a local-midnight timestamp', () => {
    expect(parseISODateTimestamps('2026-01-15')).toBe(new Date(2026, 0, 15).getTime());
  });
  
  it('returns null for a single empty or malformed date', () => {
    expect(parseISODateTimestamps('')).toBeNull();
    expect(parseISODateTimestamps('2026-02-31')).toBeNull();
  });
  
  it('parses an array and drops empty or malformed dates', () => {
    expect(parseISODateTimestamps(['2026-01-10', '', '2026-02-31', '2026-01-15'])).toEqual([
      new Date(2026, 0, 10).getTime(),
      new Date(2026, 0, 15).getTime(),
    ]);
  });
});
