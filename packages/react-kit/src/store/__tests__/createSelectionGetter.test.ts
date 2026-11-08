import { describe, expect, it, vi } from 'vitest';
import { createStore } from '../createStore';
import { createSelectionGetter } from '../createSelectionGetter';

describe('createSelectionGetter', () => {
  it('returns the cached selection while the state is the same', () => {
    const store = createStore({ count: 0 });
    const selector = vi.fn((state: { count: number }) => ({ count: state.count }));
    const getSelection = createSelectionGetter(store, selector);

    const first = getSelection();

    expect(getSelection()).toBe(first);
    expect(selector).toHaveBeenCalledOnce();
  });

  it('selects again after the state changes', () => {
    const store = createStore({ count: 0 });
    const getSelection = createSelectionGetter(store, (state) => state.count);

    getSelection();
    store.set({ count: 1 });

    expect(getSelection()).toBe(1);
  });
});
