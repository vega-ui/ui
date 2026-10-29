import { describe, expect, it, vi } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { useEventCallback } from '../useEventCallback';

describe('useEventCallback', () => {
  it('keeps its identity across renders', async () => {
    const { result, rerender } = await renderHook((props?: { fn: () => void }) => useEventCallback(props?.fn ?? (() => {})));
    const callback = result.current;

    await rerender({ fn: () => {} });

    expect(result.current).toBe(callback);
  });

  it('calls the latest function with its arguments', async () => {
    const first = vi.fn();
    const second = vi.fn(() => 'result');
    const { result, rerender } = await renderHook((props?: { fn: (value: number) => unknown }) => useEventCallback(props?.fn ?? first));

    await rerender({ fn: second });

    expect(result.current(1)).toBe('result');
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledExactlyOnceWith(1);
  });

  it('returns undefined without a function', async () => {
    const { result } = await renderHook(() => useEventCallback<[], void>(undefined));

    expect(result.current()).toBeUndefined();
  });

  it('throws when called during render', async () => {
    let error: unknown;

    await renderHook(() => {
      const callback = useEventCallback(() => {});
      try {
        callback();
      } catch (e) {
        error = e;
      }
    });

    expect(error).toBeInstanceOf(Error);
  });
});
