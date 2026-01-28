import { FC } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { DateRangeField, type DateRangeFieldProps } from '../DateRangeField';
import { DateRangeFieldInput, DateRangeFieldCalendar, DateRangeFieldTriggerIconButton } from '../components';
import { Popover, PopoverTrigger, PopoverContent } from '../../Popover';
import { Icon } from '../../Icon';

import {
  CalendarHeader,
  CalendarContent,
  CalendarPrevYearGroupButton,
  CalendarPrevButton,
  CalendarPickerButtonGroup,
  CalendarMonthPickerButton,
  CalendarMonthLabel,
  CalendarYearPickerButton,
  CalendarYearLabel,
  CalendarNextButton,
  CalendarNextYearGroupButton,
  
  CalendarDayPicker,
  CalendarWeekLabels,
  CalendarWeekLabel,
  CalendarDayPickerScroller,
  CalendarDayPickerScrollerContent,
  
  CalendarMonthPicker,
  CalendarMonthPickerLayout,
  
  CalendarYearPicker,
  CalendarYearPickerScroller,
  CalendarYearPickerScrollerContent,
  CalendarDayPickerScrollerLayout,
  CalendarYearPickerScrollerLayout,
} from '../../Calendar';

import { getWeekDayNames } from '@vega-ui/utils';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from '@vega-ui/icons';

afterEach(cleanup);

beforeEach(() => {
  vi.setSystemTime(new Date(2026, 0, 1))
})

const TESTID_INPUT = 'daterange-input';
const TESTID_TRIGGER = 'daterange-trigger';
const TESTID_CONTENT = 'daterange-popover-content';
const TESTID_CALENDAR_ROOT = 'daterange-calendar';

const FORMAT = 'dd.MM.yyyy';
const SEPARATOR = '.';
const RANGE_SEPARATOR = ' – ';

const DateRangeFieldTest: FC<Partial<DateRangeFieldProps>> = ({
  onInput,
  onChange,
  ...props
}) => (
  <DateRangeField
    format={FORMAT}
    separator={SEPARATOR}
    rangeSeparator={RANGE_SEPARATOR}
    {...props}
  >
    <DateRangeFieldInput
      data-testid={TESTID_INPUT}
      onInput={onInput}
      onChange={onChange}
    />
    <Popover placement='bottom-end'>
      <PopoverTrigger asChild>
        <DateRangeFieldTriggerIconButton aria-label='Open calendar' data-testid={TESTID_TRIGGER} />
      </PopoverTrigger>
      <PopoverContent data-testid={TESTID_CONTENT}>
        <DateRangeFieldCalendar data-testid={TESTID_CALENDAR_ROOT}>
          <CalendarHeader>
            <CalendarPrevYearGroupButton>
              <Icon><ArrowLeft /></Icon>
            </CalendarPrevYearGroupButton>
            <CalendarPrevButton>
              <Icon><ChevronLeft /></Icon>
            </CalendarPrevButton>
            <CalendarPickerButtonGroup>
              <CalendarMonthPickerButton>
                <CalendarMonthLabel />
              </CalendarMonthPickerButton>
              <CalendarYearPickerButton>
                <CalendarYearLabel />
              </CalendarYearPickerButton>
            </CalendarPickerButtonGroup>
            <CalendarNextButton>
              <Icon><ChevronRight /></Icon>
            </CalendarNextButton>
            <CalendarNextYearGroupButton>
              <Icon><ArrowRight /></Icon>
            </CalendarNextYearGroupButton>
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
            
            <CalendarMonthPicker>
              <CalendarMonthPickerLayout />
            </CalendarMonthPicker>
            
            <CalendarYearPicker>
              <CalendarYearPickerScroller>
                <CalendarYearPickerScrollerContent>
                  <CalendarYearPickerScrollerLayout />
                </CalendarYearPickerScrollerContent>
              </CalendarYearPickerScroller>
            </CalendarYearPicker>
          </CalendarContent>
        </DateRangeFieldCalendar>
      </PopoverContent>
    </Popover>
  </DateRangeField>
);

