import { ComponentProps, FC } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';
import { page, userEvent } from 'vitest/browser';

import { DayPicker } from '../DayPicker';
import { DayPickerCell, DayPickerLayout, DayPickerScroller, DayPickerScrollerContent, DayPickerScrollerLayout } from '../components';
import { formatISODate, getCurrentDate } from '@vega-ui/utils';
import { useDayPickerCellContext, useDayPickerContext } from '../contexts';
import { createCalendarSystem, formatCalendarDate, gregorianCalendar } from '@vega-ui/i18n';

afterEach(cleanup);

const MONTH = '2024-01-15';
const ROWS = 6;

const SIZE_DEFAULT = 'xs';
const SIZE_LG = 'lg';

const MONTH_A = '2025-07-20';
const MONTH_A_START = '2025-07-01';

const TESTID_CTX_MONTH = 'ctx-month';

const PeriodContext: FC = () => {
  const { month } = useDayPickerContext();
  
  return <div data-testid={TESTID_CTX_MONTH}>{month}</div>;
};

const LabeledCell: FC = () => {
  const { date } = useDayPickerCellContext();
  const { locale, calendar } = useDayPickerContext();
  
  if (date === undefined) return <DayPickerCell />;
  
  return <DayPickerCell aria-label={formatCalendarDate(calendar, date, locale, { dateStyle: 'full' })} />;
};

const DayPickerTest = (props?: Partial<ComponentProps<typeof DayPicker>>) => (
  <DayPicker {...props}>
    <PeriodContext />
    <DayPickerLayout
      month={MONTH}
      rows={ROWS}
      includeOverflowDays>
      <LabeledCell />
    </DayPickerLayout>
  </DayPicker>
);

const getGrid = (r: RenderResult) => r.getByRole('grid');
const getCells = (r: RenderResult) => r.getAllByRole('gridcell') as HTMLDivElement[];

const queryAnyDayCellWithNumber = (r: RenderResult) =>
  getCells(r).find((el) => /^\d+$/.test(el.textContent?.trim() ?? ''));

const queryFirstDisabledCell = (r: RenderResult) =>
  getCells(r).find((el) => el.getAttribute('aria-disabled') === 'true');

const getFirstInteractiveCell = (r: RenderResult) =>
  getCells(r).find(
    (el) => el.textContent?.trim() && el.getAttribute('aria-disabled') !== 'true'
  ) as HTMLDivElement;

const getDay = (r: RenderResult, day: string, locale = 'en-US') =>
  page.elementLocator(r.container).getByRole('gridcell', { name: formatCalendarDate(gregorianCalendar, day, locale, { dateStyle: 'full' }), exact: true });

const getCtxMonth = (r: RenderResult) => r.getByTestId(TESTID_CTX_MONTH);

