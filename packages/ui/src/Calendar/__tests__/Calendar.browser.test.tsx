import { ComponentProps, Profiler, ReactNode, useState } from 'react';
import { flushSync } from 'react-dom';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, onTestFinished, vi } from 'vitest';
import { page, userEvent, type Locator } from 'vitest/browser';
import { cleanup, render, type RenderResult } from '@testing-library/react';

import { Calendar } from '../Calendar';
import {
  CalendarContent,
  CalendarDays,
  CalendarHeader,
  CalendarHeading,
  CalendarMonths,
  CalendarMonthsGrid,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarViewButton,
  CalendarYears,
  CalendarYearsScroller,
  CalendarYearsScrollerContent,
  CalendarYearsGrid,
  CalendarMonthLabel,
  CalendarYearLabel,
  CalendarDay,
  type CalendarDayProps,
  CalendarMonth,
  CalendarYear,
  CalendarWeekdays, CalendarWeekday,
  CalendarWeeks,
  CalendarDaysScroller,
  CalendarDaysScrollerContent,
} from '../components';
import { DayPickerItem, DayPickerRow, DayPickerRowGroup } from '../../DayPicker';
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
            
            <CalendarHeading>
              <CalendarViewButton view='month' data-testid='month-picker-button'>
                <MonthLabel />
              </CalendarViewButton>
              <CalendarViewButton view='year' data-testid='year-picker-button'>
                <YearLabel />
              </CalendarViewButton>
            </CalendarHeading>
            
            <CalendarNextButton data-testid='next-button'>Next</CalendarNextButton>
          </CalendarHeader>
          
          <CalendarContent data-testid='content'>
            <CalendarDays data-testid='day-picker'>
              <CalendarWeekdays>
                <CalendarWeekday />
              </CalendarWeekdays>
              <CalendarDaysScroller>
                <CalendarDaysScrollerContent>
                  <CalendarWeeks>
                    <LabeledDay />
                  </CalendarWeeks>
                </CalendarDaysScrollerContent>
              </CalendarDaysScroller>
            </CalendarDays>
            <CalendarMonths data-testid='month-picker'>
              <CalendarMonthsGrid>
                <CalendarMonth />
              </CalendarMonthsGrid>
            </CalendarMonths>
            <CalendarYears data-testid='year-picker'>
              <CalendarYearsScroller>
                <CalendarYearsScrollerContent>
                  <CalendarYearsGrid>
                    <CalendarYear />
                  </CalendarYearsGrid>
                </CalendarYearsScrollerContent>
              </CalendarYearsScroller>
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
      
      it('does not mount the month picker by default', async () => {
        await expect.poll(() => r.queryByTestId('month-picker')).toBeNull();
      });
      
      it('does not mount the year picker by default', async () => {
        await expect.poll(() => r.queryByTestId('year-picker')).toBeNull();
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
      
      it('sets inert on day picker', async () => {
        await expect.element(getDayPicker(r)).toHaveAttribute('inert');
      });
      
      it('mounts the month picker', async () => {
        await expect.element(getMonthPicker(r)).toBeInTheDocument();
      });
      
      it('does not mount the year picker', async () => {
        await expect.poll(() => r.queryByTestId('year-picker')).toBeNull();
      });
    });
    
    describe('when closing month picker (click twice)', () => {
      let r: RenderResult;
      
      beforeEach(async () => {
        r = render(<CalendarTest />);
        await userEvent.click(getMonthBtn(r));
        await userEvent.click(getMonthBtn(r));
      });
      
      it('unmounts the month picker', async () => {
        await expect.poll(() => r.queryByTestId('month-picker')).toBeNull();
      });
      
    });
    
    it('keeps the closing month and year views until their exit transition ends', async () => {
      document.documentElement.dataset.motion = '';
      onTestFinished(() => {
        delete document.documentElement.dataset.motion;
      });
      const r = render(<CalendarTest />);

      for (const [button, picker] of [[getMonthBtn, 'month-picker'], [getYearBtn, 'year-picker']] as const) {
        await userEvent.click(button(r));
        await expect.element(page.getByTestId(picker)).toHaveAttribute('data-visible', 'true');
        flushSync(() => button(r).click());

        expect(r.getByTestId(picker)).toHaveAttribute('data-visible', 'false');
        expect(r.getByTestId(picker)).toHaveAttribute('inert');
        await expect.poll(() => r.queryByTestId(picker)).toBeNull();
      }
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
      
      it('sets inert on day picker', async () => {
        await expect.element(getDayPicker(r)).toHaveAttribute('inert');
      });
      
      it('does not mount the month picker', async () => {
        await expect.poll(() => r.queryByTestId('month-picker')).toBeNull();
      });
      
      it('mounts the year picker', async () => {
        await expect.element(getYearPicker(r)).toBeInTheDocument();
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
      
      it('mounts the year picker', async () => {
        await expect.element(getYearPicker(r)).toBeInTheDocument();
      });
      
      it('unmounts the month picker', async () => {
        await expect.poll(() => r.queryByTestId('month-picker')).toBeNull();
      });
      
      it('sets inert on day picker', async () => {
        await expect.element(getDayPicker(r)).toHaveAttribute('inert');
      });
    });
    
    describe('Value API', () => {
      it('selects the controlled YYYY-MM-DD value', async () => {
        const r = render(<CalendarTest value='2026-01-15' defaultFocusedDate='2026-01-01' onChangeValue={vi.fn()} />);
      
        await expect.element(getDay(r, '2026-01-15')).toHaveAttribute('aria-selected', 'true');
      });
    
      it('clears the selection when the controlled value becomes empty', async () => {
        const r = render(<CalendarTest value='2026-01-15' defaultFocusedDate='2026-01-01' onChangeValue={vi.fn()} />);
        await expect.element(getDay(r, '2026-01-15')).toHaveAttribute('aria-selected', 'true');
      
        r.rerender(<CalendarTest value='' defaultFocusedDate='2026-01-01' onChangeValue={vi.fn()} />);
        await expect.poll(() => getSelectedDays(r).length).toBe(0);
      });
    
      it('keeps an empty controlled value empty when a day is clicked', async () => {
        const onChangeValue = vi.fn();
        const r = render(<CalendarTest value='' defaultFocusedDate='2026-01-01' onChangeValue={onChangeValue} />);
      
        await userEvent.click(getDay(r, '2026-01-15'));
      
        expect(onChangeValue).toHaveBeenCalledWith('2026-01-15');
        expect(getSelectedDays(r)).toHaveLength(0);
      });
    
      it('treats a malformed or non-existent value as unselected', async () => {
        const r = render(<CalendarTest value='2026-02-31' defaultFocusedDate='2026-02-01' onChangeValue={vi.fn()} />);
      
        await expect.element(getDay(r, '2026-02-15')).toBeInTheDocument();
        expect(getSelectedDays(r)).toHaveLength(0);
      });
    
      it('selects defaultValue in uncontrolled mode', async () => {
        const r = render(<CalendarTest defaultValue='2026-01-15' defaultFocusedDate='2026-01-01' />);
      
        await expect.element(getDay(r, '2026-01-15')).toHaveAttribute('aria-selected', 'true');
      });
    
      it('reports a picked day as a YYYY-MM-DD string', async () => {
        const onChangeValue = vi.fn();
        const r = render(<CalendarTest defaultFocusedDate='2026-01-01' onChangeValue={onChangeValue} />);
      
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
        const r = render(<CalendarTest selection='range' defaultFocusedDate='2026-01-01' onChangeValue={onChangeValue} />);
      
        await userEvent.click(getDay(r, '2026-01-10'));
        expect(onChangeValue).toHaveBeenLastCalledWith(['2026-01-10', '']);
      
        await userEvent.click(getDay(r, '2026-01-15'));
        expect(onChangeValue).toHaveBeenLastCalledWith(['2026-01-10', '2026-01-15']);
      });
    
      it('reports a controlled range picked backwards in [start, end] order', async () => {
        const Controlled = ({ onChangeValue }: { onChangeValue(value: [string, string]): void }) => {
          const [value, setValue] = useState<[string, string]>(['', '']);
        
          const change = (next: [string, string]) => {
            setValue(next);
            onChangeValue(next);
          };
        
          return <Calendar selection='range' value={value} defaultFocusedDate='2026-01-01' onChangeValue={change}><CalendarDays data-testid='day-picker'><CalendarDaysScroller><CalendarDaysScrollerContent><CalendarWeeks><LabeledDay /></CalendarWeeks></CalendarDaysScrollerContent></CalendarDaysScroller></CalendarDays></Calendar>;
        };
      
        const onChangeValue = vi.fn();
        const r = render(<Controlled onChangeValue={onChangeValue} />);
      
        await userEvent.click(getDayInPicker(r, '2026-01-15'));
        await userEvent.click(getDayInPicker(r, '2026-01-10'));
      
        expect(onChangeValue).toHaveBeenLastCalledWith(['2026-01-10', '2026-01-15']);
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
          <CalendarTest selection='range' value={['2026-01-10', '2026-01-12']} defaultFocusedDate='2026-01-01' onChangeValue={vi.fn()} />,
        );
      
        await expect.element(getDay(r, '2026-01-10')).toHaveAttribute('aria-selected', 'true');
        await expect.element(getDay(r, '2026-01-11')).toHaveAttribute('aria-selected', 'true');
        await expect.element(getDay(r, '2026-01-12')).toHaveAttribute('aria-selected', 'true');
        await expect.element(getDay(r, '2026-01-13')).toHaveAttribute('aria-selected', 'false');
      });
    
      it('reports multiple selection as an array of YYYY-MM-DD strings', async () => {
        const onChangeValue = vi.fn();
        const r = render(<CalendarTest selection='multiple' defaultFocusedDate='2026-01-01' onChangeValue={onChangeValue} />);
      
        await userEvent.click(getDay(r, '2026-01-10'));
        await userEvent.click(getDay(r, '2026-01-12'));
      
        expect(onChangeValue).toHaveBeenLastCalledWith(['2026-01-10', '2026-01-12']);
      });
    
      it('shows the month of a controlled focused day and reports navigation as the next focused day', async () => {
        const onChangeFocusedDate = vi.fn();
        const r = render(<CalendarTest focusedDate='2026-05-31' onChangeFocusedDate={onChangeFocusedDate} />);
      
        await expect.element(getDay(r, '2026-05-31')).toHaveAttribute('tabindex', '0');
      
        await userEvent.click(getNext(r));
        await expect.poll(() => onChangeFocusedDate.mock.lastCall?.[0]).toBe('2026-06-30');
      });
    
      it('disables dates listed in disabledDates', async () => {
        const r = render(<CalendarTest disabledDates={['2026-01-15']} defaultFocusedDate='2026-01-01' />);
      
        await expect.element(getDay(r, '2026-01-15')).toHaveAttribute('aria-disabled', 'true');
        await expect.element(getDay(r, '2026-01-16')).toHaveAttribute('aria-disabled', 'false');
      });
    
      it('passes YYYY-MM-DD strings to a disabledDates predicate', async () => {
        const r = render(<CalendarTest disabledDates={(date) => date.endsWith('-13')} defaultFocusedDate='2026-01-01' />);
      
        await expect.element(getDay(r, '2026-01-13')).toHaveAttribute('aria-disabled', 'true');
        await expect.element(getDay(r, '2026-01-14')).toHaveAttribute('aria-disabled', 'false');
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
                <CalendarDaysScroller>
                  <CalendarDaysScrollerContent>
                    <CalendarWeeks>
                      <LabeledDay />
                    </CalendarWeeks>
                  </CalendarDaysScrollerContent>
                </CalendarDaysScroller>
              </CalendarDays>
            </CalendarContent>
          </CalendarTest>
        );
        const labels = () => Array.from(getDayPicker(r).querySelectorAll('[role="columnheader"]')).map((el) => el.textContent);
      
        await expect.poll(() => labels()).toEqual(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
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
    
      it('pages through years with the previous and next buttons in the year view', async () => {
        const r = render(<CalendarTest defaultView='year' defaultFocusedDate='2026-03-01' style={{ width: 320 }} />);
      
        await expect.element(getNext(r)).toHaveAttribute('data-visible', 'true');
        await expect.poll(() => isPageVisible(getYear(r, 2026))).toBe(true);
      
        await userEvent.click(getNext(r));
        await expect.poll(() => isPageVisible(getYear(r, 2038))).toBe(true);
      
        await userEvent.click(getPrev(r));
        await expect.poll(() => isPageVisible(getYear(r, 2026))).toBe(true);
      });
    });

    describe('disabled', () => {
      let r: RenderResult;
      const onChangeValue = vi.fn();
    
      beforeEach(() => {
        onChangeValue.mockClear();
        r = render(<CalendarTest disabled defaultFocusedDate='2026-01-01' onChangeValue={onChangeValue} data-testid='calendar' />);
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

    describe('locale', () => {
      const LocaleTest = (props: ComponentProps<typeof Calendar>) => (
        <Calendar defaultValue='2026-03-15' data-testid='root' {...props}>
          <span data-testid='month'><CalendarMonthLabel /></span>
          <CalendarContent data-testid='content'>
            <CalendarDays data-testid='day-picker'>
              <CalendarWeekdays>
                <CalendarWeekday />
              </CalendarWeekdays>
              <CalendarDaysScroller>
                <CalendarDaysScrollerContent>
                  <CalendarWeeks>
                    <LabeledDay />
                  </CalendarWeeks>
                </CalendarDaysScrollerContent>
              </CalendarDaysScroller>
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
    
      it('moves to the same day of the next Persian month and reports it', async () => {
        const onChangeFocusedDate = vi.fn();
        const r = render(<CalendarTest calendar={persian} defaultValue='2025-03-21' onChangeFocusedDate={onChangeFocusedDate} />);
      
        await userEvent.click(getNext(r));
      
        await expect.element(getDay(r, '2025-04-21', { calendar: persian })).toHaveAttribute('tabindex', '0');
        await expect.poll(() => onChangeFocusedDate.mock.lastCall).toEqual(['2025-04-21']);
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
          <CalendarTest defaultFocusedDate='2026-03-01' onChangeValue={onChangeValue}>
            <CalendarContent data-testid='content'>
              <CalendarDays data-testid='day-picker'>
                <CalendarWeekdays>
                  <CalendarWeekday />
                </CalendarWeekdays>
                <CalendarDaysScroller>
                  <CalendarDaysScrollerContent>
                    <CalendarWeeks>
                      <PricedDay />
                    </CalendarWeeks>
                  </CalendarDaysScrollerContent>
                </CalendarDaysScroller>
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
          <CalendarTest defaultFocusedDate='2026-03-01' defaultView='month' locale='en-US'>
            <CalendarContent data-testid='content'>
              <CalendarMonths data-testid='month-picker'>
                <CalendarMonthsGrid>
                  <ShortMonth />
                </CalendarMonthsGrid>
              </CalendarMonths>
              <CalendarYears data-testid='year-picker'>
                <CalendarYearsScroller>
                  <CalendarYearsScrollerContent>
                    <CalendarYearsGrid>
                      <MarkedYear />
                    </CalendarYearsGrid>
                  </CalendarYearsScrollerContent>
                </CalendarYearsScroller>
              </CalendarYears>
            </CalendarContent>
          </CalendarTest>
        );
      
        await expect.element(page.elementLocator(getMonthPicker(r)).getByRole('gridcell', { name: 'Mar', exact: true })).toHaveAttribute('data-key', '2026-03-01');

        r.rerender(
          <CalendarTest defaultFocusedDate='2026-03-01' view='year' locale='en-US'>
            <CalendarContent data-testid='content'>
              <CalendarYears data-testid='year-picker'>
                <CalendarYearsScroller>
                  <CalendarYearsScrollerContent>
                    <CalendarYearsGrid>
                      <MarkedYear />
                    </CalendarYearsGrid>
                  </CalendarYearsScrollerContent>
                </CalendarYearsScroller>
              </CalendarYears>
            </CalendarContent>
          </CalendarTest>
        );

        await expect.element(page.elementLocator(getYearPicker(r)).getByRole('gridcell', { name: '* 2026', exact: true })).toHaveAttribute('data-key', '2026-01-01');
      });
    });

    describe('without scrollers', () => {
      const StaticCalendarTest = (props: ComponentProps<typeof Calendar>) => (
        <CalendarTest {...props}>
          <CalendarHeader>
            <CalendarPrevButton data-testid='prev-button'>Prev</CalendarPrevButton>
            <CalendarHeading>
              <CalendarViewButton view='year' data-testid='year-picker-button'>
                <YearLabel />
              </CalendarViewButton>
            </CalendarHeading>
            <CalendarNextButton data-testid='next-button'>Next</CalendarNextButton>
          </CalendarHeader>
          <CalendarContent data-testid='content'>
            <CalendarDays data-testid='day-picker'>
              <CalendarWeeks>
                <LabeledDay />
              </CalendarWeeks>
            </CalendarDays>
            <CalendarYears data-testid='year-picker'>
              <CalendarYearsGrid>
                <CalendarYear />
              </CalendarYearsGrid>
            </CalendarYears>
          </CalendarContent>
        </CalendarTest>
      );

      it('shows the next and previous month with the buttons', async () => {
        const r = render(<StaticCalendarTest defaultFocusedDate='2026-01-15' />);

        await userEvent.click(getNext(r));
        await expect.element(getDay(r, '2026-02-15')).toHaveAttribute('tabindex', '0');
        await expect.poll(() => getDay(r, '2026-01-15').query()).toBeNull();

        await userEvent.click(getPrev(r));
        await userEvent.click(getPrev(r));
        await expect.element(getDay(r, '2025-12-15')).toHaveAttribute('tabindex', '0');
      });

      it('moves the focus to the same day of the next month with PageDown', async () => {
        const r = render(<StaticCalendarTest defaultFocusedDate='2026-01-15' />);

        getDay(r, '2026-01-15').element().focus();
        await userEvent.keyboard('{PageDown}');

        await expect.element(getDay(r, '2026-02-15')).toHaveFocus();
      });

      it('shows the next and previous page of years with the buttons', async () => {
        const r = render(<StaticCalendarTest defaultFocusedDate='2026-01-15' defaultView='year' />);

        await expect.element(getYear(r, 2026)).toHaveAttribute('tabindex', '0');

        await userEvent.click(getNext(r));
        await expect.element(getYear(r, 2038)).toHaveAttribute('tabindex', '0');
        await expect.poll(() => getYear(r, 2026).query()).toBeNull();

        await userEvent.click(getPrev(r));
        await userEvent.click(getPrev(r));
        await expect.element(getYear(r, 2014)).toHaveAttribute('tabindex', '0');
      });

      it('selects a day of a custom grid inside the days', async () => {
        const onChangeValue = vi.fn();
        const r = render(
          <CalendarTest defaultFocusedDate='2026-01-15' onChangeValue={onChangeValue}>
            <CalendarDays data-testid='day-picker' aria-label='January 2026'>
              <DayPickerRowGroup>
                <DayPickerRow row={0}>
                  <DayPickerItem col={0} value='2026-01-15'>15</DayPickerItem>
                  <DayPickerItem col={1} value='2026-01-16'>16</DayPickerItem>
                </DayPickerRow>
              </DayPickerRowGroup>
            </CalendarDays>
          </CalendarTest>
        );

        await userEvent.click(page.elementLocator(getDayPicker(r)).getByRole('gridcell', { name: '16', exact: true }));

        expect(onChangeValue).toHaveBeenCalledWith('2026-01-16');
      });
    });
  });

  describe('Edge Cases', () => {
    it('keeps the month and the view when the onClick of a step or view button prevents the default', async () => {
      const onChangeFocusedDate = vi.fn();
      const prevent = (event: { preventDefault(): void }) => event.preventDefault();
      const r = render(
        <CalendarTest defaultFocusedDate='2026-01-15' onChangeFocusedDate={onChangeFocusedDate}>
          <CalendarHeader>
            <CalendarNextButton data-testid='next-button' onClick={prevent}>Next</CalendarNextButton>
            <CalendarViewButton view='month' data-testid='month-picker-button' onClick={prevent}>Month</CalendarViewButton>
          </CalendarHeader>
          <CalendarContent data-testid='content'>
            <CalendarDays data-testid='day-picker'>
              <CalendarDaysScroller>
                <CalendarDaysScrollerContent>
                  <CalendarWeeks>
                    <LabeledDay />
                  </CalendarWeeks>
                </CalendarDaysScrollerContent>
              </CalendarDaysScroller>
            </CalendarDays>
          </CalendarContent>
        </CalendarTest>,
      );

      await userEvent.click(getNext(r));
      await userEvent.click(getMonthBtn(r));

      await expect.element(getMonthBtn(r)).toHaveAttribute('aria-pressed', 'false');
      expect(onChangeFocusedDate).not.toHaveBeenCalled();
    });

    it('does not scroll the content when the focus returns to the days during the view transition', async () => {
      document.documentElement.dataset.motion = '';
      onTestFinished(() => {
        delete document.documentElement.dataset.motion;
      });
      const r = render(<CalendarTest defaultValue='2026-03-10' />);

      await userEvent.click(getMonthBtn(r));
      await expect.element(getMonthPicker(r)).toHaveAttribute('data-visible', 'true');
      await expect.poll(() => getDayPicker(r).getAnimations().length).toBe(0);

      const offsets: number[] = [];
      let run = true;
      const track = () => {
        offsets.push(getContent(r).scrollTop);
        if (run) requestAnimationFrame(track);
      };
      track();
      await userEvent.click(getMonthBtn(r));
      await expect.poll(() => r.queryByTestId('month-picker')).toBeNull();
      run = false;

      expect(Math.max(...offsets)).toBe(0);
    });

    it('keeps an uncontrolled selection of a read-only calendar and marks the day grid read-only', async () => {
      const onChangeValue = vi.fn();
      const r = render(<CalendarTest readOnly locale='en-US' defaultValue='2026-03-10' onChangeValue={onChangeValue} />);

      await expect.element(r.getByRole('grid')).toHaveAttribute('aria-readonly', 'true');
      await userEvent.click(getDay(r, '2026-03-12'));

      await expect.element(getDay(r, '2026-03-10')).toHaveAttribute('aria-selected', 'true');
      expect(getSelectedDays(r)).toHaveLength(1);
      expect(onChangeValue).not.toHaveBeenCalled();
    });

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

    it('supports multiple calendars rendered together: opening first month picker does not affect second', async () => {
      const r = render(
        <>
          <CalendarTest data-testid='first' />
          <CalendarTest />
        </>,
      );
      
      const monthButtons = r.getAllByTestId('month-picker-button');
      
      await userEvent.click(monthButtons[0]);
      
      await expect.poll(() => r.queryAllByTestId('month-picker')).toHaveLength(1);
      expect(r.getByTestId('first').contains(r.getByTestId('month-picker'))).toBe(true);
      await expect.element(monthButtons[1]).toHaveAttribute('aria-pressed', 'false');
    });

    it('follows quick far jumps of a controlled focused day', async () => {
      const onError = vi.spyOn(console, 'error').mockImplementation(() => {});
      const r = render(<CalendarTest focusedDate='2026-01-15' />);

      for (const date of ['2034-05-15', '2051-01-15', '2030-03-15', '2009-05-15']) {
        r.rerender(<CalendarTest focusedDate={date} />);
      }

      await expect.poll(() => isPageVisible(getDay(r, '2009-05-15'))).toBe(true);
      await expect.element(getDay(r, '2009-05-15')).toHaveAttribute('tabindex', '0');
      expect(onError).not.toHaveBeenCalled();
      onError.mockRestore();
    });

    describe('fast scrolling', () => {
      const getScroller = (r: RenderResult) => getDayPicker(r).querySelector<HTMLElement>('[class*="scrollView"]');
    
      const nextFrame = () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    
      it('reports every month passed while scrolling quickly', async () => {
        const onChangeFocusedDate = vi.fn();
        const r = render(
          <div>
            <CalendarTest compact defaultFocusedDate='2026-01-01' onChangeFocusedDate={onChangeFocusedDate}>
              <CalendarContent data-testid='content'>
                <CalendarDays data-testid='day-picker'>
                  <CalendarWeekdays>
                    <CalendarWeekday />
                  </CalendarWeekdays>
                  <CalendarDaysScroller>
                    <CalendarDaysScrollerContent>
                      <CalendarWeeks>
                        <LabeledDay />
                      </CalendarWeeks>
                    </CalendarDaysScrollerContent>
                  </CalendarDaysScroller>
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
      
        await expect.poll(() => onChangeFocusedDate.mock.calls.map(([month]) => month)).toEqual(['2026-02-01', '2026-03-01', '2026-04-01', '2026-05-01', '2026-06-01']);
        await expect.element(getDay(r, '2026-06-15')).toBeInTheDocument();
      });
    });

    describe('rapid arrow clicks', () => {
      it('moves one month per click past the rendered window', async () => {
        const onChangeFocusedDate = vi.fn();
        const r = render(<CalendarTest defaultValue='2026-01-15' onChangeFocusedDate={onChangeFocusedDate} />);
      
        for (let click = 0; click < 5; click++) {
          await userEvent.click(getNext(r));
        }
      
        await expect.poll(() => onChangeFocusedDate.mock.lastCall, { timeout: 5000 }).toEqual(['2026-06-15']);
        await expect.element(getDay(r, '2026-06-15')).toHaveAttribute('tabindex', '0');
      
        for (let click = 0; click < 5; click++) {
          await userEvent.click(getPrev(r));
        }
      
        await expect.poll(() => onChangeFocusedDate.mock.lastCall, { timeout: 5000 }).toEqual(['2026-01-15']);
        await expect.element(getDay(r, '2026-01-15')).toHaveAttribute('tabindex', '0');
      });
    });

    describe('year picker scrolling', () => {
      const nextFrame = () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    
      const getYearScroller = (r: RenderResult) => getYearPicker(r).querySelector<HTMLElement>('[class*="scrollView"]')!;
    
      it('keeps scrolling past the window without jumping back to the visible year', async () => {
        const r = render(
          <CalendarTest defaultFocusedDate='2026-01-01' defaultView='year' style={{ width: 320 }}>
            <CalendarContent>
              <CalendarDays>
                <CalendarWeekdays>
                  <CalendarWeekday />
                </CalendarWeekdays>
                <CalendarDaysScroller>
                  <CalendarDaysScrollerContent>
                    <CalendarWeeks>
                      <LabeledDay />
                    </CalendarWeeks>
                  </CalendarDaysScrollerContent>
                </CalendarDaysScroller>
              </CalendarDays>
              <CalendarYears data-testid='year-picker'>
                <CalendarYearsScroller>
                  <CalendarYearsScrollerContent>
                    <CalendarYearsGrid>
                      <CalendarYear />
                    </CalendarYearsGrid>
                  </CalendarYearsScrollerContent>
                </CalendarYearsScroller>
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
  });
  
  describe('Accessibility', () => {

    describe('initial month and keyboard focus', () => {
      afterEach(() => {
        vi.useRealTimers();
      });
    
      it('focuses today when nothing is selected', async () => {
        vi.setSystemTime(new Date(2026, 2, 20));
        const r = render(<CalendarTest />);
      
        await expect.element(getDay(r, '2026-03-20')).toHaveAttribute('tabindex', '0');
      });
    
      it('starts on min when today is before min', async () => {
        vi.setSystemTime(new Date(2026, 2, 20));
        const r = render(<CalendarTest autoFocus min='2026-05-10' />);

        await expect.element(getDay(r, '2026-05-10')).toHaveFocus();
      });

    });

    describe('navigation keeps the focused day', () => {
      const getMonthCell = (r: RenderResult, month: string) =>
        page.elementLocator(getMonthPicker(r)).getByRole('gridcell', { name: month, exact: true });
    
      it('moves focus to the same day of a month picked in the month picker', async () => {
        const r = render(<CalendarTest defaultValue='2026-01-15' />);
      
        await userEvent.click(getMonthBtn(r));
        await expect.element(getMonthCell(r, 'January')).toHaveFocus();
        await userEvent.keyboard('{ArrowRight}{ArrowRight}{Enter}');
      
        await expect.element(getDay(r, '2026-03-15')).toHaveAttribute('tabindex', '0');
        await expect.element(getDay(r, '2026-03-15')).toHaveFocus();
      });

    });

    describe('year picker keyboard', () => {
      it('starts on the visible year and moves with arrow keys', async () => {
        const r = render(<CalendarTest defaultFocusedDate='2026-01-01' />);
      
        await userEvent.click(getYearBtn(r));
        await expect.element(getYear(r, 2026)).toHaveAttribute('tabindex', '0');
        await expect.element(getYear(r, 2026)).toHaveFocus();
      
        await userEvent.keyboard('{ArrowRight}');
      
        await expect.element(getYear(r, 2027)).toHaveAttribute('tabindex', '0');
        await expect.element(getYear(r, 2027)).toHaveFocus();
      });
    });

    describe('APG', () => {
      const getTabStops = (grid: HTMLElement) => Array.from(grid.querySelectorAll('[role="gridcell"][tabindex="0"]'));

      const press = async (r: RenderResult, from: string, keys: string) => {
        getDay(r, from).element().focus();
        await userEvent.keyboard(keys);
      };

      const expectFocusedTabStop = async (r: RenderResult, iso: string) => {
        await expect.element(getDay(r, iso)).toHaveFocus();
        await expect.element(getDay(r, iso)).toHaveAttribute('tabindex', '0');
        await expect.poll(() => getTabStops(getDayPicker(r))).toHaveLength(1);
      };

      const getMonthCell = (r: RenderResult, month: string) =>
        page.elementLocator(getMonthPicker(r)).getByRole('gridcell', { name: month, exact: true });

      afterEach(() => {
        vi.useRealTimers();
      });

      describe('grid structure', () => {
        it('names the day grid by aria-labelledby and follows the visible month', async () => {
          const r = render(
            <Calendar defaultValue='2026-03-15' locale='en-US'>
              <h2 id='calendar-heading'><CalendarMonthLabel /> <CalendarYearLabel /></h2>
              <CalendarContent data-testid='content'>
                <CalendarDays data-testid='day-picker' aria-labelledby='calendar-heading'>
                  <CalendarWeekdays>
                    <CalendarWeekday />
                  </CalendarWeekdays>
                  <CalendarDaysScroller>
                    <CalendarDaysScrollerContent>
                      <CalendarWeeks>
                        <LabeledDay />
                      </CalendarWeeks>
                    </CalendarDaysScrollerContent>
                  </CalendarDaysScroller>
                </CalendarDays>
              </CalendarContent>
            </Calendar>
          );

          await expect.element(page.getByRole('grid', { name: 'March 2026' })).toBeInTheDocument();

          await press(r, '2026-03-15', '{PageDown}');

          await expect.element(page.getByRole('grid', { name: 'April 2026' })).toBeInTheDocument();
        });

        it('names the month grid by the aria-label the user passes', async () => {
          render(
            <CalendarTest defaultValue='2026-03-15' defaultView='month'>
              <CalendarContent>
                <CalendarMonths aria-label='Months of 2026'>
                  <CalendarMonthsGrid>
                    <CalendarMonth />
                  </CalendarMonthsGrid>
                </CalendarMonths>
              </CalendarContent>
            </CalendarTest>
          );

          await expect.element(page.getByRole('grid', { name: 'Months of 2026' })).toBeInTheDocument();
        });

        it('names the year grid by the aria-label the user passes', async () => {
          render(
            <CalendarTest defaultValue='2026-03-15' defaultView='year'>
              <CalendarContent>
                <CalendarYears aria-label='Years'>
                  <CalendarYearsScroller>
                    <CalendarYearsScrollerContent>
                      <CalendarYearsGrid>
                        <CalendarYear />
                      </CalendarYearsGrid>
                    </CalendarYearsScrollerContent>
                  </CalendarYearsScroller>
                </CalendarYears>
              </CalendarContent>
            </CalendarTest>
          );

          await expect.element(page.getByRole('grid', { name: 'Years' })).toBeInTheDocument();
        });

        it('exposes the previous and next controls as buttons named by the user', async () => {
          render(
            <Calendar defaultValue='2026-03-15'>
              <CalendarHeader>
                <CalendarPrevButton aria-label='Previous month' />
                <CalendarNextButton aria-label='Next month' />
              </CalendarHeader>
            </Calendar>
          );

          await expect.element(page.getByRole('button', { name: 'Previous month' })).toBeInTheDocument();
          await expect.element(page.getByRole('button', { name: 'Next month' })).toBeInTheDocument();
        });
      });

      describe('tab stop', () => {
        it('keeps a single tab stop across the rendered months, on the selected day', async () => {
          const r = render(<CalendarTest defaultValue='2026-03-15' />);

          await expect.poll(() => getTabStops(getDayPicker(r))).toHaveLength(1);
          expect(getTabStops(getDayPicker(r))[0]).toBe(getDay(r, '2026-03-15').element());
        });

        it('Tab from the header lands on the selected day', async () => {
          const r = render(<CalendarTest defaultValue='2026-03-15' />);

          getNext(r).focus();
          await userEvent.tab();

          await expect.element(getDay(r, '2026-03-15')).toHaveFocus();
        });

        it('leaves the focused day as the only tab stop after PageDown and returns to it with Tab', async () => {
          const r = render(<CalendarTest defaultValue='2026-03-15' />);

          await press(r, '2026-03-15', '{PageDown}');
          await expectFocusedTabStop(r, '2026-04-15');

          getNext(r).focus();
          await userEvent.tab();
          await expect.element(getDay(r, '2026-04-15')).toHaveFocus();
        });
      });

      describe('keyboard', () => {
        it('ArrowRight and ArrowLeft move focus by one day and carry the tab stop', async () => {
          const r = render(<CalendarTest defaultValue='2026-03-15' />);

          await press(r, '2026-03-15', '{ArrowRight}');
          await expectFocusedTabStop(r, '2026-03-16');

          await userEvent.keyboard('{ArrowLeft}{ArrowLeft}');
          await expectFocusedTabStop(r, '2026-03-14');
        });

        it('ArrowDown from the last week moves to the same weekday of the next month', async () => {
          const onChangeFocusedDate = vi.fn();
          const r = render(<CalendarTest defaultValue='2026-03-29' onChangeFocusedDate={onChangeFocusedDate} />);

          await press(r, '2026-03-29', '{ArrowDown}');

          await expectFocusedTabStop(r, '2026-04-05');
          await expect.poll(() => onChangeFocusedDate).toHaveBeenLastCalledWith('2026-04-05');
        });

        it('Enter selects the focused day', async () => {
          const onChangeValue = vi.fn();
          const r = render(<CalendarTest defaultValue='2026-03-15' onChangeValue={onChangeValue} />);

          await press(r, '2026-03-15', '{ArrowRight}{Enter}');

          expect(onChangeValue).toHaveBeenLastCalledWith('2026-03-16');
          await expect.element(getDay(r, '2026-03-16')).toHaveAttribute('aria-selected', 'true');
          await expect.element(getDay(r, '2026-03-15')).toHaveAttribute('aria-selected', 'false');
        });

      });

      describe('month and year views', () => {
        it('Escape in the month view returns to the days and focuses the active day', async () => {
          const r = render(<CalendarTest defaultValue='2026-03-15' />);

          await userEvent.click(getMonthBtn(r));
          await expect.element(getMonthCell(r, 'March')).toHaveFocus();

          await userEvent.keyboard('{Escape}');

          await expectFocusedTabStop(r, '2026-03-15');
        });

        it('arrows in the month view move focus and carry the tab stop', async () => {
          const r = render(<CalendarTest defaultValue='2026-03-15' />);

          await userEvent.click(getMonthBtn(r));
          await expect.element(getMonthCell(r, 'March')).toHaveFocus();

          await userEvent.keyboard('{ArrowDown}');

          await expect.element(getMonthCell(r, 'June')).toHaveFocus();
          await expect.element(getMonthCell(r, 'June')).toHaveAttribute('tabindex', '0');
          await expect.poll(() => getTabStops(getMonthPicker(r))).toHaveLength(1);
        });

        it.each([
          ['PageDown', '{PageDown}'],
          ['PageUp', '{PageUp}'],
          ['PageDown, Ctrl+Home', '{PageDown}{Control>}{Home}{/Control}'],
          ['Ctrl+End', '{Control>}{End}{/Control}'],
        ])('%s in the year view leaves the focused year as the only tab stop', async (_, keys) => {
          const r = render(<CalendarTest defaultFocusedDate='2026-03-01' style={{ width: 320 }} />);

          await userEvent.click(getYearBtn(r));
          await expect.element(getYear(r, 2026)).toHaveFocus();

          await userEvent.keyboard(keys);

          await expect.poll(() => document.activeElement).not.toBe(getYear(r, 2026).element());
          expect(getYearPicker(r).contains(document.activeElement)).toBe(true);
          await expect.poll(() => document.activeElement?.getAttribute('tabindex')).toBe('0');
          expect(getTabStops(getYearPicker(r))).toHaveLength(1);
        });
      });
    });
  });

  describe('Accessibility', () => {
    describe('heading and today', () => {
      const HeadingTest = (props: ComponentProps<typeof Calendar>) => (
        <Calendar locale='en-US' {...props}>
          <CalendarHeader>
            <CalendarPrevButton data-testid='prev-button'>Prev</CalendarPrevButton>
            <CalendarHeading data-testid='heading'>
              <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
              <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
            </CalendarHeading>
            <CalendarNextButton data-testid='next-button'>Next</CalendarNextButton>
          </CalendarHeader>
          <CalendarContent data-testid='content'>
            <CalendarDays data-testid='day-picker'>
              <CalendarDaysScroller>
                <CalendarDaysScrollerContent>
                  <CalendarWeeks>
                    <LabeledDay />
                  </CalendarWeeks>
                </CalendarDaysScrollerContent>
              </CalendarDaysScroller>
            </CalendarDays>
          </CalendarContent>
        </Calendar>
      );

      afterEach(() => {
        vi.useRealTimers();
      });

      it('names the day grid by the polite heading of the shown month', async () => {
        const r = render(<HeadingTest defaultValue='2026-03-15' />);

        await expect.element(r.getByTestId('heading')).toHaveAttribute('aria-live', 'polite');
        await expect.element(page.getByRole('grid', { name: 'March 2026' })).toBeInTheDocument();

        await userEvent.click(getNext(r));

        await expect.element(page.getByRole('grid', { name: 'April 2026' })).toBeInTheDocument();
      });

      it('renders the heading with the chosen tag and keeps naming the grid', async () => {
        render(
          <Calendar locale='en-US' defaultValue='2026-03-15'>
            <CalendarHeading as='h3' />
            <CalendarContent>
              <CalendarDays>
                <CalendarDaysScroller>
                  <CalendarDaysScrollerContent>
                    <CalendarWeeks>
                      <LabeledDay />
                    </CalendarWeeks>
                  </CalendarDaysScrollerContent>
                </CalendarDaysScroller>
              </CalendarDays>
            </CalendarContent>
          </Calendar>
        );

        await expect.element(page.getByRole('heading', { level: 3, name: 'March 2026' })).toBeInTheDocument();
        await expect.element(page.getByRole('grid', { name: 'March 2026' })).toBeInTheDocument();
      });

      it('marks only today with aria-current="date"', async () => {
        const r = render(<HeadingTest today='2026-03-20' defaultValue='2026-03-15' />);

        await expect.element(getDay(r, '2026-03-20')).toHaveAttribute('aria-current', 'date');
        expect(getDayPicker(r).querySelectorAll('[aria-current]')).toHaveLength(1);
      });

      it('marks today even when it is past max, and puts the tab stop on the nearest available day', async () => {
        const r = render(<HeadingTest today='2026-03-20' max='2026-03-10' />);

        await expect.element(getDay(r, '2026-03-10')).toHaveAttribute('tabindex', '0');
        expect(getDay(r, '2026-03-10')).not.toHaveAttribute('aria-current');
        expect(getDay(r, '2026-03-20')).toHaveAttribute('aria-current', 'date');
      });

      it('moves today to the next day when the date of the device changes', async () => {
        vi.useFakeTimers({ toFake: ['setInterval', 'clearInterval', 'Date'] });
        vi.setSystemTime(new Date(2026, 2, 20, 23, 59, 30));
        const r = render(<HeadingTest defaultValue='2026-03-15' />);
        await expect.element(getDay(r, '2026-03-20')).toHaveAttribute('aria-current', 'date');

        vi.advanceTimersByTime(60_000);

        await expect.element(getDay(r, '2026-03-21')).toHaveAttribute('aria-current', 'date');
        expect(getDay(r, '2026-03-20')).not.toHaveAttribute('aria-current');
      });

      it('updates today at once when the page becomes visible again', async () => {
        vi.useFakeTimers({ toFake: ['setInterval', 'clearInterval', 'Date'] });
        vi.setSystemTime(new Date(2026, 2, 20, 12));
        const r = render(<HeadingTest defaultValue='2026-03-15' />);
        await expect.element(getDay(r, '2026-03-20')).toHaveAttribute('aria-current', 'date');

        vi.setSystemTime(new Date(2026, 2, 22, 9));
        document.dispatchEvent(new Event('visibilitychange'));

        await expect.element(getDay(r, '2026-03-22')).toHaveAttribute('aria-current', 'date');
      });

      it('keeps the focus on the next button and moves the tab stop to the same day of the next month', async () => {
        const r = render(<HeadingTest defaultValue='2026-03-15' />);

        getNext(r).focus();
        await userEvent.keyboard('{Enter}');

        await expect.element(getDay(r, '2026-04-15')).toHaveAttribute('tabindex', '0');
        expect(document.activeElement).toBe(getNext(r));
      });

      it('renders the same markup on the server and the client when the device date differs', async () => {
        const onRecoverableError = vi.fn();
        const tree = <HeadingTest />;

        vi.setSystemTime(new Date(2026, 2, 20));
        const container = document.createElement('div');
        container.innerHTML = renderToString(tree);
        document.body.appendChild(container);

        vi.setSystemTime(new Date(2027, 6, 5));
        const root = hydrateRoot(container, tree, { onRecoverableError });

        await expect.poll(() => container.querySelector('[aria-current="date"]')?.getAttribute('data-key')).toBe('2027-07-05');
        expect(onRecoverableError).not.toHaveBeenCalled();

        root.unmount();
        container.remove();
      });
    });
  });

  describe('Performance', () => {
    const renders = new Map<string, number>();
    let commits = 0;

    const CountedDay = () => {
      const { date } = useCalendarDayContext();

      return (
        <Profiler id={`day:${date}`} onRender={(id) => renders.set(id, (renders.get(id) ?? 0) + 1)}>
          <LabeledDay />
        </Profiler>
      );
    };

    const CountedMonth = () => (
      <Profiler id='month' onRender={(id) => renders.set(id, (renders.get(id) ?? 0) + 1)}>
        <CalendarMonth />
      </Profiler>
    );

    const CountedYear = () => (
      <Profiler id='year' onRender={(id) => renders.set(id, (renders.get(id) ?? 0) + 1)}>
        <CalendarYear />
      </Profiler>
    );

    const tree = (
      <>
        <CalendarHeader>
          <CalendarPrevButton data-testid='prev-button'>Prev</CalendarPrevButton>
          <CalendarNextButton data-testid='next-button'>Next</CalendarNextButton>
        </CalendarHeader>
        <CalendarContent data-testid='content'>
          <CalendarDays data-testid='day-picker'>
            <CalendarDaysScroller>
              <CalendarDaysScrollerContent>
                <CalendarWeeks>
                  <CountedDay />
                </CalendarWeeks>
              </CalendarDaysScrollerContent>
            </CalendarDaysScroller>
          </CalendarDays>
          <CalendarMonths>
            <CalendarMonthsGrid>
              <CountedMonth />
            </CalendarMonthsGrid>
          </CalendarMonths>
          <CalendarYears>
            <CalendarYearsScroller>
              <CalendarYearsScrollerContent>
                <CalendarYearsGrid>
                  <CountedYear />
                </CalendarYearsGrid>
              </CalendarYearsScrollerContent>
            </CalendarYearsScroller>
          </CalendarYears>
        </CalendarContent>
      </>
    );

    const PerfCalendar = (props: ComponentProps<typeof Calendar> & { children?: ReactNode }) => (
      <Profiler id='root' onRender={() => commits++}>
        <Calendar locale='en-US' {...props}>{tree}</Calendar>
      </Profiler>
    );

    const settle = () => new Promise((resolve) => setTimeout(resolve, 600));

    const reset = () => {
      renders.clear();
      commits = 0;
    };

    const renderedDays = () => [...renders.keys()].filter((id) => id.startsWith('day:')).sort();

    it('re-renders only the two day cells and commits once on ArrowRight', async () => {
      const r = render(<PerfCalendar defaultValue='2026-03-15' />);
      getDay(r, '2026-03-15').element().focus();
      await settle();
      reset();

      await userEvent.keyboard('{ArrowRight}');
      await expect.element(getDay(r, '2026-03-16')).toHaveFocus();
      await settle();

      expect(renderedDays()).toEqual(['day:2026-03-15', 'day:2026-03-16']);
      expect(commits).toBe(1);
    });

    it('commits once when the next button shows the next month', async () => {
      const r = render(<PerfCalendar defaultValue='2026-03-15' />);
      await settle();
      reset();

      flushSync(() => getNext(r).click());
      const committed = commits;
      await expect.element(getDay(r, '2026-04-15')).toHaveAttribute('tabindex', '0');

      expect(committed).toBe(1);
    });

    it('re-renders only the two day cells whose selection changes on a click', async () => {
      const r = render(<PerfCalendar defaultValue='2026-03-15' />);
      getDay(r, '2026-03-15').element().focus();
      await settle();
      await userEvent.keyboard('{ArrowRight}');
      await settle();
      reset();

      await userEvent.keyboard('{Enter}');
      await expect.element(getDay(r, '2026-03-16')).toHaveAttribute('aria-selected', 'true');
      await settle();

      expect(renderedDays()).toEqual(['day:2026-03-15', 'day:2026-03-16']);
    });

    it('re-renders only the day cells that min makes unavailable', async () => {
      const r = render(<PerfCalendar defaultValue='2026-03-15' min='2026-03-02' />);
      await settle();
      reset();

      r.rerender(<PerfCalendar defaultValue='2026-03-15' min='2026-03-03' />);
      await expect.element(getDay(r, '2026-03-02')).toHaveAttribute('aria-disabled', 'true');
      await settle();

      expect(renderedDays()).toEqual(['day:2026-03-02']);
    });

    it('re-renders no cells when the parent re-renders with the same props', async () => {
      const disabledDates = ['2026-03-10'];
      const r = render(<PerfCalendar defaultValue='2026-03-15' disabledDates={disabledDates} />);
      await settle();
      reset();

      r.rerender(<PerfCalendar defaultValue='2026-03-15' disabledDates={disabledDates} />);
      await settle();

      expect(renders.size).toBe(0);
    });

    it('commits nothing when the date of the device changes and today is passed', async () => {
      vi.useFakeTimers({ toFake: ['setInterval', 'clearInterval', 'Date'] });
      onTestFinished(() => {
        vi.useRealTimers();
      });
      vi.setSystemTime(new Date(2026, 2, 20, 23, 59, 30));
      render(<PerfCalendar today='2026-03-20' defaultValue='2026-03-15' />);
      await settle();
      reset();

      vi.advanceTimersByTime(60_000);
      document.dispatchEvent(new Event('visibilitychange'));
      await settle();

      expect(commits).toBe(0);
    });

    it('does not render the month and year views while the days are shown', async () => {
      const r = render(<PerfCalendar defaultValue='2026-03-15' />);
      getDay(r, '2026-03-15').element().focus();
      await userEvent.keyboard('{PageDown}{ArrowRight}');
      await expect.element(getDay(r, '2026-04-16')).toHaveFocus();

      expect(renders.has('month')).toBe(false);
      expect(renders.has('year')).toBe(false);
    });
  });
});
