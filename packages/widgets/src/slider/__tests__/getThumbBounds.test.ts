import { describe, expect, it } from 'vitest';
import { getThumbBounds } from '../getThumbBounds';

describe('getThumbBounds', () => {
  it('uses min and max for a single thumb', () => {
    expect(getThumbBounds([50], 0, { min: 0, max: 100, gap: 0 })).toEqual([0, 100]);
  });

  it('uses the neighbours for a middle thumb', () => {
    expect(getThumbBounds([10, 50, 90], 1, { min: 0, max: 100, gap: 0 })).toEqual([10, 90]);
  });

  it('keeps the gap from the neighbours without float noise', () => {
    expect(getThumbBounds([0.1, 0.5, 0.9], 1, { min: 0, max: 1, gap: 0.2 })).toEqual([0.3, 0.7]);
  });
});
