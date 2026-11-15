import { ComponentProps, FC } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';
import { page, userEvent } from 'vitest/browser';

import { YearPicker } from '../YearPicker';
import { YearPickerCell, YearPickerLayout, YearPickerScroller, YearPickerScrollerContent, YearPickerScrollerLayout } from '../components';
import { useYearPickerCellContext } from '../contexts';
import { createCalendarSystem } from '@vega-ui/i18n';

afterEach(cleanup);

const ROWS = 6;
const COLS = 7;

const YearPickerTest = (props?: Partial<ComponentProps<typeof YearPicker>>) => (
  <YearPicker {...props}>
    <YearPickerLayout
      rows={ROWS}
      cols={COLS}>
      <YearPickerCell />
    </YearPickerLayout>
  </YearPicker>
);

const getCells = (r: RenderResult) => r.getAllByRole('gridcell') as HTMLDivElement[];

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
      
      it('click selects an interactive day cell', async () => {
        const cell = getFirstInteractiveCell(r);
        
        await expect.element(cell).toHaveAttribute('aria-selected', 'false');
        await userEvent.click(cell);
        await expect.element(cell).toHaveAttribute('aria-selected', 'true');
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
    describe('tab stop', () => {
      const getTabbables = (r: RenderResult) => getCells(r).filter((el) => el.getAttribute('tabindex') === '0');
      const getYear = (r: RenderResult, year: string) => page.elementLocator(r.container).getByRole('gridcell', { name: year, exact: true });
      
      const ScrollerTest = (props?: Partial<ComponentProps<typeof YearPicker>>) => (
        <>
          <button type='button'>before</button>
          <YearPicker defaultFocusedDate='1900-06-01' {...props}>
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
      
      it('falls back to the first year of the visible page of a scroller', async () => {
        const r = render(<ScrollerTest />);
        
        await expect.poll(() => getTabbables(r)).toHaveLength(1);
        await expect.element(getYear(r, '1900')).toHaveAttribute('tabindex', '0');
      });

      it('ignores a selected year on another page', async () => {
        const r = render(<ScrollerTest defaultValue='1920-01-01' />);
        
        await expect.poll(() => getTabbables(r)).toHaveLength(1);
        await expect.element(getYear(r, '1900')).toHaveAttribute('tabindex', '0');
      });
      
      it('PageDown and PageUp move focus by a page of years, also past the rendered pages', async () => {
        const r = render(<ScrollerTest />);

        getYear(r, '1900').element().focus();
        await userEvent.keyboard('{PageDown}{PageDown}{PageDown}');

        await expect.element(getYear(r, '1936')).toHaveFocus();
        await expect.poll(() => getTabbables(r)).toHaveLength(1);

        await userEvent.keyboard('{PageUp}');

        await expect.element(getYear(r, '1924')).toHaveFocus();
      });

      it('Tab moves focus into the grid', async () => {
        const r = render(
          <>
            <button type='button'>before</button>
            <YearPickerTest defaultFocusedDate='1900-06-01' />
          </>
        );
        
        r.getByRole('button').focus();
        await userEvent.tab();
        await expect.element(getYear(r, '1900')).toHaveFocus();
      });
    });

    describe('APG', () => {
      const PageTest = (props?: Partial<ComponentProps<typeof YearPicker>>) => (
        <YearPicker defaultFocusedDate='1900-06-01' {...props}>
          <YearPickerLayout rows={ROWS} cols={COLS}>
            <YearPickerCell />
          </YearPickerLayout>
        </YearPicker>
      );

      const getYear = (r: RenderResult, year: string) => page.elementLocator(r.container).getByRole('gridcell', { name: year, exact: true });
      const getTabStops = (r: RenderResult) => getCells(r).filter((el) => el.getAttribute('tabindex') === '0');

      const press = async (r: RenderResult, from: string, keys: string) => {
        getYear(r, from).element().focus();
        await userEvent.keyboard(keys);
      };

      const expectFocusedTabStop = async (r: RenderResult, year: string) => {
        await expect.element(getYear(r, year)).toHaveFocus();
        await expect.element(getYear(r, year)).toHaveAttribute('tabindex', '0');
        await expect.poll(() => getTabStops(r)).toHaveLength(1);
      };

      describe('keyboard', () => {
        it('ArrowRight and ArrowLeft move focus by one year, wrapping rows, and carry the tab stop', async () => {
          const r = render(<PageTest />);

          await press(r, '1906', '{ArrowRight}');
          await expectFocusedTabStop(r, '1907');

          await userEvent.keyboard('{ArrowLeft}{ArrowLeft}');
          await expectFocusedTabStop(r, '1905');
        });

        it('Enter selects the focused year', async () => {
          const onChangeValue = vi.fn();
          const r = render(<PageTest onChangeValue={onChangeValue} />);

          await press(r, '1900', '{ArrowRight}{Enter}');

          expect(onChangeValue).toHaveBeenLastCalledWith('1901-01-01');
          await expect.element(getYear(r, '1901')).toHaveAttribute('aria-selected', 'true');
        });
      });
    });
  });
});