import { describe, expect, it, vi } from 'vitest';
import { togglePopover } from '../togglePopover';

describe('togglePopover', () => {
  it('toggles the popover with the given force', () => {
    const el = { togglePopover: vi.fn() } as unknown as HTMLElement;

    togglePopover(el, true);

    expect(el.togglePopover).toHaveBeenCalledExactlyOnceWith(true);
  });

  it('does nothing when the Popover API is not supported', () => {
    const el = {} as HTMLElement;

    expect(() => togglePopover(el, true)).not.toThrow();
  });

  it('does nothing without an element', () => {
    expect(() => togglePopover(null, true)).not.toThrow();
  });
});
