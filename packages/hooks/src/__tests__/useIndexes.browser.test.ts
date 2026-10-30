import { describe, expect, it } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { act } from 'react';
import { useIndexes } from '../useIndexes';

describe('useIndexes', () => {
  it('starts forward from start', async () => {
    const { result } = await renderHook(() => useIndexes({ start: 0, startDir: 1, size: 3, shift: 2 }));

    expect(result.current.indexes).toEqual([0, 1, 2]);
  });

  it('starts backward from start', async () => {
    const { result } = await renderHook(() => useIndexes({ start: 0, startDir: -1, size: 3, shift: 2 }));

    expect(result.current.indexes).toEqual([-2, -1, 0]);
  });

  it('extends forward by shift', async () => {
    const { result } = await renderHook(() => useIndexes({ start: 0, startDir: 1, size: 3, shift: 2 }));

    await act(() => result.current.extend(1));

    expect(result.current.indexes).toEqual([0, 1, 2, 3, 4]);
  });

  it('extends backward by shift', async () => {
    const { result } = await renderHook(() => useIndexes({ start: 0, startDir: 1, size: 3, shift: 2 }));

    await act(() => result.current.extend(-1));

    expect(result.current.indexes).toEqual([-2, -1, 0, 1, 2]);
  });

  it('centers on an index', async () => {
    const { result } = await renderHook(() => useIndexes({ start: 0, startDir: 1, size: 5, shift: 2 }));

    await act(() => result.current.center(10));

    expect(result.current.indexes).toEqual([8, 9, 10, 11, 12]);
  });

  it('resets to start', async () => {
    const { result } = await renderHook(() => useIndexes({ start: 0, startDir: 1, size: 3, shift: 2 }));

    await act(() => result.current.extend(1));
    await act(() => result.current.reset());

    expect(result.current.indexes).toEqual([0, 1, 2]);
  });

  it('resets to a given start', async () => {
    const { result } = await renderHook(() => useIndexes({ start: 0, startDir: 1, size: 3, shift: 2 }));

    await act(() => result.current.reset(5));

    expect(result.current.indexes).toEqual([5, 6, 7]);
  });
});
