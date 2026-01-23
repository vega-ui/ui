import { ComponentProps, FC } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { cleanup, render, type RenderResult, waitFor } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { DataGrid } from '../DataGrid';
import { DataGridCell, DataGridRow, DataGridRowGroup } from '../components';

afterEach(cleanup);

const makeKey = (row: number, col: number) => `${row}:${col}`;

const TESTID_ROWGROUP = 'rowgroup';

const GridTest = (props: Partial<ComponentProps<typeof DataGrid>>) => {
  return (
    <DataGrid defaultActive={makeKey(0, 0)} {...props}>
      <DataGridRowGroup data-testid={TESTID_ROWGROUP}>
        <DataGridRow row={0} data-testid='row-0'>
          <DataGridCell data-testid={makeKey(0, 0)} col={0} />
          <DataGridCell data-testid={makeKey(0, 1)} col={1} />
          <DataGridCell data-testid={makeKey(0, 2)} col={2} />
        </DataGridRow>
        
        <DataGridRow row={1} data-testid='row-1'>
          <DataGridCell data-testid={makeKey(1, 0)} col={0} />
          <DataGridCell data-testid={makeKey(1, 1)} col={1} />
          <DataGridCell data-testid={makeKey(1, 2)} col={2} />
        </DataGridRow>
      </DataGridRowGroup>
    </DataGrid>
  );
};

const getGrid = (r: RenderResult) => r.getByRole('grid');
const getRowGroup = (r: RenderResult) => r.getByTestId(TESTID_ROWGROUP);
const getRow = (r: RenderResult, row: number) => r.getByTestId(`row-${row}`);
const getCell = (r: RenderResult, row: number, col: number) => r.getByTestId(makeKey(row, col));

