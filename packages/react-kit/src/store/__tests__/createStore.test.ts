import { describe, expect, it, vi } from 'vitest';
import { createStore } from '../createStore';

describe('createStore', () => {
  it('merges a partial state and notifies the listeners', () => {
    const store = createStore({ count: 0, name: 'a' });
    const listener = vi.fn();
    store.subscribe(listener);

    store.set({ count: 1 });

    expect(store.get()).toEqual({ count: 1, name: 'a' });
    expect(listener).toHaveBeenCalledOnce();
  });

  it('merges the result of an updater', () => {
    const store = createStore({ count: 1 });

    store.set((state) => ({ count: state.count + 1 }));

    expect(store.get()).toEqual({ count: 2 });
  });

  it('keeps the state and stays silent when nothing changes', () => {
    const store = createStore({ count: 0 });
    const state = store.get();
    const listener = vi.fn();
    store.subscribe(listener);

    store.set({ count: 0 });

    expect(store.get()).toBe(state);
    expect(listener).not.toHaveBeenCalled();
  });

  it('stops notifying after unsubscribing', () => {
    const store = createStore({ count: 0 });
    const listener = vi.fn();
    const unsubscribe = store.subscribe(listener);

    unsubscribe();
    store.set({ count: 1 });

    expect(listener).not.toHaveBeenCalled();
  });
});
