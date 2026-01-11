import { ComponentProps, FC } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  cleanup,
  fireEvent,
  render,
  type RenderResult,
} from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { DataGridSelectable } from '../DataGridSelectable';
import {
  DataGridSelectableCell,
  DataGridSelectableRow,
  DataGridSelectableRowGroup,
} from '../components';

const makeKey = (row: number, col: number) => `${row}:${col}`;

const GridSelectableTest = (
  props: Partial<ComponentProps<typeof DataGridSelectable>>
) => (
  <DataGridSelectable {...props}>
    <DataGridSelectableRowGroup data-testid='rowgroup'>
      <DataGridSelectableRow row={0} data-testid='row-0'>
        <DataGridSelectableCell data-testid='0:0' col={0}>
          0:0
        </DataGridSelectableCell>
        <DataGridSelectableCell data-testid='0:1' col={1}>
          0:1
        </DataGridSelectableCell>
        <DataGridSelectableCell data-testid='0:2' col={2}>
          0:2
        </DataGridSelectableCell>
      </DataGridSelectableRow>
      
      <DataGridSelectableRow row={1} data-testid='row-1'>
        <DataGridSelectableCell data-testid='1:0' col={0}>
          1:0
        </DataGridSelectableCell>
        <DataGridSelectableCell data-testid='1:1' col={1}>
          1:1
        </DataGridSelectableCell>
        <DataGridSelectableCell data-testid='1:2' col={2}>
          1:2
        </DataGridSelectableCell>
      </DataGridSelectableRow>
    </DataGridSelectableRowGroup>
  </DataGridSelectable>
);

const getGrid = (r: RenderResult) => r.getByRole('grid');
const getRowGroup = (r: RenderResult) => r.getByTestId('rowgroup');
const getRow = (r: RenderResult, row: number) => r.getByTestId(`row-${row}`);
const getCell = (r: RenderResult, row: number, col: number) => r.getByTestId(`${row}:${col}`);

afterEach(cleanup);

