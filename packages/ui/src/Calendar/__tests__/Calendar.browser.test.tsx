import { ComponentProps, useState } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { page, userEvent, type Locator } from 'vitest/browser';
import { cleanup, render, type RenderResult } from '@testing-library/react';

import { Calendar } from '../Calendar';
import {
  CalendarContent,
  CalendarDays,
  CalendarHeader,
  CalendarMonths,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarViewButton,
  CalendarViewButtonGroup,
  CalendarYears,
  CalendarMonthLabel,
  CalendarYearLabel,
  CalendarDay,
  type CalendarDayProps,
  CalendarMonth,
  CalendarYear,
  CalendarWeekdays, CalendarWeekday,
  CalendarWeeks,
} from '../components';
import { useCalendarContext, useCalendarDayContext, useCalendarMonthContext, useCalendarYearContext } from '../contexts';
import { createCalendarSystem, formatCalendarDate, gregorianCalendar, type CalendarSystem } from '@vega-ui/i18n';

afterEach(cleanup);

const MonthLabel = () => <span data-testid='month-label'>Month</span>;
const YearLabel = () => <span data-testid='year-label'>Year</span>;

const LabeledDay = ({ children }: CalendarDayProps) => {
  const { date } = useCalendarDayContext();
  const { locale, calendar } = useCalendarContext();

  if (date === undefined) return <CalendarDay />;

  return <CalendarDay aria-label={formatCalendarDate(calendar, date, locale, { dateStyle: 'full' })}>{children}</CalendarDay>;
};

const CalendarTest = (props: ComponentProps<typeof Calendar>) => {
  const { children, ...rest } = props;
  
  return (
    <Calendar {...rest}>
      {children ?? (
        <>
          <CalendarHeader>
            <CalendarPrevButton data-testid='prev-button'>Prev</CalendarPrevButton>
            
            <CalendarViewButtonGroup data-testid='picker-group'>
              <CalendarViewButton view='month' data-testid='month-picker-button'>
                <MonthLabel />
              </CalendarViewButton>
              <CalendarViewButton view='year' data-testid='year-picker-button'>
                <YearLabel />
              </CalendarViewButton>
            </CalendarViewButtonGroup>
            
            <CalendarNextButton data-testid='next-button'>Next</CalendarNextButton>
          </CalendarHeader>
          
          <CalendarContent data-testid='content'>
            <CalendarDays data-testid='day-picker'>
              <CalendarWeekdays>
                <CalendarWeekday />
              </CalendarWeekdays>
              <CalendarWeeks>
                <LabeledDay />
              </CalendarWeeks>
            </CalendarDays>
            <CalendarMonths data-testid='month-picker'>
              <CalendarMonth />
            </CalendarMonths>
            <CalendarYears data-testid='year-picker'>
              <CalendarYear />
            </CalendarYears>
          </CalendarContent>
        </>
      )}
    </Calendar>
  );
};

const getPrev = (r: RenderResult) => r.getByTestId('prev-button') as HTMLButtonElement;
const getNext = (r: RenderResult) => r.getByTestId('next-button') as HTMLButtonElement;

const getMonthBtn = (r: RenderResult) => r.getByTestId('month-picker-button') as HTMLButtonElement;
const getYearBtn = (r: RenderResult) => r.getByTestId('year-picker-button') as HTMLButtonElement;

const getContent = (r: RenderResult) => r.getByTestId('content');

const getDayName = (iso: string, { calendar = gregorianCalendar, locale = 'en-US' }: { calendar?: CalendarSystem; locale?: string } = {}) =>
  formatCalendarDate(calendar, iso, locale, { dateStyle: 'full' });

const getDay = (r: RenderResult, iso: string, options?: { calendar?: CalendarSystem; locale?: string }) =>
  page.elementLocator(getContent(r)).getByRole('gridcell', { name: getDayName(iso, options), exact: true });

const getDayInPicker = (r: RenderResult, iso: string) =>
  page.elementLocator(r.getByTestId('day-picker')).getByRole('gridcell', { name: getDayName(iso), exact: true });

const getSelectedDays = (r: RenderResult) => r.getByTestId('day-picker').querySelectorAll('[role="gridcell"][aria-selected="true"]');

const getDayPicker = (r: RenderResult) => r.getByTestId('day-picker');
const getMonthPicker = (r: RenderResult) => r.getByTestId('month-picker');
const getYearPicker = (r: RenderResult) => r.getByTestId('year-picker');

const getYear = (r: RenderResult, year: number) =>
  page.elementLocator(getYearPicker(r)).getByRole('gridcell', { name: String(year), exact: true });

const isPageVisible = (cell: Locator) => {
  const cellPage = cell.query()?.closest('[data-index]');
  const scroller = cellPage?.parentElement;
  if (!cellPage || !scroller) return false;
  
  const outer = scroller.getBoundingClientRect();
  const inner = cellPage.getBoundingClientRect();
  
  return inner.left >= outer.left - 1 && inner.right <= outer.right + 1;
};

