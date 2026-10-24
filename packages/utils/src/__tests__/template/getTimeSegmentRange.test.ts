import { describe, expect, it } from 'vitest';
import { getTimeSegmentRange } from '../../template/getTimeSegmentRange';

describe('getTimeSegmentRange', () => {
  it('returns the range of the hours', () => {
    expect(getTimeSegmentRange('H')).toEqual([0, 23]);
  });

  it('returns the range of the minutes and seconds', () => {
    expect(getTimeSegmentRange('M')).toEqual([0, 59]);
    expect(getTimeSegmentRange('S')).toEqual([0, 59]);
  });
});
