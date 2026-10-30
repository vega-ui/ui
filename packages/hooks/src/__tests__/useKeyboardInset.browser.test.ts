import { describe, expect, it } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { useKeyboardInset } from '../useKeyboardInset';

describe('useKeyboardInset', () => {
  it('returns 0 while the visual viewport fills the window', async () => {
    const { result } = await renderHook(() => useKeyboardInset());

    expect(result.current).toBe(0);
  });
});
