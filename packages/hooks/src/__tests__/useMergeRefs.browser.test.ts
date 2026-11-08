import { describe, expect, it, vi } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { useMergeRefs } from '../useMergeRefs';

describe('useMergeRefs', () => {
  it('keeps its identity while the refs stay the same', async () => {
    const first = vi.fn();
    const second = { current: null };
    const { result, rerender } = await renderHook(() => useMergeRefs([first, second]));
    const merged = result.current;

    await rerender();

    expect(result.current).toBe(merged);
  });

  it('changes its identity when a ref changes', async () => {
    const first = vi.fn();
    const { result, rerender } = await renderHook((props?: { ref: () => void }) => useMergeRefs([props?.ref ?? first]));
    const merged = result.current;

    await rerender({ ref: vi.fn() });

    expect(result.current).not.toBe(merged);
  });
});