describe('Calendar', () => {
  describe('Critical User Paths', () => {
    describe('default', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<CalendarTest />);
      });
      
      it('renders prev button', async () => {
        await expect.element(getPrev(r)).toBeInTheDocument();
      });
      
      it('renders next button', async () => {
        await expect.element(getNext(r)).toBeInTheDocument();
      });
      
      it('renders month picker button', async () => {
        await expect.element(getMonthBtn(r)).toBeInTheDocument();
      });
      
      it('renders year picker button', async () => {
        await expect.element(getYearBtn(r)).toBeInTheDocument();
      });
      
      it('renders content', async () => {
        await expect.element(getContent(r)).toBeInTheDocument();
      });
      
      it('renders day picker', async () => {
        await expect.element(getDayPicker(r)).toBeInTheDocument();
      });
      
      it('renders month picker', async () => {
        await expect.element(getMonthPicker(r)).toBeInTheDocument();
      });
      
      it('renders year picker', async () => {
        await expect.element(getYearPicker(r)).toBeInTheDocument();
      });
      
      it('default visible state: day picker is visible', async () => {
        await expect.element(getDayPicker(r)).toHaveAttribute('data-visible', 'true');
      });
      
      it('default visible state: month picker is hidden', async () => {
        await expect.element(getMonthPicker(r)).toHaveAttribute('data-visible', 'false');
      });
      
      it('default visible state: year picker is hidden', async () => {
        await expect.element(getYearPicker(r)).toHaveAttribute('data-visible', 'false');
      });
      
      it('default inert state: day picker is not inert', async () => {
        await expect.element(getDayPicker(r)).not.toHaveAttribute('inert');
      });
      
      it('default inert state: month picker is inert', async () => {
        await expect.element(getMonthPicker(r)).toHaveAttribute('inert');
      });
      
      it('default inert state: year picker is inert', async () => {
        await expect.element(getYearPicker(r)).toHaveAttribute('inert');
      });
      
      it('default aria-pressed: month button is not pressed', async () => {
        await expect.element(getMonthBtn(r)).toHaveAttribute('aria-pressed', 'false');
      });
      
      it('default aria-pressed: year button is not pressed', async () => {
        await expect.element(getYearBtn(r)).toHaveAttribute('aria-pressed', 'false');
      });
    });
    
    describe('when opening month picker', () => {
      let r: RenderResult;
      
      beforeEach(async () => {
        r = render(<CalendarTest />);
        await userEvent.click(getMonthBtn(r));
      });
      
      it('sets aria-pressed=true on month button', async () => {
        await expect.element(getMonthBtn(r)).toHaveAttribute('aria-pressed', 'true');
      });
      
      it('keeps year button aria-pressed=false', async () => {
        await expect.element(getYearBtn(r)).toHaveAttribute('aria-pressed', 'false');
      });
      
      it('hides day picker', async () => {
        await expect.element(getDayPicker(r)).toHaveAttribute('data-visible', 'false');
      });
      
      it('shows month picker', async () => {
        await expect.element(getMonthPicker(r)).toHaveAttribute('data-visible', 'true');
      });
      
      it('hides year picker', async () => {
        await expect.element(getYearPicker(r)).toHaveAttribute('data-visible', 'false');
      });
      
      it('sets inert on day picker', async () => {
        await expect.element(getDayPicker(r)).toHaveAttribute('inert');
      });
      
      it('removes inert from month picker', async () => {
        await expect.element(getMonthPicker(r)).not.toHaveAttribute('inert');
      });
      
      it('sets inert on year picker', async () => {
        await expect.element(getYearPicker(r)).toHaveAttribute('inert');
      });
    });
    
    describe('when closing month picker (click twice)', () => {
      let r: RenderResult;
      
      beforeEach(async () => {
        r = render(<CalendarTest />);
        await userEvent.click(getMonthBtn(r));
        await userEvent.click(getMonthBtn(r));
      });
      
      it('returns aria-pressed=false on month button', async () => {
        await expect.element(getMonthBtn(r)).toHaveAttribute('aria-pressed', 'false');
      });
      
      it('shows day picker', async () => {
        await expect.element(getDayPicker(r)).toHaveAttribute('data-visible', 'true');
      });
      
      it('hides month picker', async () => {
        await expect.element(getMonthPicker(r)).toHaveAttribute('data-visible', 'false');
      });
      
      it('hides year picker', async () => {
        await expect.element(getYearPicker(r)).toHaveAttribute('data-visible', 'false');
      });
      
      it('removes inert from day picker', async () => {
        await expect.element(getDayPicker(r)).not.toHaveAttribute('inert');
      });
      
      it('sets inert on month picker', async () => {
        await expect.element(getMonthPicker(r)).toHaveAttribute('inert');
      });
      
      it('sets inert on year picker', async () => {
        await expect.element(getYearPicker(r)).toHaveAttribute('inert');
      });
    });
    
    describe('when opening year picker', () => {
      let r: RenderResult;
      
      beforeEach(async () => {
        r = render(<CalendarTest />);
        await userEvent.click(getYearBtn(r));
      });
      
      it('sets aria-pressed=true on year button', async () => {
        await expect.element(getYearBtn(r)).toHaveAttribute('aria-pressed', 'true');
      });
      
      it('keeps month button aria-pressed=false', async () => {
        await expect.element(getMonthBtn(r)).toHaveAttribute('aria-pressed', 'false');
      });
      
      it('hides day picker', async () => {
        await expect.element(getDayPicker(r)).toHaveAttribute('data-visible', 'false');
      });
      
      it('hides month picker', async () => {
        await expect.element(getMonthPicker(r)).toHaveAttribute('data-visible', 'false');
      });
      
      it('shows year picker', async () => {
        await expect.element(getYearPicker(r)).toHaveAttribute('data-visible', 'true');
      });
      
      it('sets inert on day picker', async () => {
        await expect.element(getDayPicker(r)).toHaveAttribute('inert');
      });
      
      it('sets inert on month picker', async () => {
        await expect.element(getMonthPicker(r)).toHaveAttribute('inert');
      });
      
      it('removes inert from year picker', async () => {
        await expect.element(getYearPicker(r)).not.toHaveAttribute('inert');
      });
    });
    
    describe('when switching from month picker to year picker', () => {
      let r: RenderResult;
      
      beforeEach(async () => {
        r = render(<CalendarTest />);
        await userEvent.click(getMonthBtn(r));
        await userEvent.click(getYearBtn(r));
      });
      
      it('sets aria-pressed=true on year button', async () => {
        await expect.element(getYearBtn(r)).toHaveAttribute('aria-pressed', 'true');
      });
      
      it('sets aria-pressed=false on month button', async () => {
        await expect.element(getMonthBtn(r)).toHaveAttribute('aria-pressed', 'false');
      });
      
      it('shows year picker', async () => {
        await expect.element(getYearPicker(r)).toHaveAttribute('data-visible', 'true');
      });
      
      it('hides month picker', async () => {
        await expect.element(getMonthPicker(r)).toHaveAttribute('data-visible', 'false');
      });
      
      it('hides day picker', async () => {
        await expect.element(getDayPicker(r)).toHaveAttribute('data-visible', 'false');
      });
      
      it('removes inert from year picker', async () => {
        await expect.element(getYearPicker(r)).not.toHaveAttribute('inert');
      });
      
      it('sets inert on month picker', async () => {
        await expect.element(getMonthPicker(r)).toHaveAttribute('inert');
      });
      
      it('sets inert on day picker', async () => {
        await expect.element(getDayPicker(r)).toHaveAttribute('inert');
      });
    });
    
    describe('when clicking prev/next while day picker is visible', () => {
      let r: RenderResult;
      let onChangeMonth: Mock;
      
      beforeEach(() => {
        onChangeMonth = vi.fn();
        r = render(<CalendarTest defaultMonth='2026-01-15' onChangeMonth={onChangeMonth} />);
      });
      
      it('does not crash on next', async () => {
        await userEvent.click(getNext(r));
        await expect.element(getNext(r)).toBeInTheDocument();
      });
      
      it('does not crash on prev', async () => {
        await userEvent.click(getPrev(r));
        await expect.element(getPrev(r)).toBeInTheDocument();
      });
      
      it('reports the first day of the next visible month', async () => {
        await userEvent.click(getNext(r));
        await expect.poll(() => onChangeMonth.mock.lastCall?.[0]).toBe('2026-02-01');
      });
      
      it('reports the first day of the previous visible month', async () => {
        await userEvent.click(getPrev(r));
        await expect.poll(() => onChangeMonth.mock.lastCall?.[0]).toBe('2025-12-01');
      });
    });
  });
  
  describe('Value API', () => {
    it('selects the controlled YYYY-MM-DD value', async () => {
      const r = render(<CalendarTest value='2026-01-15' defaultMonth='2026-01-01' onChangeValue={vi.fn()} />);
      
      await expect.element(getDay(r, '2026-01-15')).toHaveAttribute('aria-selected', 'true');
    });
    
    it('clears the selection when the controlled value becomes empty', async () => {
      const r = render(<CalendarTest value='2026-01-15' defaultMonth='2026-01-01' onChangeValue={vi.fn()} />);
      await expect.element(getDay(r, '2026-01-15')).toHaveAttribute('aria-selected', 'true');
      
      r.rerender(<CalendarTest value='' defaultMonth='2026-01-01' onChangeValue={vi.fn()} />);
      await expect.poll(() => getSelectedDays(r).length).toBe(0);
    });
    
    it('keeps an empty controlled value empty when a day is clicked', async () => {
      const onChangeValue = vi.fn();
      const r = render(<CalendarTest value='' defaultMonth='2026-01-01' onChangeValue={onChangeValue} />);
      
      await userEvent.click(getDay(r, '2026-01-15'));
      
      expect(onChangeValue).toHaveBeenCalledWith('2026-01-15');
      expect(getSelectedDays(r)).toHaveLength(0);
    });
    
    it('treats a malformed or non-existent value as unselected', async () => {
      const r = render(<CalendarTest value='2026-02-31' defaultMonth='2026-02-01' onChangeValue={vi.fn()} />);
      
      await expect.element(getDay(r, '2026-02-15')).toBeInTheDocument();
      expect(getSelectedDays(r)).toHaveLength(0);
    });
    
    it('selects defaultValue in uncontrolled mode', async () => {
      const r = render(<CalendarTest defaultValue='2026-01-15' defaultMonth='2026-01-01' />);
      
      await expect.element(getDay(r, '2026-01-15')).toHaveAttribute('aria-selected', 'true');
    });
    
    it('reports a picked day as a YYYY-MM-DD string', async () => {
      const onChangeValue = vi.fn();
      const r = render(<CalendarTest defaultMonth='2026-01-01' onChangeValue={onChangeValue} />);
      
      await userEvent.click(getDay(r, '2026-01-15'));
      
      expect(onChangeValue).toHaveBeenLastCalledWith('2026-01-15');
      await expect.element(getDay(r, '2026-01-15')).toHaveAttribute('aria-selected', 'true');
    });
    
    it('does not report a change when the already selected day is clicked again', async () => {
      const onChangeValue = vi.fn();
      const r = render(<CalendarTest defaultValue='2026-01-15' onChangeValue={onChangeValue} />);
      
      await userEvent.click(getDay(r, '2026-01-15'));
      
      expect(onChangeValue).not.toHaveBeenCalled();
      
      await userEvent.click(getDay(r, '2026-01-16'));
      
      expect(onChangeValue).toHaveBeenCalledTimes(1);
      expect(onChangeValue).toHaveBeenCalledWith('2026-01-16');
    });
    
    it('does not report a change when a controlled selected day is clicked again', async () => {
      const onChangeValue = vi.fn();
      const r = render(<CalendarTest value='2026-01-15' onChangeValue={onChangeValue} />);
      
      await userEvent.click(getDay(r, '2026-01-15'));
      
      expect(onChangeValue).not.toHaveBeenCalled();
      
      await userEvent.click(getDay(r, '2026-01-16'));
      
      expect(onChangeValue).toHaveBeenCalledTimes(1);
      expect(onChangeValue).toHaveBeenCalledWith('2026-01-16');
    });
    
    it('reports a range as a [start, end] tuple with an empty unset bound', async () => {
      const onChangeValue = vi.fn();
      const r = render(<CalendarTest selection='range' defaultMonth='2026-01-01' onChangeValue={onChangeValue} />);
      
      await userEvent.click(getDay(r, '2026-01-10'));
      expect(onChangeValue).toHaveBeenLastCalledWith(['2026-01-10', '']);
      
      await userEvent.click(getDay(r, '2026-01-15'));
      expect(onChangeValue).toHaveBeenLastCalledWith(['2026-01-10', '2026-01-15']);
    });
    
    it('reports a range picked backwards in [start, end] order', async () => {
      const onChangeValue = vi.fn();
      const r = render(<CalendarTest selection='range' defaultMonth='2026-01-01' onChangeValue={onChangeValue} />);
      
      await userEvent.click(getDay(r, '2026-01-15'));
      await userEvent.click(getDay(r, '2026-01-10'));
      
      expect(onChangeValue).toHaveBeenLastCalledWith(['2026-01-10', '2026-01-15']);
    });
    
    it('reports a controlled range picked backwards in [start, end] order', async () => {
      const Controlled = ({ onChangeValue }: { onChangeValue(value: [string, string]): void }) => {
        const [value, setValue] = useState<[string, string]>(['', '']);
        
        const change = (next: [string, string]) => {
          setValue(next);
          onChangeValue(next);
        };
        
        return <Calendar selection='range' value={value} defaultMonth='2026-01-01' onChangeValue={change}><CalendarDays data-testid='day-picker'><CalendarWeeks><LabeledDay /></CalendarWeeks></CalendarDays></Calendar>;
      };
      
      const onChangeValue = vi.fn();
      const r = render(<Controlled onChangeValue={onChangeValue} />);
      
      await userEvent.click(getDayInPicker(r, '2026-01-15'));
      await userEvent.click(getDayInPicker(r, '2026-01-10'));
      
      expect(onChangeValue).toHaveBeenLastCalledWith(['2026-01-10', '2026-01-15']);
      await expect.element(getDayInPicker(r, '2026-01-12')).toHaveAttribute('aria-selected', 'true');
    });
    
    it('types onChangeValue as a single date when selection is omitted', async () => {
      const Single = () => {
        const [value, setValue] = useState('');
        
        return <Calendar value={value} defaultMonth='2026-01-01' onChangeValue={setValue}><CalendarDays data-testid='day-picker'><CalendarWeeks><LabeledDay /></CalendarWeeks></CalendarDays></Calendar>;
      };
      
      const r = render(<Single />);
      
      await userEvent.click(getDayInPicker(r, '2026-01-12'));
      
      await expect.element(getDayInPicker(r, '2026-01-12')).toHaveAttribute('aria-selected', 'true');
    });
    
    it('types onChangeValue by the selection mode', () => {
      const typed = (
        <>
          <Calendar onChangeValue={(value: string) => value} />
          <Calendar selection='single' onChangeValue={(value: string) => value} />
          <Calendar selection='multiple' onChangeValue={(value: string[]) => value} />
          <Calendar selection='range' onChangeValue={(value: [string, string]) => value} />
          {/* @ts-expect-error a range is not a single date */}
          <Calendar selection='range' onChangeValue={(value: string) => value} />
          {/* @ts-expect-error a single date is not an array */}
          <Calendar onChangeValue={(value: string[]) => value} />
        </>
      );
      
      expect(typed).toBeTruthy();
    });
    
    it('selects a controlled range', async () => {
      const r = render(
        <CalendarTest selection='range' value={['2026-01-10', '2026-01-12']} defaultMonth='2026-01-01' onChangeValue={vi.fn()} />,
      );
      
      await expect.element(getDay(r, '2026-01-10')).toHaveAttribute('aria-selected', 'true');
      await expect.element(getDay(r, '2026-01-11')).toHaveAttribute('aria-selected', 'true');
      await expect.element(getDay(r, '2026-01-12')).toHaveAttribute('aria-selected', 'true');
      await expect.element(getDay(r, '2026-01-13')).toHaveAttribute('aria-selected', 'false');
    });
    
    it('reports multiple selection as an array of YYYY-MM-DD strings', async () => {
      const onChangeValue = vi.fn();
      const r = render(<CalendarTest selection='multiple' defaultMonth='2026-01-01' onChangeValue={onChangeValue} />);
      
      await userEvent.click(getDay(r, '2026-01-10'));
      await userEvent.click(getDay(r, '2026-01-12'));
      
      expect(onChangeValue).toHaveBeenLastCalledWith(['2026-01-10', '2026-01-12']);
    });
    
    it('shows the month given by defaultMonth', async () => {
      const r = render(<CalendarTest defaultMonth='2020-03-20' />);
      
      await expect.element(getDay(r, '2020-03-15')).toBeInTheDocument();
    });
    
    it('shows a controlled month given by any of its days and reports navigation as the first day', async () => {
      const onChangeMonth = vi.fn();
      const r = render(<CalendarTest month='2026-05-31' onChangeMonth={onChangeMonth} />);
      
      await expect.element(getDay(r, '2026-05-31')).toBeInTheDocument();
      
      await userEvent.click(getNext(r));
      await expect.poll(() => onChangeMonth.mock.lastCall?.[0]).toBe('2026-06-01');
    });
    
    it('disables days outside min and max', async () => {
      const r = render(<CalendarTest min='2026-01-10' max='2026-01-20' defaultMonth='2026-01-01' />);
      
      await expect.element(getDay(r, '2026-01-09')).toHaveAttribute('aria-disabled', 'true');
      await expect.element(getDay(r, '2026-01-10')).toHaveAttribute('aria-disabled', 'false');
      await expect.element(getDay(r, '2026-01-20')).toHaveAttribute('aria-disabled', 'false');
      await expect.element(getDay(r, '2026-01-21')).toHaveAttribute('aria-disabled', 'true');
    });
    
    it('disables dates listed in disabledDates', async () => {
      const r = render(<CalendarTest disabledDates={['2026-01-15']} defaultMonth='2026-01-01' />);
      
      await expect.element(getDay(r, '2026-01-15')).toHaveAttribute('aria-disabled', 'true');
      await expect.element(getDay(r, '2026-01-16')).toHaveAttribute('aria-disabled', 'false');
    });
    
    it('passes YYYY-MM-DD strings to a disabledDates predicate', async () => {
      const r = render(<CalendarTest disabledDates={(date) => date.endsWith('-13')} defaultMonth='2026-01-01' />);
      
      await expect.element(getDay(r, '2026-01-13')).toHaveAttribute('aria-disabled', 'true');
      await expect.element(getDay(r, '2026-01-14')).toHaveAttribute('aria-disabled', 'false');
    });
  });
  
  describe('initial month and keyboard focus', () => {
    afterEach(() => {
      vi.useRealTimers();
    });
    
    it('shows the month of the selected date by default', async () => {
      const r = render(<CalendarTest defaultValue='2020-03-10' />);
      
      await expect.element(getDay(r, '2020-03-10')).toHaveAttribute('aria-selected', 'true');
    });
    
    it('focuses the selected day when it is in the visible month', async () => {
      vi.setSystemTime(new Date(2026, 2, 20));
      const r = render(<CalendarTest value='2026-03-10' onChangeValue={vi.fn()} />);
      
      await expect.element(getDay(r, '2026-03-10')).toHaveAttribute('tabindex', '0');
      await expect.element(getDay(r, '2026-03-20')).toHaveAttribute('tabindex', '-1');
    });
    
    it('focuses today when nothing is selected in the visible month', async () => {
      vi.setSystemTime(new Date(2026, 2, 20));
      const r = render(<CalendarTest defaultMonth='2026-03-01' />);
      
      await expect.element(getDay(r, '2026-03-20')).toHaveAttribute('tabindex', '0');
    });
    
    it('focuses the first available day when neither the selection nor today is in the visible month', async () => {
      vi.setSystemTime(new Date(2026, 2, 20));
      const r = render(<CalendarTest defaultMonth='2020-03-01' min='2020-03-05' />);
      
      await expect.element(getDay(r, '2020-03-05')).toHaveAttribute('tabindex', '0');
    });
  });
  
  describe('page keys', () => {
    const press = async (r: RenderResult, from: string, keys: string) => {
      getDay(r, from).element().focus();
      await userEvent.keyboard(keys);
    };
    
    it('moves focus to the same day of the next and previous month', async () => {
      const r = render(<CalendarTest defaultValue='2026-01-15' />);
      
      await press(r, '2026-01-15', '{PageDown}');
      await expect.element(getDay(r, '2026-02-15')).toHaveFocus();
      
      await userEvent.keyboard('{PageUp}{PageUp}');
      await expect.element(getDay(r, '2025-12-15')).toHaveFocus();
    });
    
    it('moves focus to the same day of the next and previous year with Shift', async () => {
      const r = render(<CalendarTest defaultValue='2026-01-15' />);
      
      await press(r, '2026-01-15', '{Shift>}{PageDown}{/Shift}');
      await expect.element(getDay(r, '2027-01-15')).toHaveFocus();
      
      await userEvent.keyboard('{Shift>}{PageUp}{PageUp}{/Shift}');
      await expect.element(getDay(r, '2025-01-15')).toHaveFocus();
    });
    
    it('clamps the day to the length of the month', async () => {
      const r = render(<CalendarTest defaultValue='2026-01-31' />);
      
      await press(r, '2026-01-31', '{PageDown}');
      
      await expect.element(getDay(r, '2026-02-28')).toHaveFocus();
    });
    
    it('stops at max', async () => {
      const r = render(<CalendarTest defaultValue='2026-01-15' max='2026-02-10' />);
      
      await press(r, '2026-01-15', '{Shift>}{PageDown}{/Shift}');
      
      await expect.element(getDay(r, '2026-02-10')).toHaveFocus();
    });
    
    it('does not change the value', async () => {
      const onChangeValue = vi.fn();
      const r = render(<CalendarTest defaultValue='2026-01-15' onChangeValue={onChangeValue} />);
      
      await press(r, '2026-01-15', '{PageDown}');
      await expect.element(getDay(r, '2026-02-15')).toHaveFocus();
      
      expect(onChangeValue).not.toHaveBeenCalled();
    });
    
    it('moves by months of the calendar system', async () => {
      const calendar = createCalendarSystem('persian');
      const r = render(<CalendarTest calendar={calendar} defaultValue='2025-04-20' />);
      
      getDay(r, '2025-04-20', { calendar }).element().focus();
      await userEvent.keyboard('{PageDown}');
      
      await expect.element(getDay(r, '2025-05-21', { calendar })).toHaveFocus();
    });
  });
  
  describe('navigation keeps the focused day', () => {
    const getMonthCell = (r: RenderResult, month: string) =>
      page.elementLocator(getMonthPicker(r)).getByRole('gridcell', { name: month, exact: true });
    
    it('moves focus to the same day of the next month', async () => {
      const r = render(<CalendarTest defaultValue='2026-01-15' />);
      
      await userEvent.click(getNext(r));
      
      await expect.element(getDay(r, '2026-02-15')).toHaveAttribute('tabindex', '0');
    });
    
    it('clamps the focused day to the length of the next month', async () => {
      const r = render(<CalendarTest defaultValue='2026-01-31' />);
      
      await userEvent.click(getNext(r));
      
      await expect.element(getDay(r, '2026-02-28')).toHaveAttribute('tabindex', '0');
    });
    
    it('skips a disabled day when moving focus to another month', async () => {
      const r = render(<CalendarTest defaultValue='2026-01-15' disabledDates={['2026-02-15']} />);
      
      await userEvent.click(getNext(r));
      
      await expect.element(getDay(r, '2026-02-16')).toHaveAttribute('tabindex', '0');
    });
    
    it('moves focus to the nearest day available by a disabledDates predicate', async () => {
      const r = render(<CalendarTest defaultValue='2026-01-15' disabledDates={(date) => date === '2026-02-15' || date === '2026-02-16'} />);
      
      await userEvent.click(getNext(r));
      
      await expect.element(getDay(r, '2026-02-14')).toHaveAttribute('tabindex', '0');
    });
    
    it('steps back from a disabled last day after clamping to the month length', async () => {
      const r = render(<CalendarTest defaultValue='2026-01-31' disabledDates={['2026-02-28']} />);
      
      await userEvent.click(getNext(r));
      
      await expect.element(getDay(r, '2026-02-27')).toHaveAttribute('tabindex', '0');
    });
    
    it('clamps focus to max when the same day is past it', async () => {
      const r = render(<CalendarTest defaultValue='2026-01-15' max='2026-02-10' />);
      
      await userEvent.click(getNext(r));
      
      await expect.element(getDay(r, '2026-02-10')).toHaveAttribute('tabindex', '0');
    });
    
    it('moves focus back to the same day of the previous month', async () => {
      const r = render(<CalendarTest defaultValue='2026-03-15' />);
      
      await userEvent.click(getPrev(r));
      
      await expect.element(getDay(r, '2026-02-15')).toHaveAttribute('tabindex', '0');
    });
    
    it('moves focus across the year boundary', async () => {
      const r = render(<CalendarTest defaultValue='2026-12-15' />);
      
      await userEvent.click(getNext(r));
      
      await expect.element(getDay(r, '2027-01-15')).toHaveAttribute('tabindex', '0');
    });
    
    it('moves focus to the same day of a month picked in the month picker', async () => {
      const r = render(<CalendarTest defaultValue='2026-01-15' />);
      
      await userEvent.click(getMonthBtn(r));
      await expect.element(getMonthCell(r, 'January')).toHaveFocus();
      await userEvent.keyboard('{ArrowRight}{ArrowRight}{Enter}');
      
      await expect.element(getDay(r, '2026-03-15')).toHaveAttribute('tabindex', '0');
    });
    
    it('moves focus to the same day of a year picked in the year picker', async () => {
      const r = render(<CalendarTest defaultValue='2026-01-15' />);
      
      await userEvent.click(getYearBtn(r));
      await userEvent.click(getYear(r, 2027));
      
      await expect.element(getDay(r, '2027-01-15')).toHaveAttribute('tabindex', '0');
    });
  });
  
  describe('fast scrolling', () => {
    const getScroller = (r: RenderResult) => getDayPicker(r).querySelector<HTMLElement>('[class*="scrollView"]');
    
    const nextFrame = () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    
    it('reports every month passed while scrolling quickly', async () => {
      const onChangeMonth = vi.fn();
      const r = render(
        <div>
          <CalendarTest compact defaultMonth='2026-01-01' onChangeMonth={onChangeMonth}>
            <CalendarContent data-testid='content'>
              <CalendarDays data-testid='day-picker'>
                <CalendarWeekdays>
                  <CalendarWeekday />
                </CalendarWeekdays>
                <CalendarWeeks>
                  <LabeledDay />
                </CalendarWeeks>
              </CalendarDays>
            </CalendarContent>
          </CalendarTest>
        </div>,
      );
      
      await expect.poll(() => getScroller(r)?.scrollLeft).toBeGreaterThan(0);
      await nextFrame();
      
      for (let step = 0; step < 5; step++) {
        const scroller = getScroller(r)!;
        scroller.scrollBy({ left: scroller.clientWidth, behavior: 'instant' });
        await nextFrame();
      }
      
      await expect.poll(() => onChangeMonth.mock.calls.map(([month]) => month)).toEqual(['2026-02-01', '2026-03-01', '2026-04-01', '2026-05-01', '2026-06-01']);
      await expect.element(getDay(r, '2026-06-15')).toBeInTheDocument();
    });
  });
  
  describe('cell templates', () => {
    const PricedDay = () => {
      const { date, label, fields } = useCalendarDayContext();
      
      return (
        <LabeledDay>
          <span>{label}</span>
          <span data-testid={`price-${date}`}>{fields?.day === 15 ? '30$' : ''}</span>
        </LabeledDay>
      );
    };
    
    const ShortMonth = () => {
      const { label } = useCalendarMonthContext();
      return <CalendarMonth>{label.slice(0, 3)}</CalendarMonth>;
    };
    
    const MarkedYear = () => {
      const { label } = useCalendarYearContext();
      return <CalendarYear>{`* ${label}`}</CalendarYear>;
    };
    
    it('renders a custom day template for every day and keeps selection working', async () => {
      const onChangeValue = vi.fn();
      const r = render(
        <CalendarTest defaultMonth='2026-03-01' onChangeValue={onChangeValue}>
          <CalendarContent data-testid='content'>
            <CalendarDays data-testid='day-picker'>
              <CalendarWeekdays>
                <CalendarWeekday />
              </CalendarWeekdays>
              <CalendarWeeks>
                <PricedDay />
              </CalendarWeeks>
            </CalendarDays>
          </CalendarContent>
        </CalendarTest>
      );
      
      await expect.element(r.getByTestId('price-2026-03-15')).toHaveTextContent('30$');
      await expect.element(getDay(r, '2026-03-15')).toHaveTextContent('1530$');
      
      await userEvent.click(getDay(r, '2026-03-15'));
      
      expect(onChangeValue).toHaveBeenCalledWith('2026-03-15');
    });
    
    it('renders custom month and year templates', async () => {
      const r = render(
        <CalendarTest defaultMonth='2026-03-01' locale='en-US'>
          <CalendarContent data-testid='content'>
            <CalendarMonths data-testid='month-picker'>
              <ShortMonth />
            </CalendarMonths>
            <CalendarYears data-testid='year-picker'>
              <MarkedYear />
            </CalendarYears>
          </CalendarContent>
        </CalendarTest>
      );
      
      await expect.element(page.elementLocator(getMonthPicker(r)).getByRole('gridcell', { name: 'Mar', exact: true })).toHaveAttribute('data-key', '2026-03-01');
      await expect.element(page.elementLocator(getYearPicker(r)).getByRole('gridcell', { name: '* 2026', exact: true })).toHaveAttribute('data-key', '2026-01-01');
    });
  });
  
  describe('views', () => {
    it('shows the weekday names in the order of the locale', async () => {
      const r = render(<CalendarTest locale='de-DE' />);
      
      await expect.poll(() => r.getAllByRole('columnheader')[0].textContent).toBe('Mo');
    });
    
    it('formats the weekday names with the format of CalendarWeekdays', async () => {
      const r = render(
        <CalendarTest locale='en-US'>
          <CalendarContent data-testid='content'>
            <CalendarDays data-testid='day-picker'>
              <CalendarWeekdays format='long'>
                <CalendarWeekday />
              </CalendarWeekdays>
              <CalendarWeeks>
                <LabeledDay />
              </CalendarWeeks>
            </CalendarDays>
          </CalendarContent>
        </CalendarTest>
      );
      const labels = () => Array.from(getDayPicker(r).querySelectorAll('[role="columnheader"]')).map((el) => el.textContent);
      
      await expect.poll(() => labels()).toEqual(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
    });
    
    it('renders chevrons in the previous and next buttons by default', async () => {
      const r = render(
        <Calendar>
          <CalendarPrevButton data-testid='prev' aria-label='Previous' />
          <CalendarNextButton data-testid='next' aria-label='Next' />
        </Calendar>
      );
      
      expect(r.getByTestId('prev').querySelector('svg')).not.toBeNull();
      expect(r.getByTestId('next').querySelector('svg')).not.toBeNull();
    });
    
    it('opens the view given by defaultView', async () => {
      const r = render(<CalendarTest defaultView='month' />);
      
      await expect.element(getMonthPicker(r)).toHaveAttribute('data-visible', 'true');
      await expect.element(getMonthBtn(r)).toHaveAttribute('aria-pressed', 'true');
    });
    
    it('reports view changes', async () => {
      const onChangeView = vi.fn();
      const r = render(<CalendarTest onChangeView={onChangeView} />);
      
      await userEvent.click(getYearBtn(r));
      
      expect(onChangeView).toHaveBeenCalledWith('year');
    });
    
    it('hides the previous and next buttons in the month view', async () => {
      const r = render(<CalendarTest defaultView='month' defaultMonth='2026-03-01' />);
      
      await expect.element(getPrev(r)).toHaveAttribute('data-visible', 'false');
      await expect.element(getNext(r)).toHaveAttribute('data-visible', 'false');
    });
    
    it('pages through years with the previous and next buttons in the year view', async () => {
      const r = render(<CalendarTest defaultView='year' defaultMonth='2026-03-01' style={{ width: 320 }} />);
      
      await expect.element(getNext(r)).toHaveAttribute('data-visible', 'true');
      await expect.poll(() => isPageVisible(getYear(r, 2026))).toBe(true);
      
      await userEvent.click(getNext(r));
      await expect.poll(() => isPageVisible(getYear(r, 2038))).toBe(true);
      
      await userEvent.click(getPrev(r));
      await expect.poll(() => isPageVisible(getYear(r, 2026))).toBe(true);
    });
  });
  
  describe('locale', () => {
    const LocaleTest = (props: ComponentProps<typeof Calendar>) => (
      <Calendar defaultValue='2026-03-15' data-testid='root' {...props}>
        <span data-testid='month'><CalendarMonthLabel /></span>
        <CalendarContent data-testid='content'>
          <CalendarDays data-testid='day-picker'>
            <CalendarWeekdays>
              <CalendarWeekday />
            </CalendarWeekdays>
            <CalendarWeeks>
              <LabeledDay />
            </CalendarWeeks>
          </CalendarDays>
        </CalendarContent>
      </Calendar>
    );
    
    const getColumn = (r: RenderResult, iso: string, locale: string) => {
      const cell = getDay(r, iso, { locale }).element();
      return Array.from(cell.parentElement?.children ?? []).indexOf(cell);
    };
    
    it('formats every part in the locale given on the root and sets lang', async () => {
      const r = render(<LocaleTest locale='de-DE' />);
      
      await expect.element(r.getByTestId('month')).toHaveTextContent('März');
      await expect.element(r.getByTestId('root')).toHaveAttribute('lang', 'de-DE');
    });
    
    it('starts the week on the first day of the locale', async () => {
      const r = render(<LocaleTest locale='en-US' />);
      
      await expect.poll(() => getColumn(r, '2026-03-01', 'en-US')).toBe(0);
      
      r.rerender(<LocaleTest locale='de-DE' />);
      
      await expect.poll(() => getColumn(r, '2026-03-01', 'de-DE')).toBe(6);
    });
    
    it('shows bare day numbers in locales that add a suffix to a standalone day', async () => {
      const r = render(<LocaleTest locale='ja-JP' />);
      
      await expect.element(getDay(r, '2026-03-15', { locale: 'ja-JP' })).toHaveTextContent(/^15$/);
    });
    
  });
  
  describe('non-Gregorian calendar', () => {
    const persian = createCalendarSystem('persian');
    const hebrew = createCalendarSystem('hebrew');
    
    const getMonthCells = (r: RenderResult) => getMonthPicker(r).querySelectorAll('[role="gridcell"]');
    
    it('shows the Persian month containing the value', async () => {
      const r = render(<CalendarTest calendar={persian} defaultValue='2025-03-21' />);
      
      await expect.element(getDay(r, '2025-03-21', { calendar: persian })).toHaveAttribute('aria-selected', 'true');
      await expect.element(getDay(r, '2025-03-21', { calendar: persian })).toHaveTextContent('1');
      await expect.element(getDay(r, '2025-04-20', { calendar: persian })).toHaveTextContent('31');
      await expect.element(getDay(r, '2025-04-20', { calendar: persian })).not.toHaveAttribute('aria-disabled', 'true');
    });
    
    it('moves to the next Persian month and reports its first day', async () => {
      const onChangeMonth = vi.fn();
      const r = render(<CalendarTest calendar={persian} defaultValue='2025-03-21' onChangeMonth={onChangeMonth} />);
      
      await userEvent.click(getNext(r));
      
      await expect.element(getDay(r, '2025-04-21', { calendar: persian })).toHaveAttribute('tabindex', '0');
      await expect.poll(() => onChangeMonth.mock.lastCall).toEqual(['2025-04-21']);
    });
    
    it('labels the month and year in the calendar system', async () => {
      const r = render(
        <Calendar calendar={persian} locale='en-US' defaultValue='2025-03-21'>
          <span data-testid='month'><CalendarMonthLabel /></span>
          <span data-testid='year'><CalendarYearLabel /></span>
        </Calendar>
      );
      
      await expect.element(r.getByTestId('month')).toHaveTextContent('Farvardin');
      await expect.element(r.getByTestId('year')).toHaveTextContent('1404');
    });
    
    it('lists the 13 months of a Hebrew leap year in the month picker', async () => {
      const r = render(<CalendarTest calendar={hebrew} defaultValue='2024-03-15' />);
      
      await userEvent.click(getMonthBtn(r));
      
      expect(getMonthCells(r)).toHaveLength(13);
    });
  });
  
  describe('rapid arrow clicks', () => {
    it('moves one month per click past the rendered window', async () => {
      const onChangeMonth = vi.fn();
      const r = render(<CalendarTest defaultValue='2026-01-15' onChangeMonth={onChangeMonth} />);
      
      for (let click = 0; click < 8; click++) {
        await userEvent.click(getNext(r));
      }
      
      await expect.poll(() => onChangeMonth.mock.lastCall, { timeout: 5000 }).toEqual(['2026-09-01']);
      await expect.element(getDay(r, '2026-09-15')).toHaveAttribute('tabindex', '0');
      
      for (let click = 0; click < 8; click++) {
        await userEvent.click(getPrev(r));
      }
      
      await expect.poll(() => onChangeMonth.mock.lastCall, { timeout: 5000 }).toEqual(['2026-01-01']);
      await expect.element(getDay(r, '2026-01-15')).toHaveAttribute('tabindex', '0');
    });
  });
  
  describe('year picker scrolling', () => {
    const nextFrame = () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    
    const getYearScroller = (r: RenderResult) => getYearPicker(r).querySelector<HTMLElement>('[class*="scrollView"]')!;
    
    it('keeps scrolling past the window without jumping back to the visible year', async () => {
      const r = render(
        <CalendarTest defaultMonth='2026-01-01' defaultView='year' style={{ width: 320 }}>
          <CalendarContent>
            <CalendarDays>
              <CalendarWeekdays>
                <CalendarWeekday />
              </CalendarWeekdays>
              <CalendarWeeks>
                <LabeledDay />
              </CalendarWeeks>
            </CalendarDays>
            <CalendarYears data-testid='year-picker'>
              <CalendarYear />
            </CalendarYears>
          </CalendarContent>
        </CalendarTest>
      );
      
      const scroller = getYearScroller(r);
      await expect.poll(() => scroller.scrollLeft).toBeGreaterThan(0);
      
      for (const year of [2038, 2050, 2062]) {
        scroller.scrollBy({ left: scroller.clientWidth, behavior: 'instant' });
        await expect.poll(() => isPageVisible(getYear(r, year))).toBe(true);
        await nextFrame();
      }
      
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      expect(isPageVisible(getYear(r, 2062))).toBe(true);
    });
  });
  
  describe('year picker keyboard', () => {
    it('starts on the visible year and moves with arrow keys', async () => {
      const r = render(<CalendarTest defaultMonth='2026-01-01' />);
      
      await userEvent.click(getYearBtn(r));
      await expect.element(getYear(r, 2026)).toHaveAttribute('tabindex', '0');
      await expect.element(getYear(r, 2026)).toHaveFocus();
      
      await userEvent.keyboard('{ArrowRight}');
      
      await expect.element(getYear(r, 2027)).toHaveAttribute('tabindex', '0');
      await expect.element(getYear(r, 2027)).toHaveFocus();
    });
  });
  
  describe('disabled', () => {
    let r: RenderResult;
    const onChangeValue = vi.fn();
    
    beforeEach(() => {
      onChangeValue.mockClear();
      r = render(<CalendarTest disabled defaultMonth='2026-01-01' onChangeValue={onChangeValue} data-testid='calendar' />);
    });
    
    it('marks the root as aria-disabled', async () => {
      await expect.element(r.getByTestId('calendar')).toHaveAttribute('aria-disabled', 'true');
    });
    
    it('disables navigation and picker buttons', async () => {
      await expect.element(getPrev(r)).toBeDisabled();
      await expect.element(getNext(r)).toBeDisabled();
      await expect.element(getMonthBtn(r)).toBeDisabled();
      await expect.element(getYearBtn(r)).toBeDisabled();
    });
    
    it('disables every day', async () => {
      await expect.element(getDay(r, '2026-01-15')).toHaveAttribute('aria-disabled', 'true');
    });
    
    it('does not select a clicked day', async () => {
      await userEvent.click(getDay(r, '2026-01-15'), { force: true });
      
      expect(onChangeValue).not.toHaveBeenCalled();
    });
  });
  
  describe('Error Handling', () => {
    it('renders with minimal structure (no crash)', async () => {
      const r = render(<CalendarTest>{null}</CalendarTest>);
      await expect.element(r.container).toBeInTheDocument();
    });
    
    it('does not throw if picker buttons are absent in children (custom composition)', async () => {
      const r = render(
        <CalendarTest>
          <CalendarContent data-testid='content'>
            <CalendarDays data-testid='day-picker'>
              <CalendarWeekdays>
                <CalendarWeekday />
              </CalendarWeekdays>
              <CalendarWeeks>
                <LabeledDay />
              </CalendarWeeks>
            </CalendarDays>
            <CalendarMonths data-testid='month-picker'>
              <CalendarMonth />
            </CalendarMonths>
            <CalendarYears data-testid='year-picker'>
              <CalendarYear />
            </CalendarYears>
          </CalendarContent>
        </CalendarTest>,
      );
      
      await expect.element(r.getByTestId('content')).toBeInTheDocument();
    });
    
    it('renders even if header is omitted (custom composition)', async () => {
      const r = render(
        <CalendarTest>
          <CalendarContent data-testid='content'>
            <CalendarDays data-testid='day-picker'>
              <CalendarWeekdays>
                <CalendarWeekday />
              </CalendarWeekdays>
              <CalendarWeeks>
                <LabeledDay />
              </CalendarWeeks>
            </CalendarDays>
          </CalendarContent>
        </CalendarTest>,
      );
      
      await expect.element(r.getByTestId('content')).toBeInTheDocument();
      await expect.element(r.getByTestId('day-picker')).toBeInTheDocument();
    });
  });
  
  describe('Edge Cases', () => {
    it('calls the latest onChangeValue after it changes between renders', async () => {
      const initialOnChange = vi.fn();
      const nextOnChange = vi.fn();

      const r = render(<CalendarTest onChangeValue={initialOnChange} />);
      r.rerender(<CalendarTest onChangeValue={nextOnChange} />);

      const day = r
        .getAllByText('15')
        .find((el) => el.closest('[role="gridcell"]')?.getAttribute('aria-disabled') === 'false');

      await userEvent.click(day!);

      expect(nextOnChange).toHaveBeenCalledTimes(1);
      expect(nextOnChange).toHaveBeenCalledWith(expect.stringMatching(/^\d{4}-\d{2}-15$/));
      expect(initialOnChange).not.toHaveBeenCalled();
    });

    it('supports multiple calendars rendered together: renders two month picker buttons', async () => {
      const r = render(
        <>
          <CalendarTest />
          <CalendarTest />
        </>,
      );
      
      const monthButtons = r.getAllByTestId('month-picker-button');
      expect(monthButtons).toHaveLength(2);
    });
    
    it('supports multiple calendars rendered together: opening first month picker does not affect second', async () => {
      const r = render(
        <>
          <CalendarTest />
          <CalendarTest />
        </>,
      );
      
      const monthButtons = r.getAllByTestId('month-picker-button');
      const monthPickers = r.getAllByTestId('month-picker');
      
      await userEvent.click(monthButtons[0]);
      
      await expect.element(monthPickers[0]).toHaveAttribute('data-visible', 'true');
      await expect.element(monthPickers[1]).toHaveAttribute('data-visible', 'false');
    });
    
    it('supports overriding data-testid on wrappers: content', async () => {
      const r = render(
        <CalendarTest>
          <CalendarContent data-testid='content-x'>
            <CalendarMonths data-testid='month-picker-x'>
              <CalendarMonth />
            </CalendarMonths>
          </CalendarContent>
        </CalendarTest>,
      );
      
      await expect.element(r.getByTestId('content-x')).toBeInTheDocument();
    });
    
    it('supports overriding data-testid on wrappers: month picker', async () => {
      const r = render(
        <CalendarTest>
          <CalendarContent data-testid='content-x'>
            <CalendarMonths data-testid='month-picker-x'>
              <CalendarMonth />
            </CalendarMonths>
          </CalendarContent>
        </CalendarTest>,
      );
      
      await expect.element(r.getByTestId('month-picker-x')).toBeInTheDocument();
    });
  });
  
  describe('Accessibility', () => {
    describe('aria', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<CalendarTest />);
      });
      
      it('month button has aria-pressed=false by default', async () => {
        await expect.element(getMonthBtn(r)).toHaveAttribute('aria-pressed', 'false');
      });
      
      it('year button has aria-pressed=false by default', async () => {
        await expect.element(getYearBtn(r)).toHaveAttribute('aria-pressed', 'false');
      });
      
      it('month button has aria-pressed=true when month picker is active', async () => {
        await userEvent.click(getMonthBtn(r));
        await expect.element(getMonthBtn(r)).toHaveAttribute('aria-pressed', 'true');
      });
      
      it('year button has aria-pressed=true when year picker is active', async () => {
        await userEvent.click(getYearBtn(r));
        await expect.element(getYearBtn(r)).toHaveAttribute('aria-pressed', 'true');
      });
      
      it('switching to year picker sets month aria-pressed=false', async () => {
        await userEvent.click(getMonthBtn(r));
        await userEvent.click(getYearBtn(r));
        await expect.element(getMonthBtn(r)).toHaveAttribute('aria-pressed', 'false');
      });
    });
    
    describe('focus', () => {
      it('month button can receive programmatic focus', async () => {
        const r = render(<CalendarTest />);
        
        const button = getMonthBtn(r)
        
        button.focus();
        await expect.element(button).toHaveFocus();
      });
      
      it('year button can receive programmatic focus', async () => {
        const r = render(<CalendarTest />);
        
        const button = getYearBtn(r)
        
        button.focus();
        await expect.element(button).toHaveFocus();
      });
    });
    
    describe('keyboard', () => {
      it('activates month picker with Enter when month button is focused', async () => {
        const r = render(<CalendarTest />);
        const button = getMonthBtn(r)
        
        button.focus();
        await expect.element(button).toHaveFocus();
        await userEvent.keyboard('{Enter}');
        
        await expect.element(getMonthBtn(r)).toHaveAttribute('aria-pressed', 'true');
        await expect.element(getMonthPicker(r)).toHaveAttribute('data-visible', 'true');
      });
      
      it('activates month picker with Space when month button is focused', async () => {
        const r = render(<CalendarTest />);
        const button = getMonthBtn(r)
        
        button.focus();
        await expect.element(button).toHaveFocus();
        await userEvent.keyboard(' ');
        
        await expect.element(getMonthBtn(r)).toHaveAttribute('aria-pressed', 'true');
        await expect.element(getMonthPicker(r)).toHaveAttribute('data-visible', 'true');
      });
      
      it('activates year picker with Enter when year button is focused', async () => {
        const r = render(<CalendarTest />);
        const button = getYearBtn(r)
        
        button.focus();
        await expect.element(button).toHaveFocus();
        await userEvent.keyboard('{Enter}');
        
        await expect.element(getYearBtn(r)).toHaveAttribute('aria-pressed', 'true');
        await expect.element(getYearPicker(r)).toHaveAttribute('data-visible', 'true');
      });
      
      it('activates year picker with Space when year button is focused', async () => {
        const r = render(<CalendarTest />);
        const button = getYearBtn(r)
        
        button.focus();
        await expect.element(button).toHaveFocus();
        await userEvent.keyboard(' ');
        
        await expect.element(getYearBtn(r)).toHaveAttribute('aria-pressed', 'true');
        await expect.element(getYearPicker(r)).toHaveAttribute('data-visible', 'true');
      });
    });
  });
});