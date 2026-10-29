import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { useResizeObserver } from '../useResizeObserver';

const createTarget = () => {
  const target = document.createElement('div');
  target.style.width = '100px';
  target.style.height = '50px';
  return document.body.appendChild(target);
};

describe('useResizeObserver', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('reports the element size', async () => {
    const target = createTarget();
    const callback = vi.fn();
    await renderHook(() => useResizeObserver({ current: target }, callback));

    await expect.poll(() => callback).toHaveBeenCalled();
    expect(callback.mock.calls[0][0].contentRect.width).toBe(100);
  });

  it('reports a resize', async () => {
    const target = createTarget();
    const callback = vi.fn();
    await renderHook(() => useResizeObserver({ current: target }, callback));
    await expect.poll(() => callback).toHaveBeenCalled();

    target.style.width = '200px';

    await expect.poll(() => callback.mock.lastCall?.[0].contentRect.width).toBe(200);
  });

  it('observes the content box by default', async () => {
    const target = createTarget();
    const observe = vi.spyOn(ResizeObserver.prototype, 'observe');
    await renderHook(() => useResizeObserver({ current: target }, () => {}));

    expect(observe).toHaveBeenCalledWith(target, { box: 'content-box' });
  });

  it('observes the given box', async () => {
    const target = createTarget();
    const observe = vi.spyOn(ResizeObserver.prototype, 'observe');
    await renderHook(() => useResizeObserver({ current: target }, () => {}, { box: 'border-box' }));

    expect(observe).toHaveBeenCalledWith(target, { box: 'border-box' });
  });

  it('calls the latest callback', async () => {
    const target = createTarget();
    const first = vi.fn();
    const second = vi.fn();
    const { rerender } = await renderHook((props?: { callback: () => void }) => useResizeObserver({ current: target }, props?.callback ?? first));

    await rerender({ callback: second });

    await expect.poll(() => second).toHaveBeenCalled();
    expect(first).not.toHaveBeenCalled();
  });

  it('stops observing on unmount', async () => {
    const target = createTarget();
    const disconnect = vi.spyOn(ResizeObserver.prototype, 'disconnect');
    const { unmount } = await renderHook(() => useResizeObserver({ current: target }, () => {}));

    await unmount();

    expect(disconnect).toHaveBeenCalledOnce();
  });
});
