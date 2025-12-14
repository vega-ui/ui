// Calendar.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import React, { FC, PropsWithChildren, useEffect } from 'react';
import { Calendar, type CalendarProps } from '../Calendar.tsx';
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
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import {
  formatMonth,
  formatYear,
  getCurrentDate,
  getWeekDayNames,
} from '@vega-ui/utils';
import { useCalendarContext } from '../contexts';
import type { CalendarSelection } from '../types.ts';
import { Icon } from '../../Icon';

const MonthLabel: FC = () => {
  const { month } = useCalendarContext();
  return <>{formatMonth(month, navigator.language, 'long')}</>;
};

const YearLabel: FC = () => {
  const { year } = useCalendarContext();
  return <>{formatYear(year, navigator.language, 'numeric')}</>;
};

type TestCalendarProps<S extends CalendarSelection = 'single'> = CalendarProps<S> & {
  withProbes?: React.ReactNode;
};

const TestCalendar = <S extends CalendarSelection>({
 withProbes,
 children,
 ...props
}: PropsWithChildren<TestCalendarProps<S>>) => {
  return (
    <Calendar {...props}>
      <CalendarHeader>
        <CalendarPrevButton data-testid='prev-button'>
          <Icon>
            <ChevronLeft />
          </Icon>
        </CalendarPrevButton>
        <CalendarPickerButtonGroup>
          <CalendarMonthPickerButton data-testid='month-picker-button'>
            <MonthLabel />
          </CalendarMonthPickerButton>
          <CalendarYearPickerButton data-testid='year-picker-button'>
            <YearLabel />
          </CalendarYearPickerButton>
        </CalendarPickerButtonGroup>
        <CalendarNextButton data-testid='next-button'>
          <Icon>
            <ChevronRight />
          </Icon>
        </CalendarNextButton>
      </CalendarHeader>
      <CalendarContent>
        <CalendarDayPicker>
          <CalendarWeekLabels>
            {getWeekDayNames(navigator.language, 'short').map((name) => (
              <CalendarWeekLabel key={name}>{name}</CalendarWeekLabel>
            ))}
          </CalendarWeekLabels>
          <CalendarDayPickerScroller>
            <CalendarDayPickerScrollerContent>
              <CalendarDayPickerScrollerLayout />
            </CalendarDayPickerScrollerContent>
          </CalendarDayPickerScroller>
        </CalendarDayPicker>
        <CalendarMonthPicker data-testid='month-picker'>
          <CalendarMonthPickerLayout />
        </CalendarMonthPicker>
        <CalendarYearPicker data-testid='year-picker'>
          <CalendarYearPickerScroller>
            <CalendarYearPickerScrollerContent>
              <CalendarYearPickerScrollerLayout />
            </CalendarYearPickerScrollerContent>
          </CalendarYearPickerScroller>
        </CalendarYearPicker>
      </CalendarContent>
      {withProbes}
      {children}
    </Calendar>
  );
};

