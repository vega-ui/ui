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

const DEFAULT_ACTIVE = '2024-01-01';

const MonthPickerTest: FC<Partial<ComponentProps<typeof MonthPicker>>> = (props) => {
  return (
    <MonthPicker defaultFocusedDate={YEAR} {...props}>
      <MonthPickerLayout cols={COLS}>
        <MonthPickerCell />
      </MonthPickerLayout>
    </MonthPicker>
  );
};

const getCells = (r: RenderResult) => r.getAllByRole('gridcell') as HTMLDivElement[];

const getInteractiveCellAtIndex = (r: RenderResult, idx: number) =>
  getCells(r).filter((el) => el.getAttribute('aria-disabled') !== 'true')[idx] as HTMLDivElement;

describe('MonthPicker', () => {
  describe('Critical User Paths', () => {
    describe('default', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<MonthPickerTest defaultFocusedDate={DEFAULT_ACTIVE} />);
      });
      
      it('click selects an interactive month cell', async () => {
        const cell = getInteractiveCellAtIndex(r, 1);
        
        await expect.element(cell).toHaveAttribute('aria-selected', 'false');
        await userEvent.click(cell);
        await expect.element(cell).toHaveAttribute('aria-selected', 'true');
      });
      
    });

    describe('cell template', () => {
      const ShortMonth: FC = () => {
        const { date, label } = useMonthPickerCellContext();
      
        return <MonthPickerCell data-testid={`month-${date}`}>{label.slice(0, 3)}</MonthPickerCell>;
      };
    
      it('renders the layout children once per month with the month in context', async () => {
        const r = render(
          <MonthPicker defaultFocusedDate='2026-06-15' locale='en-US'>
            <MonthPickerLayout>
              <ShortMonth />
            </MonthPickerLayout>
          </MonthPicker>
        );
      
        await expect.element(r.getByTestId('month-2026-03-01')).toHaveTextContent('Mar');
        expect(getCells(r)).toHaveLength(12);
      });
    });
  });
  
  describe('Edge Cases', () => {
    it('renders the 13 months of a Hebrew leap year keyed by their first days', async () => {
      const r = render(<MonthPickerTest calendar={createCalendarSystem('hebrew')} defaultFocusedDate='2024-03-15' />);
      
      const keys = getCells(r).map((el) => el.dataset.key);
      
      expect(keys).toHaveLength(13);
      expect(keys[0]).toBe('2023-09-16');
      expect(keys[12]).toBe('2024-09-04');
    });
  });
  
  describe('Accessibility', () => {
    describe('keyboard', () => {
      it('Enter toggles selection on focused interactive cell', async () => {
        const r = render(<MonthPickerTest defaultFocusedDate={DEFAULT_ACTIVE} />);
        
        const cell = getInteractiveCellAtIndex(r, 1);
        
        cell.focus();
        await expect.element(cell).toHaveFocus();
        await expect.element(cell).toHaveAttribute('aria-selected', 'false');
        
        await userEvent.keyboard('{Enter}');
        await expect.element(cell).toHaveAttribute('aria-selected', 'true');
      });
    });
    
    describe('tab stop', () => {
      const getMonth = (r: RenderResult, month: string) => page.elementLocator(r.container).getByRole('gridcell', { name: month, exact: true });
      
      it('Tab moves focus into the grid', async () => {
        const r = render(
          <>
            <button type='button'>before</button>
            <MonthPickerTest defaultFocusedDate='2020-05-01' />
          </>
        );
        
        r.getByRole('button').focus();
        await userEvent.tab();
        await expect.element(getMonth(r, 'May')).toHaveFocus();
      });
    });

    describe('APG', () => {
      const YearTest = (props?: Partial<ComponentProps<typeof MonthPicker>>) => (
        <MonthPicker defaultFocusedDate='2020-05-01' locale='en-US' {...props}>
          <MonthPickerLayout cols={3}>
            <MonthPickerCell />
          </MonthPickerLayout>
        </MonthPicker>
      );

      const getMonth = (r: RenderResult, month: string) => page.elementLocator(r.container).getByRole('gridcell', { name: month, exact: true });
      const getTabStops = (r: RenderResult) => getCells(r).filter((el) => el.getAttribute('tabindex') === '0');

      const press = async (r: RenderResult, from: string, keys: string) => {
        getMonth(r, from).element().focus();
        await userEvent.keyboard(keys);
      };

      const expectFocusedTabStop = async (r: RenderResult, month: string) => {
        await expect.element(getMonth(r, month)).toHaveFocus();
        await expect.element(getMonth(r, month)).toHaveAttribute('tabindex', '0');
        await expect.poll(() => getTabStops(r)).toHaveLength(1);
      };

      describe('keyboard', () => {
        it('ArrowRight and ArrowLeft move focus by one month, wrapping rows, and carry the tab stop', async () => {
          const r = render(<YearTest />);

          await press(r, 'March', '{ArrowRight}');
          await expectFocusedTabStop(r, 'April');

          await userEvent.keyboard('{ArrowLeft}{ArrowLeft}');
          await expectFocusedTabStop(r, 'February');
        });
      });
    });
  });
});