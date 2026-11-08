import { describe, expect, it } from 'vitest';
import { findEnabledIndex } from '../findEnabledIndex';

const items = [{ disabled: true }, {}, { disabled: true }, {}];

describe('findEnabledIndex', () => {
  it('skips disabled items forward and backward', () => {
    expect(findEnabledIndex(items, 0, 1)).toBe(1);
    expect(findEnabledIndex(items, 2, -1)).toBe(1);
  });

  it('returns -1 when nothing is enabled in that direction', () => {
    expect(findEnabledIndex(items, 0, -1)).toBe(-1);
    expect(findEnabledIndex(items, 4, 1)).toBe(-1);
  });
});