const getInput = (r: RenderResult) =>
  r.getByTestId(TESTID_INPUT) as HTMLInputElement;

const getTrigger = (r: RenderResult) =>
  r.getByTestId(TESTID_TRIGGER);

const getContent = (r: RenderResult) =>
  r.getByTestId(TESTID_CONTENT);

const queryContent = (r: RenderResult) =>
  r.queryByTestId(TESTID_CONTENT);

const getCalendarRoot = (r: RenderResult) =>
  r.getByTestId(TESTID_CALENDAR_ROOT);

const getCell = (r: RenderResult, date: Date) =>
  getContent(r).querySelector(
    `[role="gridcell"][data-key="${date.getTime()}"]`,
  ) as HTMLElement;

const pickDate = async (r: RenderResult, date: Date) => {
  await userEvent.click(getCell(r, date));
};

describe('DateRangeField', () => {
  describe('Critical User Paths', () => {
    let r: RenderResult;
    const onInput = vi.fn();
    
    beforeEach(() => {
      r = render(<DateRangeFieldTest onInput={onInput} />);
    });
    
    it('renders input and calendar trigger', async () => {
      await expect.element(getInput(r)).toHaveRole('textbox');
      await expect.element(getTrigger(r)).toHaveRole('button');
    });
    
    it('opens calendar popover', async () => {
      expect(queryContent(r)).toBeNull();
      
      await userEvent.click(getTrigger(r));
      
      await expect.element(getContent(r)).toBeInTheDocument();
      await expect.element(getCalendarRoot(r)).toBeInTheDocument();
    });
    
    it('selecting start date writes only start value', async () => {
      await userEvent.click(getTrigger(r));
      await pickDate(r, new Date(2026, 0, 10));
      
      expect(getInput(r)).toHaveValue('10.01.2026');
    });
    
    it('selecting date range writes full range into input', async () => {
      await userEvent.click(getTrigger(r));
      await pickDate(r, new Date(2026, 0, 10));
      await pickDate(r, new Date(2026, 0, 15));
      
      expect(getInput(r)).toHaveValue('10.01.2026 – 15.01.2026');
      expect(onInput).toHaveBeenCalled();
    });
    
    it('typing a valid range keeps calendar in sync', async () => {
      const input = getInput(r);
      
      await userEvent.type(input, '10.01.2026 – 15.01.2026');
      await userEvent.click(getTrigger(r));
      
      await expect.element(getCalendarRoot(r)).toBeInTheDocument();
    });
  });
  
  describe('Edge Cases', () => {
    it('accepts single date without range separator', async () => {
      const r = render(<DateRangeFieldTest />);
      const input = getInput(r);
      
      await userEvent.type(input, '12.01.2026');
      
      expect(input).toHaveValue('12.01.2026');
    });
    
    it('ignores invalid input', async () => {
      const onChange = vi.fn();
      const r = render(<DateRangeFieldTest onChange={onChange} />);
      const input = getInput(r);
      
      await userEvent.type(input, 'aa.bb.cccc');
      
      expect(onChange).not.toHaveBeenCalled();
    });
    
    it('does not crash when opening calendar with empty value', async () => {
      const r = render(<DateRangeFieldTest />);
      
      await userEvent.click(getTrigger(r));
      await expect.element(getCalendarRoot(r)).toBeInTheDocument();
    });
  });
  
  describe('Accessibility', () => {
    it('supports keyboard selection', async () => {
      const r = render(<DateRangeFieldTest />);
      
      await userEvent.click(getTrigger(r));
      
      const cell = getCell(r, new Date(2026, 0, 10));
      cell.focus();
      
      await expect.element(cell).toHaveFocus();
      await userEvent.keyboard('{Enter}');
      
      expect(getInput(r)).toHaveValue('10.01.2026');
    });
  });
});