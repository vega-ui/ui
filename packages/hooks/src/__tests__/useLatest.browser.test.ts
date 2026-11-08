import { describe, expect, it } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { useLatest } from '../useLatest';

describe('useLatest', () => {
  it('holds the latest value after a rerender', async () => {
    const { result, rerender } = await renderHook((props?: { value: string }) => useLatest(props?.value ?? 'a'));

    await rerender({ value: 'b' });

    expect(result.current.current).toBe('b');
  });
});