describe('Calendar', () => {
  it('renders header, day picker and week labels', () => {
    render(<TestCalendar />);
    
    expect(screen.getByTestId('prev-button')).toBeInTheDocument();
    expect(screen.getByTestId('next-button')).toBeInTheDocument();
    
    const headerButtons = screen.getAllByRole('button');
    expect(headerButtons.length).toBeGreaterThanOrEqual(3);
    
    const weekRow = screen.getAllByRole('row');
    expect(weekRow[0]).toBeInTheDocument();
    
    const weekHeaders = screen.getAllByRole('columnheader');
    expect(weekHeaders.length).toBe(7);
  });
  
  it('toggles month and year pickers via header buttons (uncontrolled picker)', () => {
    render(<TestCalendar />);
    
    const monthButton = screen.getByTestId('month-picker-button');
    const yearButton = screen.getByTestId('year-picker-button');
    const monthPicker = screen.getByTestId('month-picker');
    const yearPicker = screen.getByTestId('year-picker');
    
    expect(monthPicker).toHaveAttribute('data-visible', 'false');
    expect(yearPicker).toHaveAttribute('data-visible', 'false');
    expect(monthButton).toHaveAttribute('aria-pressed', 'false');
    expect(yearButton).toHaveAttribute('aria-pressed', 'false');
    
    fireEvent.click(monthButton);
    
    expect(monthPicker).toHaveAttribute('data-visible', 'true');
    expect(yearPicker).toHaveAttribute('data-visible', 'false');
    expect(monthButton).toHaveAttribute('aria-pressed', 'true');
    expect(yearButton).toHaveAttribute('aria-pressed', 'false');
    
    fireEvent.click(yearButton);
    
    expect(monthPicker).toHaveAttribute('data-visible', 'false');
    expect(yearPicker).toHaveAttribute('data-visible', 'true');
    expect(monthButton).toHaveAttribute('aria-pressed', 'false');
    expect(yearButton).toHaveAttribute('aria-pressed', 'true');
    
    fireEvent.click(yearButton);
    
    expect(monthPicker).toHaveAttribute('data-visible', 'false');
    expect(yearPicker).toHaveAttribute('data-visible', 'false');
    expect(monthButton).toHaveAttribute('aria-pressed', 'false');
    expect(yearButton).toHaveAttribute('aria-pressed', 'false');
  });
  
  it('calls onChangePicker when picker view changes', () => {
    const handleChangePicker = vi.fn();
    
    render(<TestCalendar onChangePicker={handleChangePicker} />);
    
    const monthButton = screen.getByTestId('month-picker-button');
    
    fireEvent.click(monthButton);
    fireEvent.click(monthButton);
    
    expect(handleChangePicker).toHaveBeenCalledTimes(2);
    expect(handleChangePicker).toHaveBeenNthCalledWith(1, 'month');
    expect(handleChangePicker).toHaveBeenNthCalledWith(2, 'day');
  });
  
  it('calls onChange with Date in single selection mode when a day is selected', () => {
    const handleChange = vi.fn();
    let selectDay: ((d: number | number[]) => void) | undefined;
    
    const Probe: FC = () => {
      const ctx = useCalendarContext();
      selectDay = ctx.onSelectDay;
      return null;
    };
    
    render(<TestCalendar onChange={handleChange} withProbes={<Probe />} />);
    
    const timestamp = getCurrentDate().getTime();
    
    act(() => {
      selectDay?.(timestamp);
    });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.calls[0][0]).toEqual(new Date(timestamp));
  });
  
  it('calls onChange with Date[] in multiple selection mode', () => {
    const handleChange = vi.fn();
    let selectDay: ((d: number | number[]) => void) | undefined;
    
    const Probe: FC = () => {
      const ctx = useCalendarContext();
      selectDay = ctx.onSelectDay;
      return null;
    };
    
    render(
      <TestCalendar selection='multiple' onChange={handleChange} withProbes={<Probe />} />,
    );
    
    const base = getCurrentDate().getTime();
    const values = [base, base + 86400000];
    
    act(() => {
      selectDay?.(values);
    });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    const arg = handleChange.mock.calls[0][0] as Date[];
    expect(Array.isArray(arg)).toBe(true);
    expect(arg[0]).toEqual(new Date(values[0]));
    expect(arg[1]).toEqual(new Date(values[1]));
  });
  
  it('calls onChange with Date[] in range selection mode', () => {
    const handleChange = vi.fn();
    let selectDay: ((d: number | number[]) => void) | undefined;
    
    const Probe: FC = () => {
      const ctx = useCalendarContext();
      selectDay = ctx.onSelectDay;
      return null;
    };
    
    render(
      <TestCalendar selection='range' onChange={handleChange} withProbes={<Probe />} />,
    );
    
    const base = getCurrentDate().getTime();
    const values = [base, base + 86400000];
    
    act(() => {
      selectDay?.(values);
    });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    const arg = handleChange.mock.calls[0][0] as Date[];
    expect(Array.isArray(arg)).toBe(true);
    expect(arg[0]).toEqual(new Date(values[0]));
    expect(arg[1]).toEqual(new Date(values[1]));
  });
  
  it('calls onMonthChange and updates internal index when month is selected', () => {
    const handleMonthChange = vi.fn();
    let selectMonth: ((m: number) => void) | undefined;
    
    const Probe: FC = () => {
      const ctx = useCalendarContext();
      selectMonth = ctx.onSelectMonth;
      return null;
    };
    
    render(<TestCalendar onMonthChange={handleMonthChange} withProbes={<Probe />} />);
    
    act(() => {
      selectMonth?.(5);
    });
    
    expect(handleMonthChange).toHaveBeenCalledWith(5);
  });
  
  it('calls onYearChange and clamps index when year is selected', () => {
    const handleYearChange = vi.fn();
    let selectYear: ((y: number) => void) | undefined;
    
    const Probe: FC = () => {
      const ctx = useCalendarContext();
      selectYear = ctx.onSelectYear;
      return null;
    };
    
    render(<TestCalendar onYearChange={handleYearChange} withProbes={<Probe />} />);
    
    const nextYear = new Date().getFullYear() + 1;
    
    act(() => {
      selectYear?.(nextYear);
    });
    
    expect(handleYearChange).toHaveBeenCalledWith(nextYear);
  });
  
  it('wires prev/next buttons to scroller apiRef', () => {
    const nextMock = vi.fn();
    const prevMock = vi.fn();
    
    const ProbeScroller: FC = () => {
      const ctx = useCalendarContext();
      useEffect(() => {
        if (ctx.scrollerApiRef) {
          ctx.scrollerApiRef.current = {
            next: nextMock,
            prev: prevMock,
            indexes: [0],
            reset: vi.fn(),
          } as never;
        }
      }, [ctx.scrollerApiRef]);
      return null;
    };
    
    render(<TestCalendar withProbes={<ProbeScroller />} />);
    
    const nextButton = screen.getByTestId('next-button');
    const prevButton = screen.getByTestId('prev-button');
    
    fireEvent.click(nextButton);
    fireEvent.click(prevButton);
    
    expect(nextMock).toHaveBeenCalledTimes(1);
    expect(prevMock).toHaveBeenCalledTimes(1);
  });
  
  it('disables prev/next at range boundaries based on from/to', () => {
    const now = new Date();
    const boundaryFrom = new Date(now.getFullYear(), now.getMonth(), 1);
    const boundaryTo = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const { rerender } = render(
      <TestCalendar from={boundaryFrom} to={boundaryTo} />,
    );
    
    const prevButton = screen.getByTestId('prev-button');
    const nextButton = screen.getByTestId('next-button');
    
    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
    expect(prevButton).toHaveAttribute('data-visible', 'false');
    expect(nextButton).toHaveAttribute('data-visible', 'false');
    
    rerender(<TestCalendar />);
    
    expect(prevButton).not.toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });
  
  it('passes compact, size and variant down to CalendarBase root', () => {
    const { container } = render(
      <TestCalendar compact size='md' variant='primary' />,
    );
    
    const root = container.firstElementChild as HTMLElement | null;
    expect(root).not.toBeNull();
    expect(root).toHaveAttribute('data-compact', 'true');
  });
});
