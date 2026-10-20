import { ComponentProps } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { userEvent } from 'vitest/browser';
import { cleanup, render, type RenderResult } from '@testing-library/react';

import { Calendar } from '../Calendar';
import {
  CalendarContent,
  CalendarDayPicker,
  CalendarDayPickerScroller,
  CalendarDayPickerScrollerContent,
  CalendarDayPickerScrollerLayout,
  CalendarHeader,
  CalendarMonthPicker,
  CalendarMonthPickerButton,
  CalendarMonthPickerLayout,
  CalendarNextButton,
  CalendarPickerButtonGroup,
  CalendarPrevButton,
  CalendarWeekLabel,
  CalendarWeekLabels,
  CalendarYearPicker,
  CalendarYearPickerButton,
  CalendarYearPickerScroller,
  CalendarYearPickerScrollerContent,
  CalendarYearPickerScrollerLayout,
} from '../components';

afterEach(cleanup);

const MonthLabel = () => <span data-testid='month-label'>Month</span>;
const YearLabel = () => <span data-testid='year-label'>Year</span>;

const CalendarTest = (props: ComponentProps<typeof Calendar>) => {
  const { children, ...rest } = props;
  
  return (
    <Calendar {...rest}>
      {children ?? (
        <>
          <CalendarHeader>
            <CalendarPrevButton data-testid='prev-button'>Prev</CalendarPrevButton>
            
            <CalendarPickerButtonGroup data-testid='picker-group'>
              <CalendarMonthPickerButton data-testid='month-picker-button'>
                <MonthLabel />
              </CalendarMonthPickerButton>
              <CalendarYearPickerButton data-testid='year-picker-button'>
                <YearLabel />
              </CalendarYearPickerButton>
            </CalendarPickerButtonGroup>
            
            <CalendarNextButton data-testid='next-button'>Next</CalendarNextButton>
          </CalendarHeader>
          
          <CalendarContent data-testid='content'>
            <CalendarDayPicker data-testid='day-picker'>
              <CalendarWeekLabels data-testid='week-labels'>
                <CalendarWeekLabel data-testid='week-label'>Mon</CalendarWeekLabel>
              </CalendarWeekLabels>
              
              <CalendarDayPickerScroller data-testid='day-scroller'>
                <CalendarDayPickerScrollerContent data-testid='day-scroller-content'>
                  <CalendarDayPickerScrollerLayout data-testid='day-scroller-layout' />
                </CalendarDayPickerScrollerContent>
              </CalendarDayPickerScroller>
            </CalendarDayPicker>
            
            <CalendarMonthPicker data-testid='month-picker'>
              <CalendarMonthPickerLayout data-testid='month-picker-layout' />
            </CalendarMonthPicker>
            
            <CalendarYearPicker data-testid='year-picker'>
              <CalendarYearPickerScroller data-testid='year-scroller'>
                <CalendarYearPickerScrollerContent data-testid='year-scroller-content'>
                  <CalendarYearPickerScrollerLayout data-testid='year-scroller-layout' />
                </CalendarYearPickerScrollerContent>
              </CalendarYearPickerScroller>
            </CalendarYearPicker>
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

const getDay = (r: RenderResult, iso: string) => {
  const [year, month, day] = iso.split('-').map(Number);
  const key = new Date(year, month - 1, day).getTime();
  
  return getContent(r).querySelector(`[role="gridcell"][data-key="${key}"]`) as HTMLElement;
};

const getSelectedDays = (r: RenderResult) => r.getByTestId('day-picker').querySelectorAll('[role="gridcell"][aria-selected="true"]');

const getDayPicker = (r: RenderResult) => r.getByTestId('day-picker');
const getMonthPicker = (r: RenderResult) => r.getByTestId('month-picker');
const getYearPicker = (r: RenderResult) => r.getByTestId('year-picker');

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
  
  describe('navigation keeps the focused day', () => {
    const getMonthCell = (r: RenderResult, month: number) =>
      getMonthPicker(r).querySelector(`[role="gridcell"][data-key="${month}"]`) as HTMLElement;
    const getYearCell = (r: RenderResult, year: number) =>
      getYearPicker(r).querySelector(`[role="gridcell"][data-key="${year}"]`) as HTMLElement;
    
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
      await expect.element(getMonthCell(r, 0)).toHaveFocus();
      await userEvent.keyboard('{ArrowRight}{ArrowRight}{Enter}');
      
      await expect.element(getDay(r, '2026-03-15')).toHaveAttribute('tabindex', '0');
    });
    
    it('moves focus to the same day of a year picked in the year picker', async () => {
      const r = render(<CalendarTest defaultValue='2026-01-15' />);
      
      await userEvent.click(getYearBtn(r));
      await userEvent.click(getYearCell(r, 2027));
      
      await expect.element(getDay(r, '2027-01-15')).toHaveAttribute('tabindex', '0');
    });
  });
  
  describe('fast scrolling', () => {
    const getScroller = (r: RenderResult) => r.getByTestId('day-scroller');
    
    const nextFrame = () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    
    it('reports every month passed while scrolling quickly', async () => {
      const onChangeMonth = vi.fn();
      const r = render(
        <div>
          <CalendarTest compact defaultMonth='2026-01-01' onChangeMonth={onChangeMonth}>
            <CalendarContent data-testid='content'>
              <CalendarDayPicker data-testid='day-picker'>
                <CalendarWeekLabels>
                  {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((label) => (
                    <CalendarWeekLabel key={label}>{label}</CalendarWeekLabel>
                  ))}
                </CalendarWeekLabels>
                <CalendarDayPickerScroller data-testid='day-scroller'>
                  <CalendarDayPickerScrollerContent>
                    <CalendarDayPickerScrollerLayout />
                  </CalendarDayPickerScrollerContent>
                </CalendarDayPickerScroller>
              </CalendarDayPicker>
            </CalendarContent>
          </CalendarTest>
        </div>,
      );
      
      await expect.poll(() => getScroller(r)?.scrollLeft).toBeGreaterThan(0);
      await nextFrame();
      
      for (let step = 0; step < 3; step++) {
        const scroller = getScroller(r)!;
        scroller.scrollBy({ left: scroller.clientWidth, behavior: 'instant' });
        await nextFrame();
      }
      
      await expect.poll(() => onChangeMonth.mock.calls.map(([month]) => month)).toEqual(['2026-02-01', '2026-03-01', '2026-04-01']);
      await expect.element(getDay(r, '2026-04-15')).toBeInTheDocument();
    });
  });
  
  describe('year picker keyboard', () => {
    const getYear = (r: RenderResult, year: number) =>
      getYearPicker(r).querySelector(`[role="gridcell"][data-key="${year}"]`) as HTMLElement;
    
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
            <CalendarDayPicker data-testid='day-picker'>
              <CalendarDayPickerScroller data-testid='day-scroller'>
                <CalendarDayPickerScrollerContent data-testid='day-scroller-content'>
                  <CalendarDayPickerScrollerLayout data-testid='day-scroller-layout' />
                </CalendarDayPickerScrollerContent>
              </CalendarDayPickerScroller>
            </CalendarDayPicker>
            
            <CalendarMonthPicker data-testid='month-picker'>
              <CalendarMonthPickerLayout data-testid='month-picker-layout' />
            </CalendarMonthPicker>
            
            <CalendarYearPicker data-testid='year-picker'>
              <CalendarYearPickerScroller data-testid='year-scroller'>
                <CalendarYearPickerScrollerContent data-testid='year-scroller-content'>
                  <CalendarYearPickerScrollerLayout data-testid='year-scroller-layout' />
                </CalendarYearPickerScrollerContent>
              </CalendarYearPickerScroller>
            </CalendarYearPicker>
          </CalendarContent>
        </CalendarTest>,
      );
      
      await expect.element(r.getByTestId('content')).toBeInTheDocument();
    });
    
    it('renders even if header is omitted (custom composition)', async () => {
      const r = render(
        <CalendarTest>
          <CalendarContent data-testid='content'>
            <CalendarDayPicker data-testid='day-picker'>
              <CalendarDayPickerScroller data-testid='day-scroller'>
                <CalendarDayPickerScrollerContent data-testid='day-scroller-content'>
                  <CalendarDayPickerScrollerLayout data-testid='day-scroller-layout' />
                </CalendarDayPickerScrollerContent>
              </CalendarDayPickerScroller>
            </CalendarDayPicker>
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
            <CalendarMonthPicker data-testid='month-picker-x'>
              <CalendarMonthPickerLayout data-testid='month-picker-layout-x' />
            </CalendarMonthPicker>
          </CalendarContent>
        </CalendarTest>,
      );
      
      await expect.element(r.getByTestId('content-x')).toBeInTheDocument();
    });
    
    it('supports overriding data-testid on wrappers: month picker', async () => {
      const r = render(
        <CalendarTest>
          <CalendarContent data-testid='content-x'>
            <CalendarMonthPicker data-testid='month-picker-x'>
              <CalendarMonthPickerLayout data-testid='month-picker-layout-x' />
            </CalendarMonthPicker>
          </CalendarContent>
        </CalendarTest>,
      );
      
      await expect.element(r.getByTestId('month-picker-x')).toBeInTheDocument();
    });
    
    it('supports overriding data-testid on wrappers: month picker layout', async () => {
      const r = render(
        <CalendarTest>
          <CalendarContent data-testid='content-x'>
            <CalendarMonthPicker data-testid='month-picker-x'>
              <CalendarMonthPickerLayout data-testid='month-picker-layout-x' />
            </CalendarMonthPicker>
          </CalendarContent>
        </CalendarTest>,
      );
      
      await expect.element(r.getByTestId('month-picker-layout-x')).toBeInTheDocument();
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