describe('DayPicker', () => {
  describe('Critical User Paths', () => {
    describe('default', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<DayPickerTest />);
      });
      
      it('renders grid', async () => {
        await expect.element(getGrid(r)).toBeInTheDocument();
      });
      
      it('renders day cells', async () => {
        const cells = getCells(r);
        expect(cells.length).toBeGreaterThanOrEqual(28);
      });
      
      it('renders at least one numeric day cell', async () => {
        const anyDay = queryAnyDayCellWithNumber(r);
        expect(anyDay).toBeDefined();
      });
      
      it('click selects an interactive day cell', async () => {
        const cell = getFirstInteractiveCell(r);
        
        await expect.element(cell).toHaveAttribute('aria-selected', 'false');
        await userEvent.click(cell);
        await expect.element(cell).toHaveAttribute('aria-selected', 'true');
      });
      
      it('overflow days are non-interactive', async () => {
        const disabled = queryFirstDisabledCell(r);
        expect(disabled).toBeDefined();
      });
      
      it('applies default data-size to day cells', async () => {
        const cell = getFirstInteractiveCell(r);
        await expect.element(cell).toHaveAttribute('data-size', SIZE_DEFAULT);
      });
      
      it('passes size prop down to day cells', async () => {
        r.rerender(<DayPickerTest size={SIZE_LG} />);
        
        const cell = getFirstInteractiveCell(r);
        await expect.element(cell).toHaveAttribute('data-size', SIZE_LG);
      });
    });
    
    describe('month prop', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<DayPickerTest />);
      });
      
      it('defaults month to the current month when not provided', async () => {
        const now = getCurrentDate();
        const start = formatISODate(new Date(now.getFullYear(), now.getMonth(), 1));
        
        await expect.element(getCtxMonth(r)).toHaveTextContent(start);
      });
      
      it('provides the first day of the month from props to context', async () => {
        r.rerender(<DayPickerTest month={MONTH_A} />);
        
        await expect.element(getCtxMonth(r)).toHaveTextContent(MONTH_A_START);
      });
    });
  });
  
  describe('range selection', () => {
    it('reports the bounds in order when the range is picked backwards', async () => {
      const onSelectCell = vi.fn();
      const r = render(<DayPickerTest selection='range' onSelectCell={onSelectCell} />);

      await userEvent.click(getDay(r, '2024-01-20'));
      await userEvent.click(getDay(r, '2024-01-10'));

      expect(onSelectCell).toHaveBeenLastCalledWith(['2024-01-10', '2024-01-20']);
    });
  });

  describe('cell template', () => {
    const MarkedDay: FC = () => {
      const { date, label, fields } = useDayPickerCellContext();
      
      return <DayPickerCell data-testid={`day-${date}`}>{`${label}/${fields?.month}`}</DayPickerCell>;
    };
    
    it('renders the layout children once per day with the day in context', async () => {
      const r = render(
        <DayPicker month='2026-03-10'>
          <DayPickerLayout>
            <MarkedDay />
          </DayPickerLayout>
        </DayPicker>
      );
      
      await expect.element(r.getByTestId('day-2026-03-15')).toHaveTextContent('15/3');
      await expect.element(r.getByTestId('day-2026-03-31')).toHaveTextContent('31/3');
    });
    
    it('gives the fields and label in the calendar system and locale of the picker', async () => {
      const r = render(
        <DayPicker month='2025-03-21' calendar={createCalendarSystem('persian')} locale='en-US'>
          <DayPickerLayout>
            <MarkedDay />
          </DayPickerLayout>
        </DayPicker>
      );
      
      await expect.element(r.getByTestId('day-2025-03-21')).toHaveTextContent('1/1');
    });
  });
  
  describe('Accessibility', () => {
    describe('roles', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<DayPickerTest />);
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
        r = render(<DayPickerTest />);
      });
      
      it('aria-selected reflects selection state', async () => {
        const cell = getFirstInteractiveCell(r);
        
        await expect.element(cell).toHaveAttribute('aria-selected', 'false');
        await userEvent.click(cell);
        await expect.element(cell).toHaveAttribute('aria-selected', 'true');
      });
      
      it('aria-disabled marks non-interactive (overflow) days', async () => {
        const disabled = queryFirstDisabledCell(r);
        expect(disabled).toBeDefined();
        
        await expect.element(disabled as HTMLDivElement).toHaveAttribute(
          'aria-disabled',
          'true'
        );
      });
    });
    
    describe('keyboard', () => {
      it('Space toggles selection on focused interactive cell', async () => {
        const r = render(<DayPickerTest />);
        
        const cell = getFirstInteractiveCell(r);
        
        cell.focus();
        await expect.element(cell).toHaveFocus();
        await expect.element(cell).toHaveAttribute('aria-selected', 'false');
        
        await userEvent.keyboard(' ');
        await expect.element(cell).toHaveAttribute('aria-selected', 'true');
      });
    });
    
    describe('right-to-left', () => {
      const RtlTest = () => (
        <div dir='rtl'>
          <DayPicker month='2024-03-01' defaultActive='2024-03-13' locale='ar-EG'>
            <DayPickerLayout weekStartsOn={6}>
              <LabeledCell />
            </DayPickerLayout>
          </DayPicker>
        </div>
      );
      
      const getRtlDay = (r: RenderResult, day: string) => getDay(r, day, 'ar-EG');
      
      it('puts the first day of the week on the right', async () => {
        const r = render(<RtlTest />);
        
        const saturday = getRtlDay(r, '2024-03-09').element();
        const friday = getRtlDay(r, '2024-03-15').element();
        
        expect(saturday.getAttribute('data-col')).toBe('0');
        expect(saturday.getBoundingClientRect().left).toBeGreaterThan(friday.getBoundingClientRect().left);
      });
      
      it('ArrowRight moves to the previous day and ArrowLeft to the next day', async () => {
        const r = render(<RtlTest />);
        
        getRtlDay(r, '2024-03-13').element().focus();
        await userEvent.keyboard('{ArrowRight}');
        await expect.element(getRtlDay(r, '2024-03-12')).toHaveFocus();
        
        await userEvent.keyboard('{ArrowLeft}{ArrowLeft}');
        await expect.element(getRtlDay(r, '2024-03-14')).toHaveFocus();
      });
    });
    
    describe('tab stop', () => {
      const getTabbables = (r: RenderResult) => getCells(r).filter((el) => el.getAttribute('tabindex') === '0');
      
      const TabStopTest = (props?: Partial<ComponentProps<typeof DayPicker>>) => (
        <>
          <button type='button'>before</button>
          <DayPicker month='2024-03-01' {...props}>
            <DayPickerLayout>
              <LabeledCell />
            </DayPickerLayout>
          </DayPicker>
        </>
      );
      
      it('falls back to the first day of the visible month when today is not in it', async () => {
        const r = render(<TabStopTest />);
        
        await expect.poll(() => getTabbables(r)).toHaveLength(1);
        await expect.element(getDay(r, '2024-03-01')).toHaveAttribute('tabindex', '0');
      });
      
      it('prefers the selected day of the visible month', async () => {
        const r = render(<TabStopTest defaultSelected='2024-03-10' />);
        
        await expect.poll(() => getTabbables(r)).toHaveLength(1);
        await expect.element(getDay(r, '2024-03-10')).toHaveAttribute('tabindex', '0');
      });
      
      it('prefers the active day when it is in the visible month', async () => {
        const r = render(<TabStopTest defaultActive='2024-03-20' defaultSelected='2024-03-10' />);
        
        await expect.poll(() => getTabbables(r)).toHaveLength(1);
        await expect.element(getDay(r, '2024-03-20')).toHaveAttribute('tabindex', '0');
      });

      it('Tab moves focus into the grid and arrows continue from there', async () => {
        const r = render(<TabStopTest />);
        
        r.getByRole('button').focus();
        await userEvent.tab();
        await expect.element(getDay(r, '2024-03-01')).toHaveFocus();
        
        await userEvent.keyboard('{ArrowRight}');
        await expect.element(getDay(r, '2024-03-02')).toHaveFocus();
        await expect.poll(() => getTabbables(r)).toHaveLength(1);
        await expect.element(getDay(r, '2024-03-02')).toHaveAttribute('tabindex', '0');
      });
      
      it('keeps the tab stop on the visible month of a scroller', async () => {
        const r = render(
          <DayPicker month='2024-03-01'>
            <DayPickerScroller>
              <DayPickerScrollerContent>
                <DayPickerScrollerLayout>
                  <LabeledCell />
                </DayPickerScrollerLayout>
              </DayPickerScrollerContent>
            </DayPickerScroller>
          </DayPicker>
        );
        
        await expect.poll(() => getTabbables(r)).toHaveLength(1);
        await expect.element(getDay(r, '2024-03-01')).toHaveAttribute('tabindex', '0');
      });
    });
  });
});