import { afterEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { renderHook } from 'vitest-browser-react';
import { useResize } from '../useResize';

describe('useResize', () => {
  afterEach(async () => {
    vi.restoreAllMocks();
    await page.viewport(414, 896);
  });

  it('returns the window size', async () => {
    const { result } = await renderHook(() => useResize());

    expect(result.current).toEqual({ width: window.innerWidth, height: window.innerHeight });
  });

  it('follows the window size', async () => {
    const { result } = await renderHook(() => useResize());

    await page.viewport(500, 600);

    await expect.poll(() => result.current).toEqual({ width: 500, height: 600 });
  });

  it('subscribes to resize once', async () => {
    const addEventListener = vi.spyOn(window, 'addEventListener');
    const { result } = await renderHook(() => useResize());

    await page.viewport(500, 600);
    await expect.poll(() => result.current.width).toBe(500);
    await page.viewport(600, 700);
    await expect.poll(() => result.current.width).toBe(600);

    const resizeListeners = addEventListener.mock.calls.filter(([type]) => type === 'resize');
    expect(resizeListeners).toHaveLength(1);
  });
});
