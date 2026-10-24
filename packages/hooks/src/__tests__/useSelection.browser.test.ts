import { describe, expect, it } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { useSelection } from '../useSelection';

interface Cell {
  row: number;
  col: number;
}

const equals = (a: Cell, b: Cell) => a.row === b.row && a.col === b.col;

describe('useSelection', () => {
  it('matches disabled keys with equals', async () => {
    const { result } = await renderHook(() => useSelection<Cell, 'single'>({
      selection: 'single',
      equals,
      disabled: [{ row: 1, col: 2 }],
    }));

    expect(result.current.isDisabled({ row: 1, col: 2 })).toBe(true);
    expect(result.current.isDisabled({ row: 2, col: 1 })).toBe(false);
  });

  it('matches a single disabled key with equals', async () => {
    const { result } = await renderHook(() => useSelection<Cell, 'single'>({
      selection: 'single',
      equals,
      disabled: { row: 1, col: 2 },
    }));

    expect(result.current.isDisabled({ row: 1, col: 2 })).toBe(true);
    expect(result.current.isDisabled({ row: 1, col: 3 })).toBe(false);
  });

  it('does not select a disabled key matched with equals', async () => {
    const { result, act } = await renderHook(() => useSelection<Cell, 'multiple'>({
      selection: 'multiple',
      equals,
      disabled: [{ row: 0, col: 0 }],
    }));

    await act(() => result.current.select({ row: 0, col: 0 }));
    await act(() => result.current.select({ row: 0, col: 1 }));

    expect(result.current.selected).toEqual([{ row: 0, col: 1 }]);
  });

  it('compares primitives by value without equals', async () => {
    const { result } = await renderHook(() => useSelection<string, 'single'>({
      selection: 'single',
      disabled: ['2026-01-10'],
    }));

    expect(result.current.isDisabled('2026-01-10')).toBe(true);
    expect(result.current.isDisabled('2026-01-11')).toBe(false);
  });
});
