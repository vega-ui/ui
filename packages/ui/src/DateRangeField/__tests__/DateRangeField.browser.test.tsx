import { FC, useState } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';
import { page, userEvent } from 'vitest/browser';

import { DateRangeField, type DateRangeFieldProps } from '../DateRangeField';
import { DateRangeFieldInput, DateRangeFieldCalendar, DateRangeFieldTriggerIconButton, type DateRangeFieldInputProps, type DateRangeFieldCalendarProps } from '../components';
import { Popover, PopoverTrigger, PopoverContent, type PopoverProps } from '../../Popover';
import { Icon } from '../../Icon';
import { Label } from '../../Label';

import {
  CalendarHeader,
  CalendarContent,
  CalendarPrevButton,
  CalendarNextButton,
  CalendarHeading,
  CalendarViewButton,
  CalendarMonthLabel,
  CalendarYearLabel,
  CalendarDays, CalendarWeekdays, CalendarWeekday, CalendarDay,
  CalendarWeeks,
  CalendarDaysScroller,
  CalendarDaysScrollerContent,
  CalendarMonth,
  CalendarMonths,
  CalendarMonthsGrid,
  CalendarYear,
  CalendarYears,
  CalendarYearsScroller,
  CalendarYearsScrollerContent,
  CalendarYearsGrid,
  useCalendarContext,
  useCalendarDayContext,
} from '../../Calendar';

import { formatISODate } from '@vega-ui/utils';
import { formatCalendarDate, gregorianCalendar, createCalendarSystem, type CalendarSystem } from '@vega-ui/i18n';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';

afterEach(cleanup);

const LabeledDay = () => {
  const { date } = useCalendarDayContext();
  const { locale, calendar } = useCalendarContext();

  if (date === undefined) return <CalendarDay />;

  return <CalendarDay aria-label={formatCalendarDate(calendar, date, locale, { dateStyle: 'full' })} />;
};

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

interface DateRangeFieldTestProps extends Partial<DateRangeFieldProps> {
  inputProps?: DateRangeFieldInputProps
  popoverProps?: PopoverProps
  calendarProps?: DateRangeFieldCalendarProps
}

