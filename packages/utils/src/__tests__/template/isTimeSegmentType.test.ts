import { describe, expect, it } from 'vitest';
import { isTimeSegmentType } from '../../template/isTimeSegmentType';

describe('isTimeSegmentType', () => {
  it('is true for the hours, minutes and seconds', () => {
    expect(isTimeSegmentType('H')).toBe(true);
    expect(isTimeSegmentType('M')).toBe(true);
    expect(isTimeSegmentType('S')).toBe(true);
  });

  it('is false for the day, month and year', () => {
    expect(isTimeSegmentType('d')).toBe(false);
    expect(isTimeSegmentType('m')).toBe(false);
    expect(isTimeSegmentType('y')).toBe(false);
  });
});
