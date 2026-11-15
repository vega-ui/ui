import { FC, useState } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';
import { page, userEvent } from 'vitest/browser';

import { DateTimeField, type DateTimeFieldProps } from '../DateTimeField';
import {
  DateTimeFieldInput,
  DateTimeFieldCalendar,
  DateTimeFieldTriggerIconButton,
  type DateTimeFieldInputProps,
  type DateTimeFieldCalendarProps,
} from '../components';

import { Popover, PopoverTrigger, PopoverContent, type PopoverProps } from '../../Popover';
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
import { Icon } from '../../Icon';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { formatISODate } from '@vega-ui/utils';
import { createCalendarSystem, formatCalendarDate, gregorianCalendar, type CalendarSystem } from '@vega-ui/i18n';

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

const TESTID_INPUT = 'datetimefield-input';
const TESTID_TRIGGER = 'datetimefield-trigger';
const TESTID_CONTENT = 'datetimefield-popover-content';
const TESTID_CALENDAR = 'datetimefield-calendar';

const FORMAT = 'dd.MM.yyyy';
const SEPARATOR = ', ';

interface DateTimeFieldTestProps extends Partial<DateTimeFieldProps> {
  inputProps?: DateTimeFieldInputProps
  popoverProps?: PopoverProps
  calendarProps?: DateTimeFieldCalendarProps
}

const DateTimeFieldTest: FC<DateTimeFieldTestProps> = ({
  onInput,
  onChange,
  inputProps,
  popoverProps,
  calendarProps,
  ...props
}) => (
  <DateTimeField dateFormat={FORMAT} separator={SEPARATOR} {...props}>
    <DateTimeFieldInput
      data-testid={TESTID_INPUT}
      onInput={onInput}
      onChange={onChange}
      {...inputProps}
    />
    <Popover {...popoverProps}>
      <PopoverTrigger asChild>
        <DateTimeFieldTriggerIconButton aria-label='Open calendar' data-testid={TESTID_TRIGGER} />
      </PopoverTrigger>
      <PopoverContent data-testid={TESTID_CONTENT}>
        <DateTimeFieldCalendar data-testid={TESTID_CALENDAR} style={{ width: 320 }} {...calendarProps}>
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
        </DateTimeFieldCalendar>
      </PopoverContent>
    </Popover>
  </DateTimeField>
);

const getInput = (r: RenderResult) =>
  r.getByTestId(TESTID_INPUT) as HTMLInputElement;
const getTrigger = (r: RenderResult) => r.getByTestId(TESTID_TRIGGER);
const getContent = (r: RenderResult) => r.getByTestId(TESTID_CONTENT);
const getCalendar = (r: RenderResult) => r.getByTestId(TESTID_CALENDAR);
const getCell = (r: RenderResult, date: Date, calendar: CalendarSystem = gregorianCalendar) =>
  page.elementLocator(getContent(r)).getByRole('gridcell', { name: formatCalendarDate(calendar, formatISODate(date), 'en-US', { dateStyle: 'full' }), exact: true });

const pickDate = async (r: RenderResult, date: Date, calendar?: CalendarSystem) => {
  await Promise.allSettled(document.getAnimations().map((animation) => animation.finished));
  const cell = getCell(r, date, calendar);
  await userEvent.click(cell);
};

