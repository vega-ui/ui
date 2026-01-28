import { FC } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';

import { DateField, type DateFieldProps } from '../DateField';
import { DateFieldInput, DateFieldCalendar, DateFieldTriggerIconButton } from '../components';
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
  CalendarYearPickerScrollerContent, CalendarDayPickerScrollerLayout, CalendarYearPickerScrollerLayout,
} from '../../Calendar';

import { getWeekDayNames } from '@vega-ui/utils';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { userEvent } from 'vitest/browser';

afterEach(cleanup);

beforeEach(() => {
  vi.setSystemTime(new Date(2026, 0, 1))
})

const TESTID_INPUT = 'datefield-input';
const TESTID_TRIGGER = 'datefield-trigger';
const TESTID_CONTENT = 'datefield-popover-content';
const TESTID_CALENDAR_ROOT = 'datefield-calendar';

const FORMAT = 'dd.MM.yyyy';
const SEPARATOR = '.';

const DateFieldTest: FC<Partial<DateFieldProps>> = ({
  onInput,
  onChange,
  ...props
}) => {
  return (
    <DateField format={FORMAT} separator={SEPARATOR} {...props}>
      <DateFieldInput data-testid={TESTID_INPUT} onInput={onInput} onChange={onChange} />
      <Popover placement='bottom-end'>
        <PopoverTrigger asChild>
          <DateFieldTriggerIconButton aria-label='Open calendar'  data-testid={TESTID_TRIGGER} />
        </PopoverTrigger>
        <PopoverContent data-testid={TESTID_CONTENT}>
          <DateFieldCalendar data-testid={TESTID_CALENDAR_ROOT}>
            <CalendarHeader>
              <CalendarPrevYearGroupButton aria-label='Previous year group'>
                <Icon>
                  <ArrowLeft />
                </Icon>
              </CalendarPrevYearGroupButton>
              <CalendarPrevButton aria-label='Previous month'>
                <Icon>
                  <ChevronLeft />
                </Icon>
              </CalendarPrevButton>
              <CalendarPickerButtonGroup>
                <CalendarMonthPickerButton aria-label='Open month picker'>
                  <CalendarMonthLabel />
                </CalendarMonthPickerButton>
                <CalendarYearPickerButton aria-label='Open year picker'>
                  <CalendarYearLabel />
                </CalendarYearPickerButton>
              </CalendarPickerButtonGroup>
              <CalendarNextButton aria-label='Next month'>
                <Icon>
                  <ChevronRight />
                </Icon>
              </CalendarNextButton>
              <CalendarNextYearGroupButton aria-label='Next year group'>
                <Icon>
                  <ArrowRight />
                </Icon>
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
          </DateFieldCalendar>
        </PopoverContent>
      </Popover>
    </DateField>
  );
};

const getInput = (r: RenderResult) => r.getByTestId(TESTID_INPUT) as HTMLInputElement;
const getTrigger = (r: RenderResult) => r.getByTestId(TESTID_TRIGGER);
const queryContent = (r: RenderResult) => r.queryByTestId(TESTID_CONTENT);
const getContent = (r: RenderResult) => r.getByTestId(TESTID_CONTENT);
const getCalendarRoot = (r: RenderResult) => r.getByTestId(TESTID_CALENDAR_ROOT);
const getCell = (r: RenderResult, date: Date) => getContent(r).querySelector(`[role="gridcell"][data-key="${date.getTime()}"]`) as HTMLElement;

const pickDate = async (r: RenderResult, date: Date) => {
  const cell = getCell(r, date)
  await userEvent.click(cell);
};

describe('DateField', () => {
  describe('Critical User Paths', () => {
    let r: RenderResult;
    const onInput = vi.fn();
    
    beforeEach(() => {
      r = render(<DateFieldTest onInput={onInput} />);
    });
    
    it('renders input and calendar trigger', async () => {
      await expect.element(getInput(r)).toHaveRole('textbox');
      await expect.element(getTrigger(r)).toHaveRole('button');
    });
    
    it('opens calendar popover by click on trigger', async () => {
      expect(queryContent(r)).toBeNull();
      
      await userEvent.click(getTrigger(r));
      
      await expect.element(getContent(r)).toBeInTheDocument();
      await expect.element(getCalendarRoot(r)).toBeInTheDocument();
    });
    
    it('selecting a day in calendar writes value into native input and dispatches input/change events', async () => {
      await userEvent.click(getTrigger(r));
      await pickDate(r, new Date(2026, 0, 15));
      
      expect(getInput(r)).toHaveValue('15.01.2026');
      expect(onInput).toHaveBeenCalledTimes(1);
    });
    
    it('typing a valid date updates internal state and keeps value available for calendar', async () => {
      const input = getInput(r);
      
      await userEvent.click(input);
      await userEvent.type(input, '15.01.2026');
      
      await userEvent.click(getTrigger(r));
      await expect.element(getCalendarRoot(r)).toBeInTheDocument();
    });
    
    it('supports min/max constraints: selecting out-of-range day does not change input value', async () => {
      const min = new Date(2026, 0, 10);
      const max = new Date(2026, 0, 20);
      
      r.rerender(<DateFieldTest min={min} max={max} />);
      
      const input = getInput(r);
      expect(input).toHaveValue('');
      
      await userEvent.click(getTrigger(r));
      await expect.element(getCell(r, new Date(2026, 0, 5))).toBeDisabled();
      await expect.element(getCell(r, new Date(2026, 0, 21))).toBeDisabled();
    });
  });
  
  describe('Edge Cases', () => {
    it('ignores incomplete/invalid typed value (does not dispatch change via calendar sync)', async () => {
      const r = render(<DateFieldTest />);
      
      const input = getInput(r);
      const onNativeChange = vi.fn();
      
      r.rerender(<DateFieldTest onChange={onNativeChange} />);
      
      await userEvent.click(input);
      await userEvent.type(input, 'aa.bb.cccc');
      
      expect(onNativeChange).toHaveBeenCalledTimes(0);
    });
    
    it('does not crash when calendar opens with empty date', async () => {
      const r = render(<DateFieldTest />);
      
      await userEvent.click(getTrigger(r));
      await expect.element(getCalendarRoot(r)).toBeInTheDocument();
    });
  });
  
  describe('Accessibility', () => {
    describe('roles', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<DateFieldTest />);
      });
      
      it('input exposes textbox role', async () => {
        await expect.element(getInput(r)).toHaveRole('textbox');
      });
      
      it('calendar trigger is an accessible button', async () => {
        await expect.element(getTrigger(r)).toHaveRole('button');
        await expect.element(getTrigger(r)).toHaveAccessibleName();
      });
    });
    
    describe('keyboard', () => {
      it('allows selecting a day using keyboard activation (Enter) on a day button', async () => {
        const r = render(<DateFieldTest />);
        
        await userEvent.click(getTrigger(r));
        
        const cell = getCell(r, new Date(2026, 0, 15))
        cell.focus();
        
        await expect.element(cell).toHaveFocus();
        await userEvent.keyboard('{Enter}');
        
        expect(getInput(r)).toHaveValue('15.01.2026');
      });
    });
  });
});