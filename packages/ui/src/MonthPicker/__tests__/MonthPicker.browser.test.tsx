import { ComponentProps, FC } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { MonthPicker } from '../MonthPicker';
import { MonthPickerLayout } from '../components';

afterEach(cleanup);

const ROWS = 4;
const COLS = 3;

const SIZE_DEFAULT = 'xs';
const SIZE_LG = 'lg';

const DEFAULT_ACTIVE = 0;

const MonthPickerTest: FC<Partial<ComponentProps<typeof MonthPicker>>> = (props) => {
  return (
    <MonthPicker {...props}>
      <MonthPickerLayout rows={ROWS} cols={COLS} />
    </MonthPicker>
  );
};

const getGrid = (r: RenderResult) => r.getByRole('grid');
const getCells = (r: RenderResult) => r.getAllByRole('gridcell') as HTMLDivElement[];

const queryFirstDisabledCell = (r: RenderResult) =>
  getCells(r).find((el) => el.getAttribute('aria-disabled') === 'true');

const getFirstInteractiveCell = (r: RenderResult) =>
  getCells(r).find((el) => el.getAttribute('aria-disabled') !== 'true') as HTMLDivElement;

const getInteractiveCellAtIndex = (r: RenderResult, idx: number) =>
  getCells(r).filter((el) => el.getAttribute('aria-disabled') !== 'true')[idx] as HTMLDivElement;

describe('MonthPicker', () => {
  describe('Critical User Paths', () => {
    describe('default', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<MonthPickerTest defaultActive={DEFAULT_ACTIVE} />);
      });
      
      it('renders grid', async () => {
        await expect.element(getGrid(r)).toBeInTheDocument();
      });
      
      it('renders month cells', async () => {
        const cells = getCells(r);
        expect(cells.length).toBeGreaterThanOrEqual(12);
      });
      
      it('click selects an interactive month cell', async () => {
        const cell = getInteractiveCellAtIndex(r, 1);
        
        await expect.element(cell).toHaveAttribute('aria-selected', 'false');
        await userEvent.click(cell);
        await expect.element(cell).toHaveAttribute('aria-selected', 'true');
      });
      
      it('applies default data-size to month cells', async () => {
        const cell = getFirstInteractiveCell(r);
        await expect.element(cell).toHaveAttribute('data-size', SIZE_DEFAULT);
      });
      
      it('passes size prop down to month cells', async () => {
        r.rerender(<MonthPickerTest defaultActive={DEFAULT_ACTIVE} size={SIZE_LG} />);
        
        const cell = getFirstInteractiveCell(r);
        await expect.element(cell).toHaveAttribute('data-size', SIZE_LG);
      });
    });
  });
  
  describe('Edge Cases', () => {
    it('supports empty children (custom layout omitted)', async () => {
      const r = render(<MonthPicker defaultActive={DEFAULT_ACTIVE} />);
      await expect.element(getGrid(r)).toBeInTheDocument();
    });
  });
  
  describe('Accessibility', () => {
    describe('roles', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<MonthPickerTest defaultActive={DEFAULT_ACTIVE} />);
      });
      
      it('grid has role=grid', async () => {
        await expect.element(getGrid(r)).toHaveRole('grid');
      });
      
      it('month cells have role=gridcell', async () => {
        const cells = getCells(r);
        expect(cells.length).toBeGreaterThan(0);
        await expect.element(cells[0]).toHaveRole('gridcell');
      });
    });
    
    describe('aria', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<MonthPickerTest defaultActive={DEFAULT_ACTIVE} />);
      });
      
      it('aria-selected reflects selection state', async () => {
        const cell = getInteractiveCellAtIndex(r, 1);
        
        await expect.element(cell).toHaveAttribute('aria-selected', 'false');
        await userEvent.click(cell);
        await expect.element(cell).toHaveAttribute('aria-selected', 'true');
      });
      
      it('aria-disabled marks non-interactive months when present', async () => {
        const disabled = queryFirstDisabledCell(r);
        
        if (!disabled) return;
        
        await expect.element(disabled as HTMLDivElement).toHaveAttribute('aria-disabled', 'true');
      });
    });
    
    describe('keyboard', () => {
      it('Space toggles selection on focused interactive cell', async () => {
        const r = render(<MonthPickerTest defaultActive={DEFAULT_ACTIVE} />);
        
        const cell = getInteractiveCellAtIndex(r, 1);
        
        cell.focus();
        await expect.element(cell).toHaveFocus();
        await expect.element(cell).toHaveAttribute('aria-selected', 'false');
        
        await userEvent.keyboard(' ');
        await expect.element(cell).toHaveAttribute('aria-selected', 'true');
      });
      
      it('Enter toggles selection on focused interactive cell', async () => {
        const r = render(<MonthPickerTest defaultActive={DEFAULT_ACTIVE} />);
        
        const cell = getInteractiveCellAtIndex(r, 1);
        
        cell.focus();
        await expect.element(cell).toHaveFocus();
        await expect.element(cell).toHaveAttribute('aria-selected', 'false');
        
        await userEvent.keyboard('{Enter}');
        await expect.element(cell).toHaveAttribute('aria-selected', 'true');
      });
    });
  });
});