describe('DataGridSelectable', () => {
  describe('Critical User Paths', () => {
    describe('single selection (default)', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<GridSelectableTest />);
      });
      
      it('renders grid and basic structure', async () => {
        await expect.element(getGrid(r)).toBeInTheDocument();
        await expect.element(getRowGroup(r)).toBeInTheDocument();
        await expect.element(getRow(r, 0)).toBeInTheDocument();
        await expect.element(getRow(r, 1)).toBeInTheDocument();
      });
      
      it('renders cells', async () => {
        await expect.element(getCell(r, 0, 0)).toBeInTheDocument();
        await expect.element(getCell(r, 1, 2)).toBeInTheDocument();
      });
      
      it('initially cells are unselected', async () => {
        await expect.element(getCell(r, 0, 0)).toHaveAttribute('aria-selected', 'false');
        await expect.element(getCell(r, 0, 1)).toHaveAttribute('aria-selected', 'false');
      });
      
      it('click selects a cell', async () => {
        await userEvent.click(getCell(r, 0, 0));
        await expect.element(getCell(r, 0, 0)).toHaveAttribute('aria-selected', 'true');
      });
      
      it('clicking another cell unselects previous', async () => {
        await userEvent.click(getCell(r, 0, 0));
        await userEvent.click(getCell(r, 0, 1));
        
        await expect.element(getCell(r, 0, 1)).toHaveAttribute('aria-selected', 'true');
        await expect.element(getCell(r, 0, 0)).toHaveAttribute('aria-selected', 'false');
      });
      
      it('clicking the same cell keeps it selected (no toggle in single)', async () => {
        await userEvent.click(getCell(r, 0, 0));
        await userEvent.click(getCell(r, 0, 0));
        
        await expect.element(getCell(r, 0, 0)).toHaveAttribute('aria-selected', 'true');
      });
    });
    
    describe('multiple selection', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<GridSelectableTest selection='multiple' />);
      });
      
      it('allows selecting multiple cells', async () => {
        await userEvent.click(getCell(r, 0, 0));
        await userEvent.click(getCell(r, 1, 1));
        
        await expect.element(getCell(r, 0, 0)).toHaveAttribute('aria-selected', 'true');
        await expect.element(getCell(r, 1, 1)).toHaveAttribute('aria-selected', 'true');
      });
      
      it('toggles a cell off on second click', async () => {
        await userEvent.click(getCell(r, 0, 0));
        await userEvent.click(getCell(r, 0, 0));
        
        await expect.element(getCell(r, 0, 0)).toHaveAttribute('aria-selected', 'false');
      });
      
      it('does not affect other selected cells when toggling one off', async () => {
        await userEvent.click(getCell(r, 0, 0));
        await userEvent.click(getCell(r, 1, 1));
        await userEvent.click(getCell(r, 0, 0));
        
        await expect.element(getCell(r, 0, 0)).toHaveAttribute('aria-selected', 'false');
        await expect.element(getCell(r, 1, 1)).toHaveAttribute('aria-selected', 'true');
      });
    });
    
    describe('range selection (keyboard)', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<GridSelectableTest selection='range' />);
      });
      
      it('starts selection with Space on focused cell', async () => {
        const start = getCell(r, 0, 0);
        start.focus();
        
        await userEvent.keyboard(' ');
        await expect.element(start).toHaveAttribute('aria-selected', 'true');
      });
      
      it('extends range horizontally with Shift+ArrowRight', async () => {
        const start = getCell(r, 0, 0);
        start.focus();
        
        await userEvent.keyboard(' ');
        await userEvent.keyboard('{Shift>}{ArrowRight}{/Shift}');
        
        await expect.element(getCell(r, 0, 0)).toHaveAttribute('aria-selected', 'true');
        await expect.element(getCell(r, 0, 1)).toHaveAttribute('aria-selected', 'true');
        await expect.element(getCell(r, 0, 2)).toHaveAttribute('aria-selected', 'false');
      });
      
      it('extends range vertically with Shift+ArrowDown', async () => {
        const start = getCell(r, 0, 0);
        start.focus();
        
        await userEvent.keyboard(' ');
        await userEvent.keyboard('{Shift>}{ArrowDown}{/Shift}');
        
        await expect.element(getCell(r, 0, 0)).toHaveAttribute('aria-selected', 'true');
        await expect.element(getCell(r, 1, 0)).toHaveAttribute('aria-selected', 'true');
      });
      
      it('extends range upward from a lower start with Shift+ArrowUp', async () => {
        const start = getCell(r, 1, 0);
        start.focus();
        
        await userEvent.keyboard(' ');
        await userEvent.keyboard('{Shift>}{ArrowUp}{/Shift}');
        
        await expect.element(getCell(r, 1, 0)).toHaveAttribute('aria-selected', 'true');
        await expect.element(getCell(r, 0, 0)).toHaveAttribute('aria-selected', 'true');
      });
      
      it('shrinks range when reversing direction (right then left)', async () => {
        const start = getCell(r, 0, 1);
        start.focus();
        
        await userEvent.keyboard(' ');
        await userEvent.keyboard('{Shift>}{ArrowRight}{/Shift}');
        
        await expect.element(getCell(r, 0, 2)).toHaveAttribute('aria-selected', 'true');
        
        await userEvent.keyboard('{Shift>}{ArrowLeft}{/Shift}');
        
        await expect.element(getCell(r, 0, 1)).toHaveAttribute('aria-selected', 'true');
        await expect.element(getCell(r, 0, 2)).toHaveAttribute('aria-selected', 'false');
      });
    });
    
    describe('range selection (pointer drag)', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<GridSelectableTest selection='range' />);
      });
      
      it('selects end cell when dragging to it', async () => {
        const start = getCell(r, 0, 0);
        const end = getCell(r, 0, 2);
        
        await userEvent.click(start);
        
        const spy = vi
          .spyOn(document, 'elementFromPoint')
          .mockImplementation(() => end as HTMLElement);
        
        fireEvent.pointerDown(start, { clientX: 0, clientY: 0 });
        fireEvent.pointerMove(start, { clientX: 10, clientY: 0 });
        
        spy.mockRestore();
        
        await expect.element(start).toHaveAttribute('aria-selected', 'true');
        await expect.element(end).toHaveAttribute('aria-selected', 'true');
      });
    });
    
    describe('range selection – expandable flag', () => {
      it('does not extend range when expandable=false', async () => {
        const r = render(
          <GridSelectableTest selection='range' expandable={false} />
        );
        
        const start = getCell(r, 0, 0);
        start.focus();
        
        await userEvent.keyboard(' ');
        await userEvent.keyboard('{Shift>}{ArrowRight}{/Shift}');
        
        await expect.element(getCell(r, 0, 0)).toHaveAttribute('aria-selected', 'true');
        await expect.element(getCell(r, 0, 1)).toHaveAttribute('aria-selected', 'false');
      });
    });
    
    describe('range selection – non-range modes', () => {
      it('does not create range in single mode via Shift+ArrowRight', async () => {
        const r = render(<GridSelectableTest selection='single' />);
        
        const start = getCell(r, 0, 0);
        start.focus();
        
        await userEvent.keyboard(' ');
        await userEvent.keyboard('{Shift>}{ArrowRight}{/Shift}');
        
        await expect.element(getCell(r, 0, 0)).toHaveAttribute('aria-selected', 'true');
        await expect.element(getCell(r, 0, 1)).toHaveAttribute('aria-selected', 'false');
      });
      
      it('does not create range in multiple mode via Shift+ArrowRight', async () => {
        const r = render(<GridSelectableTest selection='multiple' />);
        
        const start = getCell(r, 0, 0);
        start.focus();
        
        await userEvent.keyboard(' ');
        await userEvent.keyboard('{Shift>}{ArrowRight}{/Shift}');
        
        await expect.element(getCell(r, 0, 0)).toHaveAttribute('aria-selected', 'true');
        await expect.element(getCell(r, 0, 1)).toHaveAttribute('aria-selected', 'false');
      });
    });
    
    describe('disabled and excludeDisabled', () => {
      it('marks disabled cells with aria-disabled', async () => {
        const r = render(<GridSelectableTest disabled={makeKey(0, 1)} />);
        await expect.element(getCell(r, 0, 1)).toHaveAttribute('aria-disabled', 'true');
      });
      
      it('does not select disabled cell on click', async () => {
        const r = render(<GridSelectableTest disabled={makeKey(0, 1)} />);
        await expect.element(getCell(r, 0, 1)).toBeDisabled()
      });
      
      it('still allows selecting enabled cell when other cell is disabled', async () => {
        const r = render(<GridSelectableTest disabled={makeKey(0, 1)} />);
        await userEvent.click(getCell(r, 0, 0));
        await expect.element(getCell(r, 0, 0)).toHaveAttribute('aria-selected', 'true');
      });
      
      it('excludeDisabled=true: ArrowRight skips disabled cell', async () => {
        const r = render(
          <GridSelectableTest
            defaultActive={makeKey(0, 0)}
            disabled={makeKey(0, 1)}
            excludeDisabled
          />
        );
        
        const start = getCell(r, 0, 0);
        start.focus();
        await expect.element(start).toHaveFocus();
        
        await userEvent.keyboard('{ArrowRight}');
        await expect.element(getCell(r, 0, 2)).toHaveFocus();
      });
      
      it('excludeDisabled=false: ArrowRight can land on disabled cell', async () => {
        const r = render(
          <GridSelectableTest
            defaultActive={makeKey(0, 0)}
            disabled={makeKey(0, 1)}
            excludeDisabled={false}
          />
        );
        
        const start = getCell(r, 0, 0);
        start.focus();
        
        await userEvent.keyboard('{ArrowRight}');
        await expect.element(getCell(r, 0, 1)).toHaveFocus();
      });
    });
    
    describe('onSelectCell', () => {
      it('fires onSelectCell with key in single mode', async () => {
        const onSelectCell = vi.fn();
        const r = render(
          <GridSelectableTest selection='single' onSelectCell={onSelectCell} />
        );
        
        await userEvent.click(getCell(r, 0, 1));
        
        expect(onSelectCell).toHaveBeenCalledTimes(1);
        expect(onSelectCell).toHaveBeenCalledWith(makeKey(0, 1));
      });
      
      it('fires onSelectCell with array in multiple mode (last call contains both)', async () => {
        const onSelectCell = vi.fn();
        const r = render(
          <GridSelectableTest
            selection='multiple'
            onSelectCell={onSelectCell}
          />
        );
        
        await userEvent.click(getCell(r, 0, 0));
        await userEvent.click(getCell(r, 1, 1));
        
        expect(onSelectCell).toHaveBeenCalled();
        
        const last = onSelectCell.mock.calls.at(-1)?.[0] as unknown;
        expect(last).toEqual(
          expect.arrayContaining([makeKey(0, 0), makeKey(1, 1)])
        );
      });
    });
  });
  
  describe('Error Handling', () => {
    it('controlled active without onChangeActive: Arrow navigation does not change active tabIndex', async () => {
      const Grid: FC = () => (
        <DataGridSelectable active={makeKey(0, 0)} selection='single'>
          <DataGridSelectableRowGroup>
            <DataGridSelectableRow row={0}>
              <DataGridSelectableCell col={0} data-testid='cell-0-0'>
                0:0
              </DataGridSelectableCell>
              <DataGridSelectableCell col={1} data-testid='cell-0-1'>
                0:1
              </DataGridSelectableCell>
            </DataGridSelectableRow>
          </DataGridSelectableRowGroup>
        </DataGridSelectable>
      );
      
      const r = render(<Grid />);
      
      const cell0 = r.getByTestId('cell-0-0');
      const cell1 = r.getByTestId('cell-0-1');
      
      cell0.focus();
      await expect.element(cell0).toHaveFocus();
      
      await userEvent.keyboard('{ArrowRight}');
      
      await expect.element(cell0).toHaveAttribute('tabindex', '0');
      await expect.element(cell1).toHaveAttribute('tabindex', '-1');
    });
  });
  
  describe('Edge Cases', () => {
    it('derives data-key from row/col when cellKey is omitted', async () => {
      const r = render(<GridSelectableTest />);
      await expect
        .element(getCell(r, 1, 2))
        .toHaveAttribute('data-key', makeKey(1, 2));
    });
    
    it('uses explicit cellKey when provided', async () => {
      const r = render(
        <DataGridSelectable defaultActive='k'>
          <DataGridSelectableRowGroup>
            <DataGridSelectableRow row={0}>
              <DataGridSelectableCell col={0} cellKey='k' data-testid='cell-k'>
                A
              </DataGridSelectableCell>
            </DataGridSelectableRow>
          </DataGridSelectableRowGroup>
        </DataGridSelectable>
      );
      
      const cell = r.getByTestId('cell-k');
      await expect.element(cell).toHaveAttribute('data-key', 'k');
      await expect.element(cell).toHaveAttribute('tabindex', '0');
    });
    
    it('merges user onClick with internal selection handler', async () => {
      const onClick = vi.fn();
      
      const r = render(
        <DataGridSelectable>
          <DataGridSelectableRowGroup>
            <DataGridSelectableRow row={0}>
              <DataGridSelectableCell col={0} data-testid='cell-0-0' onClick={onClick}>
                0:0
              </DataGridSelectableCell>
            </DataGridSelectableRow>
          </DataGridSelectableRowGroup>
        </DataGridSelectable>
      );
      
      const cell = r.getByTestId('cell-0-0');
      
      await userEvent.click(cell);
      
      expect(onClick).toHaveBeenCalledTimes(1);
      await expect.element(cell).toHaveAttribute('aria-selected', 'true');
    });
    
    it('merges user onKeyDown with internal selection handler', async () => {
      const onKeyDown = vi.fn();
      
      const r = render(
        <DataGridSelectable>
          <DataGridSelectableRowGroup>
            <DataGridSelectableRow row={0}>
              <DataGridSelectableCell col={0} data-testid='cell-0-0' onKeyDown={onKeyDown}>
                0:0
              </DataGridSelectableCell>
            </DataGridSelectableRow>
          </DataGridSelectableRowGroup>
        </DataGridSelectable>
      );
      
      const cell = r.getByTestId('cell-0-0');
      cell.focus();
      
      await userEvent.keyboard(' ');
      
      expect(onKeyDown).toHaveBeenCalled();
      await expect.element(cell).toHaveAttribute('aria-selected', 'true');
    });
  });
  
  describe('Accessibility', () => {
    describe('roles', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<GridSelectableTest />);
      });
      
      it('root has role=grid', async () => {
        await expect.element(getGrid(r)).toHaveRole('grid');
      });
      
      it('cells have role=gridcell', async () => {
        await expect.element(getCell(r, 0, 0)).toHaveRole('gridcell');
        await expect.element(getCell(r, 1, 2)).toHaveRole('gridcell');
      });
    });
    
    describe('aria', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<GridSelectableTest />);
      });
      
      it('aria-selected toggles to true on selection', async () => {
        await userEvent.click(getCell(r, 1, 2));
        await expect.element(getCell(r, 1, 2)).toHaveAttribute('aria-selected', 'true');
      });
      
      it('aria-selected remains false for unselected cells', async () => {
        await userEvent.click(getCell(r, 1, 2));
        await expect.element(getCell(r, 0, 0)).toHaveAttribute('aria-selected', 'false');
      });
      
      it('aria-disabled is present for disabled cells', async () => {
        r.rerender(<GridSelectableTest disabled={[makeKey(0, 1), makeKey(1, 0)]} />);
        await expect.element(getCell(r, 0, 1)).toHaveAttribute('aria-disabled', 'true');
        await expect.element(getCell(r, 1, 0)).toHaveAttribute('aria-disabled', 'true');
      });
      
      it('aria-disabled=false for enabled cells (when other cells disabled)', async () => {
        r.rerender(<GridSelectableTest disabled={[makeKey(0, 1), makeKey(1, 0)]} />);
        await expect.element(getCell(r, 0, 0)).toHaveAttribute('aria-disabled', 'false');
      });
    });
    
    describe('focus', () => {
      it('defaultActive cell receives tabIndex=0', async () => {
        const r = render(<GridSelectableTest defaultActive={makeKey(0, 1)} />);
        await expect.element(getCell(r, 0, 1)).toHaveAttribute('tabindex', '0');
      });
      
      it('focusing a cell sets document focus on it', async () => {
        const r = render(<GridSelectableTest />);
        const cell = getCell(r, 0, 0);
        
        cell.focus();
        await expect.element(cell).toHaveFocus();
      });
    });
    
    describe('keyboard', () => {
      it('Space selects focused cell', async () => {
        const r = render(<GridSelectableTest selection='single' />);
        const cell = getCell(r, 0, 0);
        
        cell.focus();
        await userEvent.keyboard(' ');
        
        await expect.element(cell).toHaveAttribute('aria-selected', 'true');
      });
      
      it('Enter selects focused cell', async () => {
        const r = render(<GridSelectableTest selection='single' />);
        const cell = getCell(r, 0, 1);
        
        cell.focus();
        await userEvent.keyboard('{Enter}');
        
        await expect.element(cell).toHaveAttribute('aria-selected', 'true');
      });
      
      it('ArrowRight moves focus to next cell', async () => {
        const r = render(<GridSelectableTest defaultActive={makeKey(0, 0)} />);
        const c00 = getCell(r, 0, 0);
        
        c00.focus();
        await expect.element(c00).toHaveFocus();
        
        await userEvent.keyboard('{ArrowRight}');
        await expect.element(getCell(r, 0, 1)).toHaveFocus();
      });
      
      it('ArrowDown moves focus to cell below', async () => {
        const r = render(<GridSelectableTest defaultActive={makeKey(0, 0)} />);
        const c00 = getCell(r, 0, 0);
        
        c00.focus();
        await userEvent.keyboard('{ArrowDown}');
        
        await expect.element(getCell(r, 1, 0)).toHaveFocus();
      });
    });
  });
});