const DateRangeFieldTest: FC<DateRangeFieldTestProps> = ({
  onInput,
  onChange,
  inputProps,
  popoverProps,
  calendarProps,
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
      {...inputProps}
    />
    <Popover placement='bottom-end' {...popoverProps}>
      <PopoverTrigger asChild>
        <DateRangeFieldTriggerIconButton aria-label='Open calendar' data-testid={TESTID_TRIGGER} />
      </PopoverTrigger>
      <PopoverContent data-testid={TESTID_CONTENT}>
        <DateRangeFieldCalendar data-testid={TESTID_CALENDAR_ROOT} style={{ width: 320 }} {...calendarProps}>
          <CalendarHeader>
            <CalendarPrevButton aria-label='Previous month'>
              <Icon>
                <ChevronLeft />
              </Icon>
            </CalendarPrevButton>
            <CalendarHeading>
              <CalendarViewButton view='month' aria-label='Open month picker'>
                <CalendarMonthLabel />
              </CalendarViewButton>
              <CalendarViewButton view='year' aria-label='Open year picker'>
                <CalendarYearLabel />
              </CalendarViewButton>
            </CalendarHeading>
            <CalendarNextButton aria-label='Next month'>
              <Icon>
                <ChevronRight />
              </Icon>
            </CalendarNextButton>
          </CalendarHeader>
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
            <CalendarMonths>
              <CalendarMonthsGrid>
                <CalendarMonth />
              </CalendarMonthsGrid>
            </CalendarMonths>
            <CalendarYears>
              <CalendarYearsScroller>
                <CalendarYearsScrollerContent>
                  <CalendarYearsGrid>
                    <CalendarYear />
                  </CalendarYearsGrid>
                </CalendarYearsScrollerContent>
              </CalendarYearsScroller>
            </CalendarYears>
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


const getCalendarRoot = (r: RenderResult) =>
  r.getByTestId(TESTID_CALENDAR_ROOT);

const getCell = (r: RenderResult, date: Date, calendar: CalendarSystem = gregorianCalendar) =>
  page.elementLocator(getContent(r)).getByRole('gridcell', { name: formatCalendarDate(calendar, formatISODate(date), 'en-US', { dateStyle: 'full' }), exact: true });

const pickDate = async (r: RenderResult, date: Date, calendar?: CalendarSystem) => {
  await Promise.allSettled(document.getAnimations().map((animation) => animation.finished));
  await userEvent.click(getCell(r, date, calendar));
};

describe('DateRangeField', () => {
  describe('Critical User Paths', () => {
    describe('controlled input', () => {
      const ControlledDateRangeFieldTest: FC<Partial<DateRangeFieldProps>> = (props) => {
        const [value, setValue] = useState<[start: string, end: string]>(['', '']);

        return (
          <>
            <DateRangeFieldTest {...props} value={value} onChangeValue={setValue} />
            <button type='button' onClick={() => setValue(['2026-01-10', '2026-01-15'])}>Fill</button>
          </>
        );
      };

      it('keeps the typed text and selects the date', async () => {
        cleanup();
        const r = render(<ControlledDateRangeFieldTest />);

        await userEvent.type(getInput(r), `10.01.2026${RANGE_SEPARATOR}15.01.2026`);

        await expect.element(getInput(r)).toHaveValue(`10.01.2026${RANGE_SEPARATOR}15.01.2026`);
        await userEvent.click(getTrigger(r));
        await expect.element(getCell(r, new Date(2026, 0, 10))).toHaveAttribute('aria-selected', 'true');
        await expect.element(getCell(r, new Date(2026, 0, 15))).toHaveAttribute('aria-selected', 'true');
      });

      it('dispatches input for a whole value the parent accepts', async () => {
        cleanup();
        const r = render(<ControlledDateRangeFieldTest />);
        const onInput = vi.fn();
        getInput(r).addEventListener('input', onInput);

        await userEvent.fill(getInput(r), `10.01.2026${RANGE_SEPARATOR}15.01.2026`);

        expect(onInput).toHaveBeenCalled();
      });

      it('selects the range of a value set outside', async () => {
        cleanup();
        const r = render(<ControlledDateRangeFieldTest />);

        await userEvent.click(r.getByRole('button', { name: 'Fill' }));

        await expect.element(getInput(r)).toHaveValue(`10.01.2026${RANGE_SEPARATOR}15.01.2026`);
        await userEvent.click(getTrigger(r));
        await expect.element(getCell(r, new Date(2026, 0, 10))).toHaveAttribute('aria-selected', 'true');
        await expect.element(getCell(r, new Date(2026, 0, 15))).toHaveAttribute('aria-selected', 'true');
      });
    });

    let r: RenderResult;
    const onInput = vi.fn();
    
    beforeEach(() => {
      r = render(<DateRangeFieldTest onInput={onInput} />);
    });
    
    it('selecting date range writes full range into input', async () => {
      await userEvent.click(getTrigger(r));
      await pickDate(r, new Date(2026, 0, 10));
      await pickDate(r, new Date(2026, 0, 15));
      
      expect(getInput(r)).toHaveValue('10.01.2026 – 15.01.2026');
      expect(onInput).toHaveBeenCalled();
    });

    describe('form', () => {
      it('restores the default range on form.reset()', async () => {
        cleanup();
        const r = render(
          <form data-testid='form'>
            <DateRangeFieldTest defaultValue={['2026-01-10', '2026-01-15']} />
          </form>
        );

        await userEvent.clear(getInput(r));
        (r.getByTestId('form') as HTMLFormElement).reset();

        await expect.element(getInput(r)).toHaveValue(`10.01.2026${RANGE_SEPARATOR}15.01.2026`);
      });
    });
  });

  describe('Error handling', () => {
    it('makes a range without an end invalid with the message of the browser', async () => {
      const r = render(<DateRangeFieldTest />);

      await userEvent.type(getInput(r), '10.01.2026');

      expect(getInput(r).validity.customError).toBe(true);
      expect(getInput(r).validationMessage).not.toBe('');

      await userEvent.type(getInput(r), `${RANGE_SEPARATOR}15.01.2026`);

      expect(getInput(r).validity.valid).toBe(true);
    });
  });
  
  describe('Edge Cases', () => {
    it('does not change the range when the calendar navigates to another month', async () => {
      const r = render(<DateRangeFieldTest />);

      await userEvent.type(getInput(r), `10.01.2026${RANGE_SEPARATOR}15.01.2026`);
      await userEvent.click(getTrigger(r));
      r.getByRole('button', { name: 'Next month' }).focus();
      await userEvent.keyboard('{Enter}');
      await expect.element(getCalendarRoot(r)).toHaveTextContent('February');
      await new Promise((resolve) => setTimeout(resolve, 300));

      await expect.element(getInput(r)).toHaveValue(`10.01.2026${RANGE_SEPARATOR}15.01.2026`);
    });

    describe('field state follows the input', () => {
      const openCalendar = async (r: RenderResult) => {
        await userEvent.click(getTrigger(r));
        await expect.element(getCalendarRoot(r)).toBeInTheDocument();
      };

      it('clears the range when the text is cleared', async () => {
        const r = render(<DateRangeFieldTest />);

        await userEvent.type(getInput(r), `10.01.2026${RANGE_SEPARATOR}15.01.2026`);
        await userEvent.clear(getInput(r));
        await openCalendar(r);

        await expect.element(getCell(r, new Date(2026, 0, 10))).not.toHaveAttribute('aria-selected', 'true');
        await expect.element(getCell(r, new Date(2026, 0, 15))).not.toHaveAttribute('aria-selected', 'true');
      });

      it('drops the end date when it becomes incomplete', async () => {
        const r = render(<DateRangeFieldTest />);

        await userEvent.type(getInput(r), `10.01.2026${RANGE_SEPARATOR}15.01.2026{Backspace}`);
        await openCalendar(r);

        await expect.element(getCell(r, new Date(2026, 0, 10))).toHaveAttribute('aria-selected', 'true');
        await expect.element(getCell(r, new Date(2026, 0, 15))).not.toHaveAttribute('aria-selected', 'true');
      });

      it('selects the range of defaultValue', async () => {
        const r = render(<DateRangeFieldTest defaultValue={['2026-01-10', '2026-01-15']} />);
        await openCalendar(r);

        await expect.element(getCell(r, new Date(2026, 0, 10))).toHaveAttribute('aria-selected', 'true');
        await expect.element(getCell(r, new Date(2026, 0, 15))).toHaveAttribute('aria-selected', 'true');
      });

      it('follows the text emptied by a reset button', async () => {
        const r = render(
          <form>
            <DateRangeFieldTest />
            <button type='reset'>Reset</button>
          </form>
        );

        await userEvent.type(getInput(r), `10.01.2026${RANGE_SEPARATOR}15.01.2026`);
        await userEvent.click(r.getByRole('button', { name: 'Reset' }));
        await expect.element(getInput(r)).toHaveValue('');
        await openCalendar(r);

        await expect.element(getCell(r, new Date(2026, 0, 10))).not.toHaveAttribute('aria-selected', 'true');
      });
    });

    describe('calendar systems', () => {
      it('writes a range picked in the Persian calendar', async () => {
        const persian = createCalendarSystem('persian');
        const r = render(<DateRangeFieldTest calendar={persian} />);
      
        await userEvent.type(getInput(r), '01.01.1404');
        await userEvent.click(getTrigger(r));
        await pickDate(r, new Date(2025, 2, 25), persian);
      
        await expect.element(getInput(r)).toHaveValue(`01.01.1404${RANGE_SEPARATOR}05.01.1404`);
      });
    });
  });
  
  
  describe('Accessibility', () => {
    describe('APG', () => {
      const RANGE_TEXT = `10.01.2026${RANGE_SEPARATOR}15.01.2026`;

      const waitForAnimations = () => Promise.allSettled(document.getAnimations().map((animation) => animation.finished));

      const openByKeyboard = async (r: RenderResult) => {
        getTrigger(r).focus();
        await userEvent.keyboard('{Enter}');
        await expect.element(getCalendarRoot(r)).toBeInTheDocument();
        await waitForAnimations();
      };

      const pressEnterOn = async (r: RenderResult, date: Date) => {
        getCell(r, date).element().focus();
        await userEvent.keyboard('{Enter}');
      };

      it('announces both dates in one textbox named through Label', async () => {
        const r = render(
          <>
            <Label htmlFor='stay'>Stay</Label>
            <DateRangeFieldTest defaultValue={['2026-01-10', '2026-01-15']} inputProps={{ id: 'stay' }} />
          </>
        );

        await expect.element(r.getByRole('textbox', { name: 'Stay' })).toHaveValue(RANGE_TEXT);
      });

      it('exposes the popup as a dialog with the given name', async () => {
        const r = render(<DateRangeFieldTest calendarProps={{ 'aria-label': 'Choose stay' }} />);

        await expect.element(getTrigger(r)).toHaveAttribute('aria-haspopup', 'dialog');
        await userEvent.click(getTrigger(r));

        await expect.element(r.getByRole('dialog', { name: 'Choose stay' })).toBe(getCalendarRoot(r));
      });

      it('moves the focus to the start of the typed range on open', async () => {
        const r = render(<DateRangeFieldTest />);

        await userEvent.type(getInput(r), `10.03.2026${RANGE_SEPARATOR}15.03.2026`);
        await openByKeyboard(r);

        await expect.element(getCell(r, new Date(2026, 2, 10))).toHaveFocus();
      });

      it('moves the focus to today on open when the field is empty', async () => {
        const r = render(<DateRangeFieldTest />);

        await openByKeyboard(r);

        await expect.element(getCell(r, new Date(2026, 0, 1))).toHaveFocus();
      });

      it('returns the focus to the trigger on Escape from the grid', async () => {
        const r = render(<DateRangeFieldTest defaultValue={['2026-01-10', '2026-01-15']} />);

        await openByKeyboard(r);
        getCell(r, new Date(2026, 0, 12)).element().focus();
        await userEvent.keyboard('{Escape}');

        await expect.poll(() => r.queryByTestId(TESTID_CALENDAR_ROOT)).toBeNull();
        await expect.element(getTrigger(r)).toHaveFocus();
        await expect.element(getInput(r)).toHaveValue(RANGE_TEXT);
      });

      it('keeps the popup open after the start and closes after the end, returning the focus to the trigger', async () => {
        const r = render(<DateRangeFieldTest />);

        await openByKeyboard(r);
        await pressEnterOn(r, new Date(2026, 0, 10));
        await expect.element(getInput(r)).toHaveValue('10.01.2026');
        await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
        await pressEnterOn(r, new Date(2026, 0, 15));

        await expect.element(getInput(r)).toHaveValue(RANGE_TEXT);
        await expect.poll(() => r.queryByTestId(TESTID_CALENDAR_ROOT)).toBeNull();
        await expect.element(getTrigger(r)).toHaveFocus();
      });

      it('keeps the popup open while an edge of a complete range moves with Shift and arrows', async () => {
        const r = render(<DateRangeFieldTest defaultValue={['2026-01-10', '2026-01-15']} />);

        await openByKeyboard(r);
        await expect.element(getCell(r, new Date(2026, 0, 10))).toHaveFocus();
        await userEvent.keyboard('{Shift>}{ArrowRight}{/Shift}');

        await expect.element(getInput(r)).toHaveValue(`11.01.2026${RANGE_SEPARATOR}15.01.2026`);
        await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
        await expect.element(getCell(r, new Date(2026, 0, 11))).toHaveFocus();
      });

      it('closes after the end picked by a click', async () => {
        const r = render(<DateRangeFieldTest />);

        await openByKeyboard(r);
        await pickDate(r, new Date(2026, 0, 10));
        await pickDate(r, new Date(2026, 0, 15));

        await expect.element(getInput(r)).toHaveValue(RANGE_TEXT);
        await expect.poll(() => r.queryByTestId(TESTID_CALENDAR_ROOT)).toBeNull();
        await expect.element(getTrigger(r)).toHaveFocus();
      });

      it('leaves aria-invalid to the user', async () => {
        const r = render(<DateRangeFieldTest />);

        await userEvent.type(getInput(r), '10.01.2026 – 15.01');
        await expect.element(getInput(r)).not.toHaveAttribute('aria-invalid');

        r.rerender(<DateRangeFieldTest inputProps={{ 'aria-invalid': true }} />);

        await expect.element(getInput(r)).toHaveAttribute('aria-invalid', 'true');
      });

      it('disables the input and the trigger', async () => {
        const r = render(<DateRangeFieldTest disabled defaultValue={['2026-01-10', '2026-01-15']} />);

        await expect.element(getInput(r)).toBeDisabled();
        await expect.element(getTrigger(r)).toBeDisabled();
      });

      it('does not change a read-only input from the calendar', async () => {
        const r = render(<DateRangeFieldTest defaultValue={['2026-01-10', '2026-01-15']} inputProps={{ readOnly: true }} />);

        await openByKeyboard(r);
        await pressEnterOn(r, new Date(2026, 0, 20));

        expect(getInput(r)).toHaveValue(RANGE_TEXT);
      });

      it('shows a read-only field in a read-only grid that does not pick', async () => {
        const onChangeValue = vi.fn();
        const r = render(<DateRangeFieldTest readOnly defaultValue={['2026-01-10', '2026-01-15']} onChangeValue={onChangeValue} />);

        await expect.element(getInput(r)).toHaveAttribute('readonly');
        await openByKeyboard(r);
        await expect.element(r.getByRole('grid')).toHaveAttribute('aria-readonly', 'true');
        await pressEnterOn(r, new Date(2026, 0, 20));
        await pressEnterOn(r, new Date(2026, 0, 22));

        await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
        expect(getInput(r)).toHaveValue(RANGE_TEXT);
        expect(onChangeValue).not.toHaveBeenCalled();
      });
    });
  });
});