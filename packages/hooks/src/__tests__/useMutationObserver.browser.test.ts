import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { useMutationObserver } from '../useMutationObserver';

const createTarget = () => document.body.appendChild(document.createElement('div'));

describe('useMutationObserver', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('observes child list changes by default', async () => {
    const target = createTarget();
    const callback = vi.fn();
    await renderHook(() => useMutationObserver({ current: target }, callback));

    target.appendChild(document.createElement('span'));

    await expect.poll(() => callback).toHaveBeenCalledOnce();
    expect(callback.mock.calls[0][0][0].type).toBe('childList');
  });

  it('observes with the given options', async () => {
    const target = createTarget();
    const callback = vi.fn();
    await renderHook(() => useMutationObserver({ current: target }, callback, { attributes: true }));

    target.setAttribute('data-state', 'open');

    await expect.poll(() => callback).toHaveBeenCalledOnce();
    expect(callback.mock.calls[0][0][0].attributeName).toBe('data-state');
  });

  it('calls the latest callback', async () => {
    const target = createTarget();
    const first = vi.fn();
    const second = vi.fn();
    const { rerender } = await renderHook((props?: { callback: () => void }) => useMutationObserver({ current: target }, props?.callback ?? first));

    await rerender({ callback: second });
    target.appendChild(document.createElement('span'));

    await expect.poll(() => second).toHaveBeenCalledOnce();
    expect(first).not.toHaveBeenCalled();
  });

  it('does not reconnect for equal inline options', async () => {
    const ref = { current: createTarget() };
    const disconnect = vi.spyOn(MutationObserver.prototype, 'disconnect');
    const { rerender } = await renderHook(() => useMutationObserver(ref, () => {}, { attributes: true }));

    await rerender();

    expect(disconnect).not.toHaveBeenCalled();
    disconnect.mockRestore();
  });

  it('stops observing on unmount', async () => {
    const target = createTarget();
    const callback = vi.fn();
    const { unmount } = await renderHook(() => useMutationObserver({ current: target }, callback));

    await unmount();
    target.appendChild(document.createElement('span'));
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(callback).not.toHaveBeenCalled();
  });

  it('does nothing without an element', async () => {
    const { unmount } = await renderHook(() => useMutationObserver({ current: null }, () => {}));

    await unmount();
  });
});
