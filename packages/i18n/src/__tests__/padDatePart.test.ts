import { describe, expect, it } from 'vitest';
import { padDatePart } from '..';

describe('padDatePart', () => {
  it('pads to two digits by default', () => {
    expect(padDatePart(5)).toBe('05');
    expect(padDatePart(12)).toBe('12');
  });

  it('pads to the given length', () => {
    expect(padDatePart(42, 4)).toBe('0042');
    expect(padDatePart(2026, 4)).toBe('2026');
  });
});
