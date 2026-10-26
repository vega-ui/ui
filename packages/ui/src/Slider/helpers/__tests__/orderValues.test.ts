import { describe, expect, it } from 'vitest';
import { orderValues } from '../orderValues';

describe('orderValues', () => {
  it('keeps ordered values', () => {
    expect(orderValues([10, 50, 90], { min: 0, max: 100, gap: 0 })).toEqual([10, 50, 90]);
  });

  it('sorts values out of order', () => {
    expect(orderValues([80, 20], { min: 0, max: 100, gap: 0 })).toEqual([20, 80]);
    expect(orderValues([10, 90, 50, 60], { min: 0, max: 100, gap: 0 })).toEqual([10, 50, 60, 90]);
  });

  it('keeps the gap without float noise', () => {
    expect(orderValues([0.5, 0.6], { min: 0, max: 1, gap: 0.2 })).toEqual([0.4, 0.6]);
  });
});
