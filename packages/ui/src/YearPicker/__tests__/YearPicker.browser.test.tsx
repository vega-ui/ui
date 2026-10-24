import { ComponentProps, FC } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';
import { page, userEvent } from 'vitest/browser';

import { YearPicker } from '../YearPicker';
import { YearPickerCell, YearPickerLayout, YearPickerScroller, YearPickerScrollerContent, YearPickerScrollerLayout } from '../components';
import { useYearPickerCellContext } from '../contexts';
import { createCalendarSystem } from '@vega-ui/i18n';

afterEach(cleanup);

const ROWS = 6;
const COLS = 7;

const SIZE_DEFAULT = 'xs';
const SIZE_LG = 'lg';

const YearPickerTest = (props?: Partial<ComponentProps<typeof YearPicker>>) => (
  <YearPicker {...props}>
    <YearPickerLayout
      rows={ROWS}
      cols={COLS}>
      <YearPickerCell />
    </YearPickerLayout>
  </YearPicker>
);

const getGrid = (r: RenderResult) => r.getByRole('grid');
const getCells = (r: RenderResult) => r.getAllByRole('gridcell') as HTMLDivElement[];

const queryAnyYearCellWithNumber = (r: RenderResult) =>
  getCells(r).find((el) => /^\d+$/.test(el.textContent?.trim() ?? ''));

const getFirstInteractiveCell = (r: RenderResult) =>
  getCells(r).find(
    (el) => el.textContent?.trim() && el.getAttribute('aria-disabled') !== 'true'
  ) as HTMLDivElement;

describe('YearPicker', () => {
  describe('Critical User Paths', () => {
    describe('default', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<YearPickerTest />);
      });
      
      it('renders grid', async () => {
        await expect.element(getGrid(r)).toBeInTheDocument();
      });
      
      it('renders day cells', async () => {
        const cells = getCells(r);
        expect(cells.length).toBeGreaterThanOrEqual(28);
      });
      
      it('renders at least one numeric day cell', async () => {
        const anyYear = queryAnyYearCellWithNumber(r);
        expect(anyYear).toBeDefined();
      });
      
      it('click selects an interactive day cell', async () => {
        const cell = getFirstInteractiveCell(r);
        
        await expect.element(cell).toHaveAttribute('aria-selected', 'false');
        await userEvent.click(cell);
        await expect.element(cell).toHaveAttribute('aria-selected', 'true');
      });
      
      it('applies default data-size to day cells', async () => {
        const cell = getFirstInteractiveCell(r);
        await expect.element(cell).toHaveAttribute('data-size', SIZE_DEFAULT);
      });
      
      it('passes size prop down to day cells', async () => {
        r.rerender(<YearPickerTest size={SIZE_LG} />);
        
        const cell = getFirstInteractiveCell(r);
        await expect.element(cell).toHaveAttribute('data-size', SIZE_LG);
      });
    });
  });
  
  describe('cell template', () => {
    const EraYear: FC = () => {
      const { date, label, fields } = useYearPickerCellContext();
      
      return <YearPickerCell data-testid={`year-${date}`}>{`${label} ${fields?.era ?? ''}`}</YearPickerCell>;
    };
    
    it('renders the layout children once per year with the era in context', async () => {
      const r = render(
        <YearPicker calendar={createCalendarSystem('japanese')} locale='en-US'>
          <YearPickerLayout start='2017-06-01' offset={0} rows={2} cols={3}>
            <EraYear />
          </YearPickerLayout>
        </YearPicker>
      );
      
      await expect.element(r.getByTestId('year-2019-01-01')).toHaveTextContent('Heisei');
      await expect.element(r.getByTestId('year-2019-05-01')).toHaveTextContent('Reiwa');
    });
  });
  
  describe('Edge Cases', () => {
    it('lists both years of a Japanese era change keyed by their first days', async () => {
      const r = render(
        <YearPicker calendar={createCalendarSystem('japanese')}>
          <YearPickerLayout start='2017-06-01' offset={0} rows={2} cols={3}>
            <YearPickerCell />
          </YearPickerLayout>
        </YearPicker>
      );
      
      const keys = getCells(r).map((el) => el.dataset.key);
      
      expect(keys).toEqual(['2017-01-01', '2018-01-01', '2019-01-01', '2019-05-01', '2020-01-01', '2021-01-01']);
    });
  });
  
  describe('Accessibility', () => {
    describe('roles', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<YearPickerTest />);
      });
      
      it('grid has role=grid', async () => {
        await expect.element(getGrid(r)).toHaveRole('grid');
      });
      
      it('day cells have role=gridcell', async () => {
        const cells = getCells(r);
        expect(cells.length).toBeGreaterThan(0);
        await expect.element(cells[0]).toHaveRole('gridcell');
      });
    });
    
    describe('aria', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<YearPickerTest />);
      });
      
      it('aria-selected reflects selection state', async () => {
        const cell = getFirstInteractiveCell(r);
        
        await expect.element(cell).toHaveAttribute('aria-selected', 'false');
        await userEvent.click(cell);
        await expect.element(cell).toHaveAttribute('aria-selected', 'true');
      });
    });
    
    describe('keyboard', () => {
      it('Space toggles selection on focused interactive cell', async () => {
        const r = render(<YearPickerTest />);
        
        const cell = getFirstInteractiveCell(r);
        
        cell.focus();
        await expect.element(cell).toHaveFocus();
        await expect.element(cell).toHaveAttribute('aria-selected', 'false');
        
        await userEvent.keyboard(' ');
        await expect.element(cell).toHaveAttribute('aria-selected', 'true');
      });
    });
    
    describe('tab stop', () => {
      const getTabbables = (r: RenderResult) => getCells(r).filter((el) => el.getAttribute('tabindex') === '0');
      const getYear = (r: RenderResult, year: string) => page.elementLocator(r.container).getByRole('gridcell', { name: year, exact: true });
      
      const ScrollerTest = (props?: Partial<ComponentProps<typeof YearPicker>>) => (
        <>
          <button type='button'>before</button>
          <YearPicker year='1900-06-01' {...props}>
            <YearPickerScroller>
              <YearPickerScrollerContent>
                <YearPickerScrollerLayout>
                  <YearPickerCell />
                </YearPickerScrollerLayout>
              </YearPickerScrollerContent>
            </YearPickerScroller>
          </YearPicker>
        </>
      );
      
      it('falls back to the first year of the page when the current year is not on it', async () => {
        const r = render(<YearPickerTest year='1900-06-01' />);
        
        await expect.poll(() => getTabbables(r)).toHaveLength(1);
        await expect.element(getYear(r, '1900')).toHaveAttribute('tabindex', '0');
      });
      
      it('falls back to the first year of the visible page of a scroller', async () => {
        const r = render(<ScrollerTest />);
        
        await expect.poll(() => getTabbables(r)).toHaveLength(1);
        await expect.element(getYear(r, '1900')).toHaveAttribute('tabindex', '0');
      });

      it('ignores a selected year on another page', async () => {
        const r = render(<ScrollerTest defaultSelected='1920-01-01' />);
        
        await expect.poll(() => getTabbables(r)).toHaveLength(1);
        await expect.element(getYear(r, '1900')).toHaveAttribute('tabindex', '0');
      });
      
      it('Tab moves focus into the grid', async () => {
        const r = render(
          <>
            <button type='button'>before</button>
            <YearPickerTest year='1900-06-01' />
          </>
        );
        
        r.getByRole('button').focus();
        await userEvent.tab();
        await expect.element(getYear(r, '1900')).toHaveFocus();
      });
    });
  });
});