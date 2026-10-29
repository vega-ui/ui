import { describe, expect, it } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { useMap } from '../useMap';

describe('useMap', () => {
  it('returns an empty map', async () => {
    const { result } = await renderHook(() => useMap<string, number>());

    expect(result.current).toBeInstanceOf(Map);
    expect(result.current.size).toBe(0);
  });

  it('keeps the same map with its entries across renders', async () => {
    const { result, rerender } = await renderHook(() => useMap<string, number>());
    const map = result.current;
    map.set('a', 1);

    await rerender();

    expect(result.current).toBe(map);
    expect(result.current.get('a')).toBe(1);
  });
});
