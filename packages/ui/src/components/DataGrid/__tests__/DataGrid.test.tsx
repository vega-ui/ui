import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { FC } from 'react';
import { DataGrid, DataGridProps } from '../DataGrid';
import type { DataGridApiRef } from '../types';
import { DataGridCell, DataGridRow } from '../components';

const Grid3x2: FC<DataGridProps> = ({
 defaultActive = '0:0',
 wrap,
 rowDelta,
 exclude,
 apiRef,
 ...rest
}) => (
  <DataGrid
    defaultActive={defaultActive}
    wrap={wrap}
    rowDelta={rowDelta}
    exclude={exclude}
    apiRef={apiRef}
    tabIndex={0}
    {...rest}
  >
    <DataGridRow row={0}>
      <DataGridCell col={0} />
      <DataGridCell col={1} />
      <DataGridCell col={2} />
    </DataGridRow>
    <DataGridRow row={1}>
      <DataGridCell col={0} />
      <DataGridCell col={1} />
      <DataGridCell col={2} />
    </DataGridRow>
  </DataGrid>
);

const getCell = (row: number, col: number) => {
  const grid = screen.getByRole('grid');
  return grid.querySelector(`[data-row="${row}"][data-col="${col}"]`)
}

describe('DataGrid', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });
  
  it('renders grid, rows and cells; sets initial active cell tabIndex=0', () => {
    render(<Grid3x2 defaultActive='0:0' />);
    
    const grid = screen.getByRole('grid');
    expect(grid).toHaveAttribute('role', 'grid');
    
    // 2 rows x 3 cols
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(2);
    
    const cells = screen.getAllByRole('gridcell');
    expect(cells.length).toBe(6);
    
    // active = 0:0
    expect(getCell(0, 0)).toHaveAttribute('tabindex', '0');
    expect(getCell(0, 1)).toHaveAttribute('tabindex', '-1');
    expect(getCell(1, 0)).toHaveAttribute('tabindex', '-1');
  });
  
  it('ArrowRight moves focus to the next cell in the row', () => {
    render(<Grid3x2 defaultActive='0:0' />);
    const grid = screen.getByRole('grid');
    
    fireEvent.keyDown(grid, { key: 'ArrowRight' });
    
    expect(getCell(0, 0)).toHaveAttribute('tabindex', '-1');
    expect(getCell(0, 1)).toHaveAttribute('tabindex', '0');
  });
  
  it('ArrowLeft/Right do not move past row boundaries when wrap is not set', () => {
    render(<Grid3x2 defaultActive='0:2' />);
    const grid = screen.getByRole('grid');
    
    // at last col; ArrowRight should not move
    fireEvent.keyDown(grid, { key: 'ArrowRight' });
    expect(getCell(0, 2)).toHaveAttribute('tabindex', '0');
    
    // move left back to col=1, then to col=0
    fireEvent.keyDown(grid, { key: 'ArrowLeft' });
    expect(getCell(0, 1)).toHaveAttribute('tabindex', '0');
    
    fireEvent.keyDown(grid, { key: 'ArrowLeft' });
    expect(getCell(0, 0)).toHaveAttribute('tabindex', '0');
    
    // at first col; ArrowLeft should not move
    fireEvent.keyDown(grid, { key: 'ArrowLeft' });
    expect(getCell(0, 0)).toHaveAttribute('tabindex', '0');
  });
  
  it('ArrowUp/Down move focus vertically within column', () => {
    render(<Grid3x2 defaultActive='0:1' />);
    const grid = screen.getByRole('grid');
    
    fireEvent.keyDown(grid, { key: 'ArrowDown' });
    expect(getCell(1, 1)).toHaveAttribute('tabindex', '0');
    
    // bottom boundary: should not move further down
    fireEvent.keyDown(grid, { key: 'ArrowDown' });
    expect(getCell(1, 1)).toHaveAttribute('tabindex', '0');
    
    // go back up
    fireEvent.keyDown(grid, { key: 'ArrowUp' });
    expect(getCell(0, 1)).toHaveAttribute('tabindex', '0');
  });
  
  it('Home/End move focus to first/last cell in the current row', () => {
    render(<Grid3x2 defaultActive='0:1' />);
    const grid = screen.getByRole('grid');
    
    fireEvent.keyDown(grid, { key: 'Home' });
    expect(getCell(0, 0)).toHaveAttribute('tabindex', '0');
    
    fireEvent.keyDown(grid, { key: 'End' });
    expect(getCell(0, 2)).toHaveAttribute('tabindex', '0');
  });
  
  it('Ctrl+Home / Ctrl+End move focus to first/last cell in the grid', () => {
    render(<Grid3x2 defaultActive='0:1' />);
    const grid = screen.getByRole('grid');
    
    fireEvent.keyDown(grid, { key: 'Home', ctrlKey: true });
    expect(getCell(0, 0)).toHaveAttribute('tabindex', '0');
    
    fireEvent.keyDown(grid, { key: 'End', ctrlKey: true });
    expect(getCell(1, 2)).toHaveAttribute('tabindex', '0');
  });
  
  it('PageDown/PageUp honor rowDelta when provided', () => {
    render(<Grid3x2 defaultActive='0:1' rowDelta={1} />);
    const grid = screen.getByRole('grid');
    
    fireEvent.keyDown(grid, { key: 'PageDown' });
    expect(getCell(1, 1)).toHaveAttribute('tabindex', '0');
    
    // at the last row; further PageDown does not move
    fireEvent.keyDown(grid, { key: 'PageDown' });
    expect(getCell(1, 1)).toHaveAttribute('tabindex', '0');
    
    // go back with PageUp
    fireEvent.keyDown(grid, { key: 'PageUp' });
    expect(getCell(0, 1)).toHaveAttribute('tabindex', '0');
  });
  
  it('exclude prevents a cell from being registered (thus skipped in traversal)', () => {
    // Exclude cell (0,1). Moving right from (0,0) should land on (0,2) or stop,
    // depending on Grid implementation; at least (0,1) must not become active.
    const exclude = (key: string | number) => key === '0:1';
    
    render(<Grid3x2 defaultActive='0:0' exclude={exclude} />);
    const grid = screen.getByRole('grid');
    
    fireEvent.keyDown(grid, { key: 'ArrowRight' });
    
    // excluded cell must not be focusable
    expect(getCell(0, 1)).toHaveAttribute('tabindex', '-1');
    
    // Either we jumped to 0:2 or stayed at 0:0; assert not 0:1
    const is02Active = getCell(0, 2)?.getAttribute('tabindex') === '0';
    const is00Active = getCell(0, 0)?.getAttribute('tabindex') === '0';
    expect(is02Active || is00Active).toBe(true);
  });
  
  it('apiRef exposes grid and keyMap with registered cells', () => {
    const apiRef = { current: null as unknown as DataGridApiRef };
    render(<Grid3x2 defaultActive='1:2' apiRef={apiRef} />);
    
    expect(apiRef.current).toBeTruthy();
    expect(apiRef.current!.grid).toBeTruthy();
    expect(apiRef.current!.keyMap).toBeTruthy();
    
    // keyMap contains coordinates for known keys
    expect(apiRef.current!.keyMap.get('0:0')).toEqual([0, 0]);
    expect(apiRef.current!.keyMap.get('1:2')).toEqual([1, 2]);
  });
  
  it('onMove is called on Arrow navigation with axis/dir', () => {
    const onMove = vi.fn();
    render(<Grid3x2 defaultActive='0:0' onMove={onMove} />);
    const grid = screen.getByRole('grid');
    
    fireEvent.keyDown(grid, { key: 'ArrowRight' }); // axis=0, dir=1
    expect(onMove).toHaveBeenCalledTimes(1);
    const [, nodeR, axisR, dirR] = onMove.mock.calls[0];
    expect(axisR).toBe(0);
    expect(dirR).toBe(1);
    expect(nodeR?.key).toBe('0:1');
    
    fireEvent.keyDown(grid, { key: 'ArrowDown' }); // axis=1, dir=1
    expect(onMove).toHaveBeenCalledTimes(2);
    const [, nodeD, axisD, dirD] = onMove.mock.calls[1];
    expect(axisD).toBe(1);
    expect(dirD).toBe(1);
    expect(nodeD?.key).toBe('1:1');
  });
});
