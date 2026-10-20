import { describe, expect, it } from 'vitest';
import { formatISODateTime } from '../../date';

describe('formatISODateTime', () => {
  it('omits zero seconds', () => {
    expect(formatISODateTime(new Date(2025, 4, 12, 9, 5))).toBe('2025-05-12T09:05');
  });

  it('keeps non-zero seconds', () => {
    expect(formatISODateTime(new Date(2025, 4, 12, 9, 5, 7))).toBe('2025-05-12T09:05:07');
  });
  
  it('returns an empty string without a date', () => {
    expect(formatISODateTime(undefined)).toBe('');
  });
});
