import { describe, expect, it } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { useBiMap } from '../useBiMap';

describe('useBiMap', () => {
  it('keeps the same BiMap across renders and ignores new initial entries', async () => {
    const { result, rerender } = await renderHook((props?: { initial: Array<[string, number]> }) => useBiMap(props?.initial ?? [['a', 1]]));
    const map = result.current;

    await rerender({ initial: [['b', 2]] });

    expect(result.current).toBe(map);
    expect(result.current.getByKey('a')).toBe(1);
    expect(result.current.getByKey('b')).toBeUndefined();
  });
});
