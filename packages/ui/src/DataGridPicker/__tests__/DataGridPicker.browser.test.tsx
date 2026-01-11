import { ComponentProps } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import {
  cleanup,
  render,
  type RenderResult,
} from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { DataGridPicker } from '../DataGridPicker';
import {
  DataGridPickerItem,
  DataGridPickerRow,
  DataGridPickerRowGroup,
} from '../components';

const makeKey = (row: number, col: number) => `${row}:${col}`;

const PickerTest = (props: Partial<ComponentProps<typeof DataGridPicker>>) => {
  return (
    <DataGridPicker {...props}>
      <DataGridPickerRowGroup data-testid='rowgroup'>
        <DataGridPickerRow row={0} data-testid='row-0'>
          <DataGridPickerItem data-testid='0:0' col={0}>
            0:0
          </DataGridPickerItem>
          <DataGridPickerItem data-testid='0:1' col={1}>
            0:1
          </DataGridPickerItem>
          <DataGridPickerItem data-testid='0:2' col={2}>
            0:2
          </DataGridPickerItem>
        </DataGridPickerRow>
        
        <DataGridPickerRow row={1} data-testid='row-1'>
          <DataGridPickerItem data-testid='1:0' col={0}>
            1:0
          </DataGridPickerItem>
          <DataGridPickerItem data-testid='1:1' col={1}>
            1:1
          </DataGridPickerItem>
          <DataGridPickerItem data-testid='1:2' col={2}>
            1:2
          </DataGridPickerItem>
        </DataGridPickerRow>
      </DataGridPickerRowGroup>
    </DataGridPicker>
  );
};

const getGrid = (r: RenderResult) => r.getByRole('grid');
const getRow = (r: RenderResult, row: number) => r.getByTestId(`row-${row}`);
const getCell = (r: RenderResult, row: number, col: number) =>
  r.getByTestId(`${row}:${col}`);

afterEach(cleanup);

