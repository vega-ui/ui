import { describe, expect, it } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { useRefMap } from '../useRefMap';

describe('useRefMap', () => {
  it('stores an element by key', async () => {
    const { result } = await renderHook(() => useRefMap<string, HTMLElement>());
    const element = document.createElement('div');

    result.current.itemRef('a')(element);

    expect(result.current.getItem('a')).toBe(element);
    expect(result.current.map.current.get('a')).toBe(element);
  });

  it('removes an element by key', async () => {
    const { result } = await renderHook(() => useRefMap<string, HTMLElement>());

    result.current.itemRef('a')(document.createElement('div'));
    result.current.removeItemRef('a');

    expect(result.current.getItem('a')).toBeUndefined();
  });

  it('starts from the default map', async () => {
    const element = document.createElement('div');
    const { result } = await renderHook(() => useRefMap(new Map([['a', element]])));

    expect(result.current.getItem('a')).toBe(element);
  });

  it('keeps the map and functions across renders', async () => {
    const { result, rerender } = await renderHook(() => useRefMap<string, HTMLElement>());
    const { map, itemRef, removeItemRef, getItem } = result.current;

    await rerender();

    expect(result.current.map).toBe(map);
    expect(result.current.itemRef).toBe(itemRef);
    expect(result.current.removeItemRef).toBe(removeItemRef);
    expect(result.current.getItem).toBe(getItem);
  });
});
