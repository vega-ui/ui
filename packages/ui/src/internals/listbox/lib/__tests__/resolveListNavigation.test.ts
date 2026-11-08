import { describe, expect, it } from 'vitest';
import { resolveListNavigation } from '../resolveListNavigation';

const items = Array.from({ length: 25 }, (_, index) => ({ disabled: index === 1 || index === 20 }));

describe('resolveListNavigation', () => {
  it('ignores other keys', () => {
    expect(resolveListNavigation('a', items, 0)).toBeNull();
  });

  it('skips disabled items and stops at the ends', () => {
    expect(resolveListNavigation('ArrowDown', items, 0)).toBe(2);
    expect(resolveListNavigation('ArrowUp', items, 2)).toBe(0);
    expect(resolveListNavigation('ArrowUp', items, 0)).toBe(-1);
    expect(resolveListNavigation('ArrowDown', items, 24)).toBe(-1);
  });

  it('starts from the matching end without an active item', () => {
    expect(resolveListNavigation('ArrowDown', items, null)).toBe(0);
    expect(resolveListNavigation('ArrowUp', items, null)).toBe(24);
  });

  it('jumps by a page, clamped to the list, past disabled items', () => {
    expect(resolveListNavigation('PageDown', items, 10)).toBe(21);
    expect(resolveListNavigation('PageDown', items, 20)).toBe(24);
    expect(resolveListNavigation('PageUp', items, 5)).toBe(0);
  });
});
