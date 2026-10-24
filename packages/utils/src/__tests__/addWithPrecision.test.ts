import { describe, expect, it } from 'vitest';
import { addWithPrecision } from '../addWithPrecision';

describe('addWithPrecision', () => {
  it('drops the floating point error of the sum', () => {
    expect(addWithPrecision(0.7, 0.1)).toBe(0.8);
    expect(addWithPrecision(0.2, 0.1)).toBe(0.3);
    expect(addWithPrecision(1.1, -0.1)).toBe(1);
  });

  it('keeps the decimals of the value', () => {
    expect(addWithPrecision(0.75, 0.1)).toBe(0.85);
  });

  it('keeps the decimals of the delta', () => {
    expect(addWithPrecision(3, 0.05)).toBe(3.05);
  });

  it('adds integers as is', () => {
    expect(addWithPrecision(3, 5)).toBe(8);
  });
});
