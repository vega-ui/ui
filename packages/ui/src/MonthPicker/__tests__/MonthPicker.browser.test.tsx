import { ComponentProps, FC } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';
import { page, userEvent } from 'vitest/browser';

import { MonthPicker } from '../MonthPicker';
import { MonthPickerCell, MonthPickerLayout } from '../components';
import { useMonthPickerCellContext } from '../contexts';
import { createCalendarSystem } from '@vega-ui/i18n';

afterEach(cleanup);

const YEAR = '2024-06-15';
const COLS = 3;

const SIZE_DEFAULT = 'xs';
const SIZE_LG = 'lg';

const DEFAULT_ACTIVE = '2024-01-01';

const MonthPickerTest: FC<Partial<ComponentProps<typeof MonthPicker>>> = (props) => {
  return (
    <MonthPicker year={YEAR} {...props}>
      <MonthPickerLayout cols={COLS}>
        <MonthPickerCell />
      </MonthPickerLayout>
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
  
  describe('cell template', () => {
    const ShortMonth: FC = () => {
      const { date, label } = useMonthPickerCellContext();
      
      return <MonthPickerCell data-testid={`month-${date}`}>{label.slice(0, 3)}</MonthPickerCell>;
    };
    
    it('renders the layout children once per month with the month in context', async () => {
      const r = render(
        <MonthPicker year='2026-06-15' locale='en-US'>
          <MonthPickerLayout>
            <ShortMonth />
          </MonthPickerLayout>
        </MonthPicker>
      );
      
      await expect.element(r.getByTestId('month-2026-03-01')).toHaveTextContent('Mar');
      expect(getCells(r)).toHaveLength(12);
    });
  });
  
  describe('Edge Cases', () => {
    it('renders the 13 months of a Hebrew leap year keyed by their first days', async () => {
      const r = render(<MonthPickerTest calendar={createCalendarSystem('hebrew')} year='2024-03-15' />);
      
      const keys = getCells(r).map((el) => el.dataset.key);
      
      expect(keys).toHaveLength(13);
      expect(keys[0]).toBe('2023-09-16');
      expect(keys[12]).toBe('2024-09-04');
    });
    
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
    
    describe('tab stop', () => {
      const getTabbables = (r: RenderResult) => getCells(r).filter((el) => el.getAttribute('tabindex') === '0');
      const getMonth = (r: RenderResult, month: string) => page.elementLocator(r.container).getByRole('gridcell', { name: month, exact: true });
      
      it('falls back to the first month when the current month is in another year', async () => {
        const r = render(<MonthPickerTest year='2020-05-01' />);
        
        await expect.poll(() => getTabbables(r)).toHaveLength(1);
        await expect.element(getMonth(r, 'January')).toHaveAttribute('tabindex', '0');
      });
      
      it('prefers the selected month of the visible year', async () => {
        const r = render(<MonthPickerTest year='2020-05-01' defaultSelected='2020-07-01' />);
        
        await expect.poll(() => getTabbables(r)).toHaveLength(1);
        await expect.element(getMonth(r, 'July')).toHaveAttribute('tabindex', '0');
      });
      
      it('Tab moves focus into the grid', async () => {
        const r = render(
          <>
            <button type='button'>before</button>
            <MonthPickerTest year='2020-05-01' />
          </>
        );
        
        r.getByRole('button').focus();
        await userEvent.tab();
        await expect.element(getMonth(r, 'January')).toHaveFocus();
      });
    });
  });
});