describe('DateTimeField', () => {
  describe('Critical User Paths', () => {
    describe('controlled input', () => {
      const ControlledDateTimeFieldTest: FC<Partial<DateTimeFieldProps>> = (props) => {
        const [value, setValue] = useState('');

        return (
          <>
            <DateTimeFieldTest {...props} value={value} onChangeValue={setValue} />
            <button type='button' onClick={() => setValue('2026-01-15T12:30')}>Fill</button>
          </>
        );
      };

      it('keeps the typed text and selects the date', async () => {
        cleanup();
        const r = render(<ControlledDateTimeFieldTest />);

        await userEvent.type(getInput(r), '15.01.2026, 12:30');

        await expect.element(getInput(r)).toHaveValue('15.01.2026, 12:30');
        await userEvent.click(getTrigger(r));
        await expect.element(getCell(r, new Date(2026, 0, 15))).toHaveAttribute('aria-selected', 'true');
      });

      it('dispatches input for a whole value the parent accepts', async () => {
        cleanup();
        const r = render(<ControlledDateTimeFieldTest />);
        const onInput = vi.fn();
        getInput(r).addEventListener('input', onInput);

        await userEvent.fill(getInput(r), '15.01.2026, 12:30');

        expect(onInput).toHaveBeenCalled();
      });

      it('selects the date of a value set outside', async () => {
        cleanup();
        const r = render(<ControlledDateTimeFieldTest />);

        await userEvent.click(r.getByRole('button', { name: 'Fill' }));

        await expect.element(getInput(r)).toHaveValue('15.01.2026, 12:30');
        await userEvent.click(getTrigger(r));
        await expect.element(getCell(r, new Date(2026, 0, 15))).toHaveAttribute('aria-selected', 'true');
      });
    });

    let r: RenderResult;
    const onInput = vi.fn();
    
    beforeEach(() => {
      r = render(<DateTimeFieldTest onInput={onInput} />);
    });
    
    it('selecting date keeps time and writes full datetime into input', async () => {
      const input = getInput(r);
      
      await userEvent.type(input, '15.01.2026, 12:30');
      
      await userEvent.click(getTrigger(r));
      await pickDate(r, new Date(2026, 0, 20));
      
      expect(input).toHaveValue('20.01.2026, 12:30');
      expect(onInput).toHaveBeenCalled();
    });
    
    it('respects min/max when selecting date via calendar', async () => {
      const min = '2026-01-10T00:00';
      const max = '2026-01-20T00:00';
      
      r.rerender(<DateTimeFieldTest min={min} max={max} />);
      
      await userEvent.click(getTrigger(r));
      
      await expect
        .element(getCell(r, new Date(2026, 0, 5)))
        .toBeDisabled();
      await expect
        .element(getCell(r, new Date(2026, 0, 25)))
        .toBeDisabled();
    });

    describe('form', () => {
      it('restores the default value on form.reset()', async () => {
        cleanup();
        const r = render(
          <form data-testid='form'>
            <DateTimeFieldTest defaultValue='2026-01-15T12:30' />
          </form>
        );

        await userEvent.clear(getInput(r));
        (r.getByTestId('form') as HTMLFormElement).reset();

        await expect.element(getInput(r)).toHaveValue('15.01.2026, 12:30');
      });
    });
  });

  describe('Error handling', () => {
    it('makes a date without a complete time invalid with the message of the browser', async () => {
      const r = render(<DateTimeFieldTest />);

      await userEvent.type(getInput(r), '15.01.2026, 1');

      expect(getInput(r).validity.customError).toBe(true);
      expect(getInput(r).validationMessage).not.toBe('');

      await userEvent.type(getInput(r), '2:30');

      expect(getInput(r).validity.valid).toBe(true);
    });
  });
  
  describe('Edge Cases', () => {
    describe('typing', () => {
      it('steps the time segment at the caret with arrow keys', async () => {
        const r = render(<DateTimeFieldTest timeStep={15} />);
        const input = getInput(r);
      
        await userEvent.type(input, '15.01.2026, 12:30');
        input.setSelectionRange(16, 16);
        await userEvent.keyboard('{ArrowUp}');
      
        await expect.element(input).toHaveValue('15.01.2026, 12:45');
      });
    
    });
  
    describe('field state follows the input', () => {
      const expectSelected = async (r: RenderResult, date: Date) => {
        await userEvent.click(getTrigger(r));
        await expect.element(getCell(r, date)).toHaveAttribute('aria-selected', 'true');
      };

      const expectNotSelected = async (r: RenderResult, date: Date) => {
        await userEvent.click(getTrigger(r));
        await expect.element(getCalendar(r)).toBeInTheDocument();
        await expect.element(getCell(r, date)).not.toHaveAttribute('aria-selected', 'true');
      };

      it('clears the selection and the time when the text is cleared', async () => {
        const r = render(<DateTimeFieldTest />);

        await userEvent.type(getInput(r), '15.01.2026, 12:30');
        await userEvent.clear(getInput(r));

        await expectNotSelected(r, new Date(2026, 0, 15));
        await pickDate(r, new Date(2026, 0, 20));
        await expect.element(getInput(r)).toHaveValue('20.01.2026, 00:00');
      });

      it('takes the date and the time of defaultValue', async () => {
        const r = render(<DateTimeFieldTest defaultValue='2026-01-15T12:30' />);

        await expectSelected(r, new Date(2026, 0, 15));
        await pickDate(r, new Date(2026, 0, 20));
        await expect.element(getInput(r)).toHaveValue('20.01.2026, 12:30');
      });

      it('follows the text restored by a reset button', async () => {
        const r = render(
          <form>
            <DateTimeFieldTest defaultValue='2026-01-10T08:15' />
            <button type='reset'>Reset</button>
          </form>
        );

        await userEvent.clear(getInput(r));
        await userEvent.type(getInput(r), '15.01.2026, 12:30');
        await userEvent.click(r.getByRole('button', { name: 'Reset' }));

        await expect.element(getInput(r)).toHaveValue('10.01.2026, 08:15');
        await expectSelected(r, new Date(2026, 0, 10));
      });
    });

    describe('calendar systems', () => {
      it('writes a picked Persian day and keeps the time', async () => {
        const persian = createCalendarSystem('persian');
        const r = render(<DateTimeFieldTest calendar={persian} />);
      
        await userEvent.type(getInput(r), '01.01.1404, 12:30');
        await userEvent.click(getTrigger(r));
        await pickDate(r, new Date(2025, 2, 22), persian);
      
        await expect.element(getInput(r)).toHaveValue('02.01.1404, 12:30');
      });
    });
  });
  
  
  describe('Accessibility', () => {
    describe('APG', () => {
      const waitForAnimations = () => Promise.allSettled(document.getAnimations().map((animation) => animation.finished));

      const openByKeyboard = async (r: RenderResult) => {
        getTrigger(r).focus();
        await userEvent.keyboard('{Enter}');
        await expect.element(getCalendar(r)).toBeInTheDocument();
        await waitForAnimations();
      };

      const pressEnterOn = async (r: RenderResult, date: Date) => {
        getCell(r, date).element().focus();
        await userEvent.keyboard('{Enter}');
      };

      it('exposes the popup as a dialog with the given name', async () => {
        const r = render(<DateTimeFieldTest calendarProps={{ 'aria-label': 'Choose meeting date' }} />);

        await expect.element(getTrigger(r)).toHaveAttribute('aria-haspopup', 'dialog');
        await userEvent.click(getTrigger(r));

        await expect.element(r.getByRole('dialog', { name: 'Choose meeting date' })).toBe(getCalendar(r));
      });

      it('moves the focus to the typed date in the grid on open', async () => {
        const r = render(<DateTimeFieldTest />);

        await userEvent.type(getInput(r), '15.03.2026, 12:30');
        await openByKeyboard(r);

        await expect.element(getCell(r, new Date(2026, 2, 15))).toHaveFocus();
      });

      it('returns the focus to the trigger on Escape from the grid', async () => {
        const r = render(<DateTimeFieldTest defaultValue='2026-01-15T12:30' />);

        await openByKeyboard(r);
        getCell(r, new Date(2026, 0, 15)).element().focus();
        await userEvent.keyboard('{Escape}');

        await expect.poll(() => r.queryByTestId(TESTID_CALENDAR)).toBeNull();
        await expect.element(getTrigger(r)).toHaveFocus();
        await expect.element(getInput(r)).toHaveValue('15.01.2026, 12:30');
      });

      it('writes the day picked with Enter keeping the time, closes and returns the focus to the trigger', async () => {
        const r = render(<DateTimeFieldTest defaultValue='2026-01-15T12:30' />);

        await openByKeyboard(r);
        await expect.element(getCell(r, new Date(2026, 0, 15))).toHaveFocus();
        await pressEnterOn(r, new Date(2026, 0, 20));

        await expect.element(getInput(r)).toHaveValue('20.01.2026, 12:30');
        await expect.poll(() => r.queryByTestId(TESTID_CALENDAR)).toBeNull();
        await expect.element(getTrigger(r)).toHaveFocus();
      });

      it('closes after a day picked by a click', async () => {
        const r = render(<DateTimeFieldTest />);

        await openByKeyboard(r);
        await pickDate(r, new Date(2026, 0, 20));

        await expect.element(getInput(r)).toHaveValue('20.01.2026, 00:00');
        await expect.poll(() => r.queryByTestId(TESTID_CALENDAR)).toBeNull();
        await expect.element(getTrigger(r)).toHaveFocus();
      });

      it('leaves aria-invalid to the user', async () => {
        const r = render(<DateTimeFieldTest />);

        await userEvent.type(getInput(r), '15.01.2026, 1');
        await expect.element(getInput(r)).not.toHaveAttribute('aria-invalid');

        r.rerender(<DateTimeFieldTest inputProps={{ 'aria-invalid': true }} />);

        await expect.element(getInput(r)).toHaveAttribute('aria-invalid', 'true');
      });

      it('disables the input and the trigger', async () => {
        const r = render(<DateTimeFieldTest disabled defaultValue='2026-01-15T12:30' />);

        await expect.element(getInput(r)).toBeDisabled();
        await expect.element(getTrigger(r)).toBeDisabled();
      });

      it('does not change a read-only input from the calendar', async () => {
        const r = render(<DateTimeFieldTest defaultValue='2026-01-15T12:30' inputProps={{ readOnly: true }} />);

        await openByKeyboard(r);
        await pressEnterOn(r, new Date(2026, 0, 20));

        expect(getInput(r)).toHaveValue('15.01.2026, 12:30');
      });

      it('does not step the time of a read-only input with the arrows', async () => {
        const onChangeValue = vi.fn();
        const r = render(<DateTimeFieldTest readOnly defaultValue='2026-01-15T12:30' onChangeValue={onChangeValue} />);
        const input = getInput(r);
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);

        await userEvent.keyboard('{ArrowUp}');

        expect(input).toHaveValue('15.01.2026, 12:30');
        expect(onChangeValue).not.toHaveBeenCalled();
      });

      it('shows a read-only field in a read-only grid that does not pick', async () => {
        const onChangeValue = vi.fn();
        const r = render(<DateTimeFieldTest readOnly defaultValue='2026-01-15T12:30' onChangeValue={onChangeValue} />);

        await expect.element(getInput(r)).toHaveAttribute('readonly');
        await openByKeyboard(r);
        await expect.element(r.getByRole('grid')).toHaveAttribute('aria-readonly', 'true');
        await pressEnterOn(r, new Date(2026, 0, 20));

        await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
        expect(getInput(r)).toHaveValue('15.01.2026, 12:30');
        expect(onChangeValue).not.toHaveBeenCalled();
      });
    });
  });
});