describe('DataGridPicker', () => {
  describe('Critical User Paths', () => {
    describe('default (single selection)', () => {
      it('renders grid, rowgroup, rows and picker items', async () => {
        const r = render(<PickerTest />);
        
        await expect.element(getGrid(r)).toBeInTheDocument();
        await expect.element(r.getByTestId('rowgroup')).toBeInTheDocument();
        
        await expect.element(getRow(r, 0)).toBeInTheDocument();
        await expect.element(getRow(r, 1)).toBeInTheDocument();
        
        await expect.element(getCell(r, 0, 0)).toBeInTheDocument();
        await expect.element(getCell(r, 1, 2)).toBeInTheDocument();
      });
      
      it('passes size/variant from DataGridPicker context to items (data-size / data-variant)', async () => {
        const r = render(
          <PickerTest size='lg' variant='primary' />
        );
        
        await expect.element(getCell(r, 0, 0)).toHaveAttribute('data-size', 'lg');
        await expect.element(getCell(r, 0, 0)).toHaveAttribute('data-variant', 'primary');
      });
      
      it('allows overriding size/variant per item', async () => {
        const r = render(
          <DataGridPicker size='md' variant='secondary'>
            <DataGridPickerRowGroup>
              <DataGridPickerRow row={0}>
                <DataGridPickerItem
                  col={0}
                  data-testid='cell'
                  size='sm'
                  variant='danger'
                >
                  X
                </DataGridPickerItem>
              </DataGridPickerRow>
            </DataGridPickerRowGroup>
          </DataGridPicker>
        );
        
        const cell = r.getByTestId('cell');
        await expect.element(cell).toHaveAttribute('data-size', 'sm');
        await expect.element(cell).toHaveAttribute('data-variant', 'danger');
      });
      
      it('uses `value` as logical key when provided (data-key via DataGridSelectableCell)', async () => {
        const r = render(
          <DataGridPicker>
            <DataGridPickerRowGroup>
              <DataGridPickerRow row={0}>
                <DataGridPickerItem
                  col={0}
                  value='A'
                  data-testid='cell-A'
                >
                  A
                </DataGridPickerItem>
              </DataGridPickerRow>
            </DataGridPickerRowGroup>
          </DataGridPicker>
        );
        
        const cell = r.getByTestId('cell-A');
        await expect.element(cell).toHaveAttribute('data-key', 'A');
      });
      
      it('derives key from row/col when `value` is omitted', async () => {
        const r = render(<PickerTest />);
        
        const cell = getCell(r, 1, 2);
        await expect.element(cell).toHaveAttribute('data-key', makeKey(1, 2));
      });
    });
    
    describe('range selection – rangePosition / data-range', () => {
      it('sets data-range="start" / "end" for a simple 2-cell range', async () => {
        const r = render(
          <PickerTest selection='range' />
        );
        
        const start = getCell(r, 0, 0);
        start.focus();
        await expect.element(start).toHaveFocus();
        
        await userEvent.keyboard(' ');
        await expect.element(start).toHaveAttribute('aria-selected', 'true');
        
        await userEvent.keyboard('{Shift>}{ArrowRight}{/Shift}');
        
        await expect.element(getCell(r, 0, 0)).toHaveAttribute('data-range', 'start');
        await expect.element(getCell(r, 0, 1)).toHaveAttribute('data-range', 'end');
        await expect.element(getCell(r, 0, 2)).not.toHaveAttribute('data-range');
      });
      
      it('sets data-range="start" | "between" | "end" for a 3-cell range', async () => {
        const r = render(
          <PickerTest selection='range' />
        );
        
        const start = getCell(r, 0, 0);
        start.focus();
        await userEvent.keyboard(' ');
        
        await userEvent.keyboard('{Shift>}{ArrowRight}{/Shift}');
        await userEvent.keyboard('{Shift>}{ArrowRight}{/Shift}');
        
        await expect.element(getCell(r, 0, 0)).toHaveAttribute('data-range', 'start');
        await expect.element(getCell(r, 0, 1)).toHaveAttribute('data-range', 'between');
        await expect.element(getCell(r, 0, 2)).toHaveAttribute('data-range', 'end');
      });
      
      it('does not compute rangePosition when selection mode is not "range"', async () => {
        const r = render(
          <PickerTest selection='single' />
        );
        
        const cell = getCell(r, 0, 0);
        cell.focus();
        await userEvent.keyboard(' ');
        
        await expect.element(cell).not.toHaveAttribute('data-range');
      });
      
      it('prefers explicit `range` prop over derived rangePosition', async () => {
        const r = render(
          <DataGridPicker selection='range'>
            <DataGridPickerRowGroup>
              <DataGridPickerRow row={0}>
                <DataGridPickerItem col={0} data-testid='cell-0' range='start'>
                  0
                </DataGridPickerItem>
                <DataGridPickerItem col={1} data-testid='cell-1'>
                  1
                </DataGridPickerItem>
              </DataGridPickerRow>
            </DataGridPickerRowGroup>
          </DataGridPicker>
        );
        
        const cell0 = r.getByTestId('cell-0');
        const cell1 = r.getByTestId('cell-1');
        
        await expect.element(cell0).toHaveAttribute('data-range', 'start');
        await expect.element(cell1).not.toHaveAttribute('data-range');
      });
    });
    
    describe('disabled, excludeDisabled, and keyboard navigation', () => {
      it('propagates disabled to underlying selectable grid and prevents selection', async () => {
        const r = render(
          <PickerTest selection='single' disabled={makeKey(0, 1)} />
        );
        
        const disabledCell = getCell(r, 0, 1);
        const enabledCell = getCell(r, 0, 0);
        
        await expect.element(disabledCell).toHaveAttribute('aria-disabled', 'true');
        await expect.element(disabledCell).toHaveAttribute('aria-selected', 'false');
        
        await expect.element(disabledCell).toHaveAttribute('aria-selected', 'false');
        
        await userEvent.click(enabledCell);
        await expect.element(enabledCell).toHaveAttribute('aria-selected', 'true');
      });
      
      it('excludeDisabled=true: navigation skips disabled cells (via DataGridSelectable)', async () => {
        const r = render(
          <PickerTest
            defaultActive={makeKey(0, 0)}
            disabled={makeKey(0, 1)}
            excludeDisabled
          />
        );
        
        getCell(r, 0, 0).focus();
        await expect.element(getCell(r, 0, 0)).toHaveFocus();
        
        await userEvent.keyboard('{ArrowRight}');
        await expect.element(getCell(r, 0, 2)).toHaveFocus();
      });
    });
  });
  
  describe('Accessibility', () => {
    it('grid has role=grid and items render as grid cells', async () => {
      const r = render(<PickerTest />);
      
      await expect.element(getGrid(r)).toBeInTheDocument();
      await expect.element(getCell(r, 0, 0)).toHaveAttribute('role', 'gridcell');
    });
    
    it('aria-selected reflects selection state for picker items', async () => {
      const r = render(<PickerTest selection='single' />);
      
      await userEvent.click(getCell(r, 1, 2));
      
      await expect.element(getCell(r, 1, 2)).toHaveAttribute('aria-selected', 'true');
      await expect.element(getCell(r, 0, 0)).toHaveAttribute('aria-selected', 'false');
    });
  });
});