describe('DataGrid', () => {
  describe('Critical User Paths', () => {
    describe('default (uncontrolled via defaultActive)', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<GridTest />);
      });
      
      describe('rendering', () => {
        it('renders grid root', async () => {
          await expect.element(getGrid(r)).toBeInTheDocument();
        });
        
        it('renders rowgroup', async () => {
          await expect.element(getRowGroup(r)).toBeInTheDocument();
        });
        
        it('renders rows', async () => {
          await expect.element(getRow(r, 0)).toBeInTheDocument();
          await expect.element(getRow(r, 1)).toBeInTheDocument();
        });
        
        it('renders cells', async () => {
          await expect.element(getCell(r, 0, 0)).toBeInTheDocument();
          await expect.element(getCell(r, 0, 1)).toBeInTheDocument();
          await expect.element(getCell(r, 0, 2)).toBeInTheDocument();
          
          await expect.element(getCell(r, 1, 0)).toBeInTheDocument();
          await expect.element(getCell(r, 1, 1)).toBeInTheDocument();
          await expect.element(getCell(r, 1, 2)).toBeInTheDocument();
        });
      });
      
      describe('cell data attributes', () => {
        it('sets data-row on cells', async () => {
          await expect.element(getCell(r, 0, 2)).toHaveAttribute('data-row', '0');
          await expect.element(getCell(r, 1, 0)).toHaveAttribute('data-row', '1');
        });
        
        it('sets data-col on cells', async () => {
          await expect.element(getCell(r, 0, 2)).toHaveAttribute('data-col', '2');
          await expect.element(getCell(r, 1, 0)).toHaveAttribute('data-col', '0');
        });
      });
      
      describe('roving tabIndex', () => {
        it('sets tabIndex=0 on defaultActive cell', async () => {
          await expect.element(getCell(r, 0, 0)).toHaveAttribute('tabindex', '0');
        });
        
        it('sets tabIndex=-1 on non-active cells', async () => {
          await expect.element(getCell(r, 0, 1)).toHaveAttribute('tabindex', '-1');
          await expect.element(getCell(r, 0, 2)).toHaveAttribute('tabindex', '-1');
          await expect.element(getCell(r, 1, 0)).toHaveAttribute('tabindex', '-1');
          await expect.element(getCell(r, 1, 1)).toHaveAttribute('tabindex', '-1');
          await expect.element(getCell(r, 1, 2)).toHaveAttribute('tabindex', '-1');
        });
      });
      
      describe('controlled/uncontrolled behavior', () => {
        it('active overrides defaultActive when both are provided', async () => {
          r.rerender(<GridTest defaultActive={makeKey(0, 0)} active={makeKey(1, 1)} onChangeActive={() => {}} />);
          
          await expect.element(getCell(r, 1, 1)).toHaveAttribute('tabindex', '0');
          await expect.element(getCell(r, 0, 0)).toHaveAttribute('tabindex', '-1');
        });
        
        it('updates tabbable cell when active prop changes from outside', async () => {
          r.rerender(<GridTest active={makeKey(0, 0)} onChangeActive={() => {}} />);
          
          await expect.element(getCell(r, 0, 0)).toHaveAttribute('tabindex', '0');
          
          r.rerender(<GridTest active={makeKey(1, 1)} onChangeActive={() => {}} />);
          
          await expect.element(getCell(r, 1, 1)).toHaveAttribute('tabindex', '0');
        });
        
        it('updates previous active cell tabIndex to -1 when active changes from outside', async () => {
          r.rerender(<GridTest active={makeKey(0, 0)} onChangeActive={() => {}} />);
          
          await expect.element(getCell(r, 0, 0)).toHaveAttribute('tabindex', '0');
          
          r.rerender(<GridTest active={makeKey(1, 1)} onChangeActive={() => {}} />);
          
          await expect.element(getCell(r, 0, 0)).toHaveAttribute('tabindex', '-1');
        });
      });
    });
    
    describe('controlled active', () => {
      it('calls onChangeActive on navigation', async () => {
        const onChangeActive: Mock = vi.fn();
        
        const r = render(
          <DataGrid active={makeKey(0, 0)} onChangeActive={onChangeActive}>
            <DataGridRowGroup>
              <DataGridRow row={0}>
                <DataGridCell col={0} data-testid='cell-0-0'>
                  0:0
                </DataGridCell>
                <DataGridCell col={1} data-testid='cell-0-1'>
                  0:1
                </DataGridCell>
              </DataGridRow>
            </DataGridRowGroup>
          </DataGrid>
        );
        
        r.getByTestId('cell-0-0').focus();
        await userEvent.keyboard('{ArrowRight}');
        
        await waitFor(() => {
          expect(onChangeActive).toHaveBeenCalled();
        });
      });
      
      it('passes next key to onChangeActive', async () => {
        const onChangeActive: Mock = vi.fn();
        
        const r = render(
          <DataGrid active={makeKey(0, 0)} onChangeActive={onChangeActive}>
            <DataGridRowGroup>
              <DataGridRow row={0}>
                <DataGridCell col={0} data-testid='cell-0-0'>
                  0:0
                </DataGridCell>
                <DataGridCell col={1} data-testid='cell-0-1'>
                  0:1
                </DataGridCell>
              </DataGridRow>
            </DataGridRowGroup>
          </DataGrid>
        );
        
        r.getByTestId('cell-0-0').focus();
        await userEvent.keyboard('{ArrowRight}');
        
        await waitFor(() => {
          expect(onChangeActive).toHaveBeenCalled();
        });
        
        const [nextKey] = onChangeActive.mock.calls.at(-1) as [string];
        expect(nextKey).toBe(makeKey(0, 1));
      });
    });
    
    describe('wrap', () => {
      describe('horizontal', () => {
        it('ArrowRight wraps to next row first col (0:2 -> 1:0)', async () => {
          const r = render(<GridTest wrap='horizontal' defaultActive={makeKey(0, 2)} />);
          
          getCell(r, 0, 2).focus();
          await userEvent.keyboard('{ArrowRight}');
          
          await expect.element(getCell(r, 1, 0)).toHaveFocus();
        });
        
        it('ArrowLeft wraps to previous row last col (1:0 -> 0:2)', async () => {
          const r = render(<GridTest wrap='horizontal' defaultActive={makeKey(1, 0)} />);
          
          getCell(r, 1, 0).focus();
          await userEvent.keyboard('{ArrowLeft}');
          
          await expect.element(getCell(r, 0, 2)).toHaveFocus();
        });
      });
      
      describe('vertical', () => {
        it('ArrowDown wraps to first row next col (1:0 -> 0:1)', async () => {
          const r = render(<GridTest wrap='vertical' defaultActive={makeKey(1, 0)} />);
          
          getCell(r, 1, 0).focus();
          await userEvent.keyboard('{ArrowDown}');
          
          await expect.element(getCell(r, 0, 1)).toHaveFocus();
        });
        
        it('ArrowUp wraps to last row previous col (0:1 -> 1:0)', async () => {
          const r = render(<GridTest wrap='vertical' defaultActive={makeKey(0, 1)} />);
          
          getCell(r, 0, 1).focus();
          await userEvent.keyboard('{ArrowUp}');
          
          await expect.element(getCell(r, 1, 0)).toHaveFocus();
        });
      });
      
      describe('both', () => {
        it('ArrowRight wraps (0:2 -> 1:0)', async () => {
          const r = render(<GridTest wrap='both' defaultActive={makeKey(0, 2)} />);
          
          getCell(r, 0, 2).focus();
          await userEvent.keyboard('{ArrowRight}');
          
          await expect.element(getCell(r, 1, 0)).toHaveFocus();
        });
        
        it('ArrowLeft wraps (1:0 -> 0:2)', async () => {
          const r = render(<GridTest wrap='both' defaultActive={makeKey(1, 0)} />);
          
          getCell(r, 1, 0).focus();
          await userEvent.keyboard('{ArrowLeft}');
          
          await expect.element(getCell(r, 0, 2)).toHaveFocus();
        });
        
        it('ArrowDown wraps (1:0 -> 0:1)', async () => {
          const r = render(<GridTest wrap='both' defaultActive={makeKey(1, 0)} />);
          
          getCell(r, 1, 0).focus();
          await userEvent.keyboard('{ArrowDown}');
          
          await expect.element(getCell(r, 0, 1)).toHaveFocus();
        });
        
        it('ArrowUp wraps (0:1 -> 1:0)', async () => {
          const r = render(<GridTest wrap='both' defaultActive={makeKey(0, 1)} />);
          
          getCell(r, 0, 1).focus();
          await userEvent.keyboard('{ArrowUp}');
          
          await expect.element(getCell(r, 1, 0)).toHaveFocus();
        });
      });
    });
    
    describe('exclude', () => {
      it('skips excluded cell on ArrowRight', async () => {
        const r = render(<GridTest defaultActive={makeKey(0, 0)} exclude={makeKey(0, 1)} />);
        
        getCell(r, 0, 0).focus();
        await userEvent.keyboard('{ArrowRight}');
        
        await expect.element(getCell(r, 0, 2)).toHaveFocus();
      });
      
      it('skips excluded cells array on ArrowRight', async () => {
        const r = render(
          <GridTest wrap='horizontal' defaultActive={makeKey(0, 0)} exclude={[makeKey(0, 1), makeKey(0, 2)]} />
        );
        
        getCell(r, 0, 0).focus();
        await userEvent.keyboard('{ArrowRight}');
        
        await expect.element(getCell(r, 1, 0)).toHaveFocus();
      });
      
      it('supports exclude resolver (blocked target keeps focus)', async () => {
        const r = render(
          <GridTest
            defaultActive={makeKey(0, 0)}
            exclude={(key) => key === makeKey(1, 0) || key === makeKey(1, 1)}
          />
        );
        
        getCell(r, 0, 0).focus();
        await userEvent.keyboard('{ArrowDown}');
        
        await expect.element(getCell(r, 0, 0)).toHaveFocus();
      });
    });
    
    describe('onArrow', () => {
      it('fires onArrow on navigation', async () => {
        const onArrow: Mock = vi.fn();
        const r = render(<GridTest onArrow={onArrow} />);
        
        getCell(r, 0, 0).focus();
        await userEvent.keyboard('{ArrowRight}');
        
        await waitFor(() => {
          expect(onArrow).toHaveBeenCalled();
        });
      });
    });
  });
  
  describe('Error Handling', () => {
    it('controlled active without onChangeActive: navigation does not throw', async () => {
      const Grid: FC = () => (
        <DataGrid active={makeKey(0, 0)}>
          <DataGridRowGroup>
            <DataGridRow row={0}>
              <DataGridCell col={0} data-testid='cell-0-0'>
                0:0
              </DataGridCell>
              <DataGridCell col={1} data-testid='cell-0-1'>
                0:1
              </DataGridCell>
            </DataGridRow>
          </DataGridRowGroup>
        </DataGrid>
      );
      
      const r = render(<Grid />);
      
      r.getByTestId('cell-0-0').focus();
      await userEvent.keyboard('{ArrowRight}');
      
      await expect.element(r.getByTestId('cell-0-0')).toHaveAttribute('tabindex', '0');
    });
    
    it('controlled active without onChangeActive: does not update tabbable cell', async () => {
      const Grid: FC = () => (
        <DataGrid active={makeKey(0, 0)}>
          <DataGridRowGroup>
            <DataGridRow row={0}>
              <DataGridCell col={0} data-testid='cell-0-0'>
                0:0
              </DataGridCell>
              <DataGridCell col={1} data-testid='cell-0-1'>
                0:1
              </DataGridCell>
            </DataGridRow>
          </DataGridRowGroup>
        </DataGrid>
      );
      
      const r = render(<Grid />);
      
      r.getByTestId('cell-0-0').focus();
      await userEvent.keyboard('{ArrowRight}');
      
      await expect.element(r.getByTestId('cell-0-1')).toHaveAttribute('tabindex', '-1');
    });
  });
  
  describe('Edge Cases', () => {
    it('DataGridCell: when cellKey is omitted, data-key attribute is absent', async () => {
      const Grid: FC = () => (
        <DataGrid defaultActive={makeKey(0, 0)}>
          <DataGridRowGroup>
            <DataGridRow row={0}>
              <DataGridCell col={0} data-testid='cell-0-0'>
                A
              </DataGridCell>
            </DataGridRow>
          </DataGridRowGroup>
        </DataGrid>
      );
      
      const r = render(<Grid />);
      await expect.element(r.getByTestId('cell-0-0')).not.toHaveAttribute('data-key');
    });
    
    it('DataGridCell: accepts explicit cellKey', async () => {
      const Grid: FC = () => (
        <DataGrid defaultActive='k'>
          <DataGridRowGroup>
            <DataGridRow row={0}>
              <DataGridCell col={0} cellKey='k' data-testid='cell-0-0'>
                A
              </DataGridCell>
            </DataGridRow>
          </DataGridRowGroup>
        </DataGrid>
      );
      
      const r = render(<Grid />);
      await expect.element(r.getByTestId('cell-0-0')).toHaveAttribute('tabindex', '0');
    });
    
    it('DataGridCell: explicit cellKey still participates in focus', async () => {
      const Grid: FC = () => (
        <DataGrid defaultActive='k'>
          <DataGridRowGroup>
            <DataGridRow row={0}>
              <DataGridCell col={0} cellKey='k' data-testid='cell-0-0'>
                A
              </DataGridCell>
            </DataGridRow>
          </DataGridRowGroup>
        </DataGrid>
      );
      
      const r = render(<Grid />);
      r.getByTestId('cell-0-0').focus();
      await expect.element(r.getByTestId('cell-0-0')).toHaveFocus();
    });
  });
  
  describe('Accessibility', () => {
    describe('roles', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<GridTest />);
      });
      
      it('grid has role=grid', async () => {
        await expect.element(getGrid(r)).toHaveRole('grid');
      });
      
      it('rowgroup has role=rowgroup', async () => {
        await expect.element(getRowGroup(r)).toHaveRole('rowgroup');
      });
      
      it('rows have role=row', async () => {
        await expect.element(getRow(r, 0)).toHaveRole('row');
        await expect.element(getRow(r, 1)).toHaveRole('row');
      });
      
      it('cells have role=gridcell', async () => {
        await expect.element(getCell(r, 0, 0)).toHaveRole('gridcell');
        await expect.element(getCell(r, 1, 2)).toHaveRole('gridcell');
      });
    });
    
    describe('keyboard', () => {
      it('ArrowRight moves focus to next cell (same row)', async () => {
        const r = render(<GridTest />);
        getCell(r, 0, 0).focus();
        await userEvent.keyboard('{ArrowRight}');
        await expect.element(getCell(r, 0, 1)).toHaveFocus();
      });
      
      it('ArrowDown moves focus to next row (same col)', async () => {
        const r = render(<GridTest />);
        getCell(r, 0, 0).focus();
        await userEvent.keyboard('{ArrowDown}');
        await expect.element(getCell(r, 1, 0)).toHaveFocus();
      });
      
      it('ArrowLeft from col=0 does nothing without wrap', async () => {
        const r = render(<GridTest />);
        getCell(r, 0, 0).focus();
        await userEvent.keyboard('{ArrowLeft}');
        await expect.element(getCell(r, 0, 0)).toHaveFocus();
      });
      
      it('ArrowUp from row=0 does nothing without wrap', async () => {
        const r = render(<GridTest />);
        getCell(r, 0, 0).focus();
        await userEvent.keyboard('{ArrowUp}');
        await expect.element(getCell(r, 0, 0)).toHaveFocus();
      });
      
      it('Home moves to first cell in current row', async () => {
        const r = render(<GridTest />);
        getCell(r, 0, 0).focus();
        await userEvent.keyboard('{ArrowRight}{ArrowRight}');
        await userEvent.keyboard('{Home}');
        await expect.element(getCell(r, 0, 0)).toHaveFocus();
      });
      
      it('End moves to last cell in current row', async () => {
        const r = render(<GridTest />);
        getCell(r, 0, 0).focus();
        await userEvent.keyboard('{Home}{End}');
        await expect.element(getCell(r, 0, 2)).toHaveFocus();
      });
      
      it('Ctrl+Home moves to first cell in first row', async () => {
        const r = render(<GridTest />);
        getCell(r, 0, 0).focus();
        await userEvent.keyboard('{ArrowRight}{ArrowRight}{ArrowDown}');
        await userEvent.keyboard('{Control>}{Home}{/Control}');
        await expect.element(getCell(r, 0, 0)).toHaveFocus();
      });
      
      it('Ctrl+End moves to last cell in last row', async () => {
        const r = render(<GridTest />);
        getCell(r, 0, 0).focus();
        await userEvent.keyboard('{Control>}{End}{/Control}');
        await expect.element(getCell(r, 1, 2)).toHaveFocus();
      });
      
      it('PageDown jumps to last row when rowDelta is undefined (same col)', async () => {
        const r = render(<GridTest />);
        getCell(r, 0, 0).focus();
        await userEvent.keyboard('{ArrowRight}');
        await userEvent.keyboard('{PageDown}');
        await expect.element(getCell(r, 1, 1)).toHaveFocus();
      });
      
      it('PageUp jumps to first row when rowDelta is undefined (same col)', async () => {
        const r = render(<GridTest />);
        getCell(r, 0, 0).focus();
        await userEvent.keyboard('{ArrowRight}{PageDown}');
        await userEvent.keyboard('{PageUp}');
        await expect.element(getCell(r, 0, 1)).toHaveFocus();
      });
      
      it('PageDown moves by rowDelta rows when provided', async () => {
        const r = render(<GridTest rowDelta={1} />);
        getCell(r, 0, 0).focus();
        await userEvent.keyboard('{ArrowRight}');
        await userEvent.keyboard('{PageDown}');
        await expect.element(getCell(r, 1, 1)).toHaveFocus();
      });
      
      it('keeps exactly one tabbable gridcell at a time', async () => {
        const r = render(<GridTest />);
        
        const getTabbables = () =>
          r
            .getAllByRole('gridcell')
            .filter((el) => (el as HTMLElement).getAttribute('tabindex') === '0');
        
        expect(getTabbables()).toHaveLength(1);
        
        getCell(r, 0, 0).focus();
        await userEvent.keyboard('{ArrowRight}');
        
        expect(getTabbables()).toHaveLength(1);
      });
      
      it('moves roving tabIndex to the focused cell after navigation', async () => {
        const r = render(<GridTest />);
        
        getCell(r, 0, 0).focus();
        await userEvent.keyboard('{ArrowRight}');
        
        await expect.element(getCell(r, 0, 1)).toHaveAttribute('tabindex', '0');
        await expect.element(getCell(r, 0, 0)).toHaveAttribute('tabindex', '-1');
      });
    });
  });
});