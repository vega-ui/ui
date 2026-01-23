import { ComponentProps, FC } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { DayPicker } from '../DayPicker';
import { DayPickerLayout } from '../components';
import { getCurrentDate } from '@vega-ui/utils';
import { useDayPickerContext } from '../contexts';

afterEach(cleanup);

const YEAR = 2024;
const MONTH = 0;
const ROWS = 6;
const COLS = 7;

const SIZE_DEFAULT = 'xs';
const SIZE_LG = 'lg';

const YEAR_A = 2025;
const MONTH_A = 6;

const TESTID_CTX_YEAR = 'ctx-year';
const TESTID_CTX_MONTH = 'ctx-month';

const PeriodContext: FC = () => {
  const { year, month } = useDayPickerContext();
  
  return (
    <>
      <div data-testid={TESTID_CTX_YEAR}>{year}</div>
      <div data-testid={TESTID_CTX_MONTH}>{month}</div>
    </>
  );
};

const DayPickerTest = (props?: Partial<ComponentProps<typeof DayPicker>>) => (
  <DayPicker {...props}>
    <PeriodContext />
    <DayPickerLayout
      year={YEAR}
      month={MONTH}
      rows={ROWS}
      cols={COLS}
      includeOverflowDays
    />
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

const getCtxYear = (r: RenderResult) => r.getByTestId(TESTID_CTX_YEAR);
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
    
    describe('year/month props', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<DayPickerTest />);
      });
      
      it('defaults year/month to getCurrentDate() when not provided', async () => {
        const now = getCurrentDate();
        
        await expect.element(getCtxYear(r)).toHaveTextContent(String(now.getFullYear()));
        await expect.element(getCtxMonth(r)).toHaveTextContent(String(now.getMonth()));
      });
      
      it('provides year/month from props to context', async () => {
        r.rerender(<DayPickerTest year={YEAR_A} month={MONTH_A} />);
        
        await expect.element(getCtxYear(r)).toHaveTextContent(String(YEAR_A));
        await expect.element(getCtxMonth(r)).toHaveTextContent(String(MONTH_A));
      });
      
      it('when only year is provided, month defaults to getCurrentDate().getMonth()', async () => {
        const now = getCurrentDate();
        
        r.rerender(<DayPickerTest year={YEAR_A} />);
        
        await expect.element(getCtxYear(r)).toHaveTextContent(String(YEAR_A));
        await expect.element(getCtxMonth(r)).toHaveTextContent(String(now.getMonth()));
      });
      
      it('when only month is provided, year defaults to getCurrentDate().getFullYear()', async () => {
        const now = getCurrentDate();
        
        r.rerender(<DayPickerTest month={MONTH_A} />);
        
        await expect.element(getCtxYear(r)).toHaveTextContent(String(now.getFullYear()));
        await expect.element(getCtxMonth(r)).toHaveTextContent(String(MONTH_A));
      });
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
  });
});