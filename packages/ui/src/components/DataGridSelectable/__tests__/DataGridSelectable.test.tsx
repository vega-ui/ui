import { FC } from 'react'
import { describe, it, expect, vi, beforeEach, afterEach, beforeAll } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import { DataGridSelectable, DataGridSelectableProps } from '../DataGridSelectable'
import { DataGridSelectableCell, DataGridSelectableRow, DataGridSelectableRowGroup } from '../components'

const getCell = (row: number, col: number) => {
  const grid = screen.getByRole('grid');
  return grid.querySelector(`[data-row="${row}"][data-col="${col}"]`)
}

const Grid3x2Selectable: FC<DataGridSelectableProps> = ({
  defaultActive = '0:0',
  selection = 'single',
  ...rest
}) => (
  <DataGridSelectable
    defaultActive={defaultActive}
    selection={selection}
    {...rest}
  >
    <DataGridSelectableRowGroup>
      <DataGridSelectableRow row={0}>
        <DataGridSelectableCell col={0}>0:0</DataGridSelectableCell>
        <DataGridSelectableCell col={1}>0:1</DataGridSelectableCell>
        <DataGridSelectableCell col={2}>0:2</DataGridSelectableCell>
      </DataGridSelectableRow>
      <DataGridSelectableRow row={1}>
        <DataGridSelectableCell col={0}>1:0</DataGridSelectableCell>
        <DataGridSelectableCell col={1}>1:1</DataGridSelectableCell>
        <DataGridSelectableCell col={2}>1:2</DataGridSelectableCell>
      </DataGridSelectableRow>
    </DataGridSelectableRowGroup>
  </DataGridSelectable>
);

describe('DataGridSelectable', () => {
  let elementFromPointMock: ReturnType<typeof vi.fn>
  
  beforeAll(() => {
    elementFromPointMock = vi.fn()
    Object.defineProperty(document, 'elementFromPoint', {
      configurable: true,
      writable: true,
      value: elementFromPointMock,
    })
  })
  
  beforeEach(() => {
    vi.useFakeTimers();
  });
  
  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });
  
  it('renders grid, rows, selectable cells', () => {
    render(<Grid3x2Selectable defaultActive='0:0' />);
    
    const grid = screen.getByRole('grid');
    expect(grid).toHaveAttribute('role', 'grid');
    
    expect(screen.getAllByRole('row').length).toBe(2);
    expect(screen.getAllByRole('gridcell').length).toBe(6);
    
    // active = 0:0
    expect(getCell(0, 0)).toHaveAttribute('tabindex', '0');
    expect(getCell(0, 1)).toHaveAttribute('tabindex', '-1');
  });
  
  it('single: selects on click and calls onSelectCell', () => {
    const onSelectCell = vi.fn();
    render(<Grid3x2Selectable selection='single' onSelectCell={onSelectCell} />);
    
    fireEvent.click(getCell(0, 1)!);
    expect(getCell(0, 1)).toHaveAttribute('aria-selected', 'true');
    expect(onSelectCell).toHaveBeenCalledTimes(1);
    expect(onSelectCell.mock.calls[0][0]).toEqual('0:1');
    
    // selecting another replaces previous
    fireEvent.click(getCell(1, 2)!);
    expect(getCell(0, 1)).toHaveAttribute('aria-selected', 'false');
    expect(getCell(1, 2)).toHaveAttribute('aria-selected', 'true');
  });
  
  it('multiple: toggles independent cells on click', () => {
    render(<Grid3x2Selectable selection='multiple' />);
    
    fireEvent.click(getCell(0, 0)!);
    fireEvent.click(getCell(0, 2)!);
    
    expect(getCell(0, 0)).toHaveAttribute('aria-selected', 'true');
    expect(getCell(0, 2)).toHaveAttribute('aria-selected', 'true');
    
    // toggle off
    fireEvent.click(getCell(0, 0)!);
    expect(getCell(0, 0)).toHaveAttribute('aria-selected', 'false');
    expect(getCell(0, 2)).toHaveAttribute('aria-selected', 'true');
  });
  
  it('range: Shift+Arrow expands selection from active', () => {
    render(<Grid3x2Selectable selection='range' defaultActive='0:0' />);
    const grid = screen.getByRole('grid');
    
    // anchor
    fireEvent.click(getCell(0, 0)!);
    expect(getCell(0, 0)).toHaveAttribute('aria-selected', 'true');
    
    // -> 0:1
    fireEvent.keyDown(grid, { key: 'ArrowRight', shiftKey: true });
    expect(getCell(0, 0)).toHaveAttribute('aria-selected', 'true');
    expect(getCell(0, 1)).toHaveAttribute('aria-selected', 'true');
    
    // -> 0:2
    fireEvent.keyDown(grid, { key: 'ArrowRight', shiftKey: true });
    expect(getCell(0, 2)).toHaveAttribute('aria-selected', 'true');
    
    // down to 1:2
    fireEvent.keyDown(grid, { key: 'ArrowDown', shiftKey: true });
    expect(getCell(1, 2)).toHaveAttribute('aria-selected', 'true');
  });
  
  it('range: pointer drag from edge expands selection', () => {
    render(<Grid3x2Selectable selection='range' defaultActive='0:0' />);
    const grid = screen.getByRole('grid');
    
    // create edge (0:0..0:1)
    fireEvent.click(getCell(0, 0)!);
    fireEvent.keyDown(grid, { key: 'ArrowRight', shiftKey: true });
    expect(getCell(0, 1)).toHaveAttribute('aria-selected', 'true');
    
    // drag edge -> hover another cell
    fireEvent.pointerDown(getCell(0, 1)!);
    elementFromPointMock.mockReturnValue(getCell(1, 2))
    fireEvent.pointerMove(getCell(1, 2)!);
    
    expect(getCell(0, 2)).toHaveAttribute('aria-selected', 'true');
    expect(getCell(1, 2)).toHaveAttribute('aria-selected', 'true');
  });
  
  it('disabled predicate prevents selection', () => {
    const disabled = (key: string | number) => key === '0:1' || key === '1:2';
    render(<Grid3x2Selectable selection='multiple' disabled={disabled} />);
    
    fireEvent.click(getCell(0, 1)!);
    expect(getCell(0, 1)).toHaveAttribute('aria-selected', 'false');
    
    fireEvent.click(getCell(1, 2)!);
    expect(getCell(1, 2)).toHaveAttribute('aria-selected', 'false');
    
    // enabled works
    fireEvent.click(getCell(1, 0)!);
    expect(getCell(1, 0)).toHaveAttribute('aria-selected', 'true');
  });
  
  it('keyboard Enter/Space on cell toggles selection', () => {
    render(<Grid3x2Selectable selection='multiple' />);
    const cell = getCell(1, 1)!;
    
    fireEvent.keyDown(cell, { key: 'Enter' });
    expect(cell).toHaveAttribute('aria-selected', 'true');
    
    fireEvent.keyDown(cell, { key: ' ' });
    expect(cell).toHaveAttribute('aria-selected', 'false');
  });
  
  it('active control: calls onChangeActive from inner DataGrid', () => {
    const onChangeActive = vi.fn();
    render(<Grid3x2Selectable active='0:0' onChangeActive={onChangeActive} />);
    const grid = screen.getByRole('grid');
    
    fireEvent.keyDown(grid, { key: 'ArrowRight' });
    expect(onChangeActive).toHaveBeenCalled();
  });
});
