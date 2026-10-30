import { describe, expect, it } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { Grid } from '@vega-ui/utils';
import { useGrid } from '../useGrid';

describe('useGrid', () => {
  it('returns a Grid', async () => {
    const { result } = await renderHook(() => useGrid());

    expect(result.current).toBeInstanceOf(Grid);
  });

  it('keeps the same Grid across renders', async () => {
    const { result, rerender } = await renderHook(() => useGrid());
    const grid = result.current;

    await rerender();

    expect(result.current).toBe(grid);
  });
});
