import { describe, expect, it } from 'vitest';
import { findISODateInRange } from '../../date';

describe('findISODateInRange', () => {
  it('returns the first date within the range', () => {
    expect(findISODateInRange(['2024-02-10', '2024-03-05', '2024-03-20'], '2024-03-01', '2024-03-31')).toBe('2024-03-05');
  });

  it('includes both bounds', () => {
    expect(findISODateInRange(['2024-03-31'], '2024-03-01', '2024-03-31')).toBe('2024-03-31');
    expect(findISODateInRange(['2024-03-01'], '2024-03-01', '2024-03-31')).toBe('2024-03-01');
  });

  it('skips empty values', () => {
    expect(findISODateInRange([null, undefined, '', '2024-03-02'], '2024-03-01', '2024-03-31')).toBe('2024-03-02');
  });

  it('returns undefined when no date fits', () => {
    expect(findISODateInRange(['2024-04-01'], '2024-03-01', '2024-03-31')).toBeUndefined();
    expect(findISODateInRange([], '2024-03-01', '2024-03-31')).toBeUndefined();
  });
});
