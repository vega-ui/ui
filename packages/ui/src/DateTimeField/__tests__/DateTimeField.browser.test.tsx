import { FC } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { DateTimeField, type DateTimeFieldProps } from '../DateTimeField';
import {
  DateTimeFieldInput,
  DateTimeFieldCalendar,
  DateTimeFieldTriggerIconButton,
} from '../components';

import { Popover, PopoverTrigger, PopoverContent } from '../../Popover';
import {
  CalendarContent, CalendarDayPicker, CalendarDayPickerScroller, CalendarDayPickerScrollerContent,
  CalendarDayPickerScrollerLayout,
  CalendarHeader, CalendarMonthLabel,
  CalendarMonthPicker, CalendarMonthPickerButton,
  CalendarMonthPickerLayout, CalendarNextButton, CalendarNextYearGroupButton,
  CalendarPickerButtonGroup,
  CalendarPrevButton,
  CalendarPrevYearGroupButton, CalendarWeekLabel, CalendarWeekLabels, CalendarYearLabel,
  CalendarYearPicker, CalendarYearPickerButton, CalendarYearPickerScroller, CalendarYearPickerScrollerContent,
  CalendarYearPickerScrollerLayout
} from '../../Calendar';
import { Icon } from '../../Icon';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { getWeekDayNames } from '@vega-ui/utils';

afterEach(cleanup);

beforeEach(() => {
  vi.setSystemTime(new Date(2026, 0, 1))
})

const TESTID_INPUT = 'datetimefield-input';
const TESTID_TRIGGER = 'datetimefield-trigger';
const TESTID_CONTENT = 'datetimefield-popover-content';
const TESTID_CALENDAR = 'datetimefield-calendar';

const FORMAT = 'dd.MM.yyyy';
const SEPARATOR = ', ';

const DateTimeFieldTest: FC<Partial<DateTimeFieldProps>> = ({
  onInput,
  onChange,
  ...props
}) => (
  <DateTimeField dateFormat={FORMAT} separator={SEPARATOR} {...props}>
    <DateTimeFieldInput
      data-testid={TESTID_INPUT}
      onInput={onInput}
      onChange={onChange}
    />
    <Popover>
      <PopoverTrigger asChild>
        <DateTimeFieldTriggerIconButton aria-label='Open calendar' data-testid={TESTID_TRIGGER} />
      </PopoverTrigger>
      <PopoverContent data-testid={TESTID_CONTENT}>
        <DateTimeFieldCalendar data-testid={TESTID_CALENDAR}>
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
        </DateTimeFieldCalendar>
      </PopoverContent>
    </Popover>
  </DateTimeField>
);

const getInput = (r: RenderResult) =>
  r.getByTestId(TESTID_INPUT) as HTMLInputElement;
const getTrigger = (r: RenderResult) => r.getByTestId(TESTID_TRIGGER);
const queryContent = (r: RenderResult) => r.queryByTestId(TESTID_CONTENT);
const getContent = (r: RenderResult) => r.getByTestId(TESTID_CONTENT);
const getCalendar = (r: RenderResult) => r.getByTestId(TESTID_CALENDAR);
const getCell = (r: RenderResult, date: Date) =>
  getContent(r).querySelector(
    `[role="gridcell"][data-key="${date.getTime()}"]`
  ) as HTMLElement;

const pickDate = async (r: RenderResult, date: Date) => {
  const cell = getCell(r, date);
  await userEvent.click(cell);
};

describe('DateTimeField', () => {
  describe('Critical User Paths', () => {
    let r: RenderResult;
    const onInput = vi.fn();
    
    beforeEach(() => {
      r = render(<DateTimeFieldTest onInput={onInput} />);
    });
    
    it('renders input and calendar trigger', async () => {
      await expect.element(getInput(r)).toHaveRole('textbox');
      await expect.element(getTrigger(r)).toHaveRole('button');
    });
    
    it('opens calendar popover by clicking trigger', async () => {
      expect(queryContent(r)).toBeNull();
      
      await userEvent.click(getTrigger(r));
      
      await expect.element(getContent(r)).toBeInTheDocument();
      await expect.element(getCalendar(r)).toBeInTheDocument();
    });
    
    it('selecting date keeps time and writes full datetime into input', async () => {
      const input = getInput(r);
      
      await userEvent.type(input, '15.01.2026, 12:30');
      
      await userEvent.click(getTrigger(r));
      await pickDate(r, new Date(2026, 0, 20));
      
      expect(input).toHaveValue('20.01.2026, 12:30');
      expect(onInput).toHaveBeenCalled();
    });
    
    it('typing valid datetime updates internal state and calendar opens correctly', async () => {
      const input = getInput(r);
      
      await userEvent.click(input);
      await userEvent.type(input, '10.02.2026, 08:15');
      
      await userEvent.click(getTrigger(r));
      await expect.element(getCalendar(r)).toBeInTheDocument();
    });
    
    it('respects min/max when selecting date via calendar', async () => {
      const min = new Date(2026, 0, 10);
      const max = new Date(2026, 0, 20);
      
      r.rerender(<DateTimeFieldTest min={min} max={max} />);
      
      await userEvent.click(getTrigger(r));
      
      await expect
        .element(getCell(r, new Date(2026, 0, 5)))
        .toBeDisabled();
      await expect
        .element(getCell(r, new Date(2026, 0, 25)))
        .toBeDisabled();
    });
  });
  
  describe('Edge Cases', () => {
    it('ignores invalid datetime input and does not sync calendar', async () => {
      const onChange = vi.fn();
      const r = render(<DateTimeFieldTest onChange={onChange} />);
      
      const input = getInput(r);
      
      await userEvent.type(input, 'aa.bb.cccc, dd:ee');
      
      expect(onChange).toHaveBeenCalledTimes(0);
    });
    
    it('does not crash when opening calendar with empty value', async () => {
      const r = render(<DateTimeFieldTest />);
      
      await userEvent.click(getTrigger(r));
      await expect.element(getCalendar(r)).toBeInTheDocument();
    });
  });
  
  describe('Accessibility', () => {
    describe('roles', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<DateTimeFieldTest />);
      });
      
      it('input exposes textbox role', async () => {
        await expect.element(getInput(r)).toHaveRole('textbox');
      });
      
      it('trigger button has accessible role', async () => {
        await expect.element(getTrigger(r)).toHaveRole('button');
        await expect.element(getTrigger(r)).toHaveAccessibleName();
      });
    });
    
    describe('keyboard', () => {
      it('allows selecting date using Enter key on focused calendar cell', async () => {
        const r = render(<DateTimeFieldTest />);
        
        await userEvent.click(getTrigger(r));
        
        const cell = getCell(r, new Date(2026, 0, 15));
        cell.focus();
        
        await expect.element(cell).toHaveFocus();
        await userEvent.keyboard('{Enter}');
        
        expect(getInput(r)).toHaveValue('15.01.2026, 00:00');
      });
    });
  });
});