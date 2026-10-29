import { describe, expect, it } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { BiMap } from '@vega-ui/utils';
import { useBiMap } from '../useBiMap';

describe('useBiMap', () => {
  it('returns a BiMap seeded with the initial entries', async () => {
    const { result } = await renderHook(() => useBiMap([['a', 1]]));

    expect(result.current).toBeInstanceOf(BiMap);
    expect(result.current.getByKey('a')).toBe(1);
    expect(result.current.getByValue(1)).toBe('a');
  });

  it('keeps the same BiMap across renders and ignores new initial entries', async () => {
    const { result, rerender } = await renderHook((props?: { initial: Array<[string, number]> }) => useBiMap(props?.initial ?? [['a', 1]]));
    const map = result.current;

    await rerender({ initial: [['b', 2]] });

    expect(result.current).toBe(map);
    expect(result.current.getByKey('a')).toBe(1);
    expect(result.current.getByKey('b')).toBeUndefined();
  });
});
