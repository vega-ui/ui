import { FC, useState } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, within, type RenderResult } from '@testing-library/react';
import { page, userEvent } from 'vitest/browser';

import { DateTimeField, type DateTimeFieldProps } from '../DateTimeField';
import {
  DateTimeFieldInput,
  DateTimeFieldCalendar,
  DateTimeFieldColumn,
  DateTimeFieldTime,
  DateTimeFieldTrigger,
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
import { TimeFieldOption } from '../../TimeField';
import { Button } from '../../Button';
import { WheelPicker, WheelPickerFace } from '../../WheelPicker';
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
        <DateTimeFieldTrigger square aria-label='Open calendar' data-testid={TESTID_TRIGGER} />
      </PopoverTrigger>
      <PopoverContent role='dialog' aria-label='Choose date and time' data-testid={TESTID_CONTENT}>
        <DateTimeFieldCalendar data-testid={TESTID_CALENDAR} style={{ width: 320 }} {...calendarProps}>
          <CalendarHeader>
            <CalendarPrevButton square aria-label='Previous month'>
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
            <CalendarNextButton square aria-label='Next month'>
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
        <span id='time-label'>Time</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button id='time-button' aria-labelledby='time-label time-button' aria-haspopup='dialog'>
              <DateTimeFieldTime placeholder='--:--' />
            </Button>
          </PopoverTrigger>
          <PopoverContent role='dialog' aria-labelledby='time-label'>
            <WheelPicker aria-labelledby='time-label'>
              <DateTimeFieldColumn unit='hour' aria-label='Hours' autoFocus><TimeFieldOption><WheelPickerFace /></TimeFieldOption></DateTimeFieldColumn>
              <DateTimeFieldColumn unit='minute' aria-label='Minutes'><TimeFieldOption><WheelPickerFace /></TimeFieldOption></DateTimeFieldColumn>
            </WheelPicker>
          </PopoverContent>
        </Popover>
      </PopoverContent>
    </Popover>
  </DateTimeField>
);

const getInput = (view: RenderResult) =>
  view.getByTestId(TESTID_INPUT) as HTMLInputElement;
const getTrigger = (view: RenderResult) => view.getByTestId(TESTID_TRIGGER);
const getContent = (view: RenderResult) => view.getByTestId(TESTID_CONTENT);
const getCalendar = (view: RenderResult) => view.getByTestId(TESTID_CALENDAR);
const getCell = (view: RenderResult, date: Date, calendar: CalendarSystem = gregorianCalendar) =>
  page.elementLocator(getContent(view)).getByRole('gridcell', { name: formatCalendarDate(calendar, formatISODate(date), 'en-US', { dateStyle: 'full' }), exact: true });

const pickDate = async (view: RenderResult, date: Date, calendar?: CalendarSystem) => {
  await Promise.allSettled(getContent(view).getAnimations().map((animation) => animation.finished));
  const cell = getCell(view, date, calendar);
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
        const view = render(<ControlledDateTimeFieldTest />);

        await userEvent.type(getInput(view), '15.01.2026, 12:30');

        await expect.element(getInput(view)).toHaveValue('15.01.2026, 12:30');
        await userEvent.click(getTrigger(view));
        await expect.element(getCell(view, new Date(2026, 0, 15))).toHaveAttribute('aria-selected', 'true');
      });

      it('dispatches input for a whole value the parent accepts', async () => {
        cleanup();
        const view = render(<ControlledDateTimeFieldTest />);
        const onInput = vi.fn();
        getInput(view).addEventListener('input', onInput);

        await userEvent.fill(getInput(view), '15.01.2026, 12:30');

        expect(onInput).toHaveBeenCalled();
      });

      it('selects the date of a value set outside', async () => {
        cleanup();
        const view = render(<ControlledDateTimeFieldTest />);

        await userEvent.click(view.getByRole('button', { name: 'Fill' }));

        await expect.element(getInput(view)).toHaveValue('15.01.2026, 12:30');
        await userEvent.click(getTrigger(view));
        await expect.element(getCell(view, new Date(2026, 0, 15))).toHaveAttribute('aria-selected', 'true');
      });
    });

    let view: RenderResult;
    const onInput = vi.fn();
    
    beforeEach(() => {
      view = render(<DateTimeFieldTest onInput={onInput} />);
    });
    
    it('selecting date keeps time and writes full datetime into input', async () => {
      const input = getInput(view);
      
      await userEvent.type(input, '15.01.2026, 12:30');
      
      await userEvent.click(getTrigger(view));
      await pickDate(view, new Date(2026, 0, 20));
      
      expect(input).toHaveValue('20.01.2026, 12:30');
      expect(onInput).toHaveBeenCalled();
    });
    
    it('respects min/max when selecting date via calendar', async () => {
      const min = '2026-01-10T00:00';
      const max = '2026-01-20T00:00';
      
      view.rerender(<DateTimeFieldTest min={min} max={max} />);
      
      await userEvent.click(getTrigger(view));
      
      await expect
        .element(getCell(view, new Date(2026, 0, 5)))
        .toBeDisabled();
      await expect
        .element(getCell(view, new Date(2026, 0, 25)))
        .toBeDisabled();
    });

    describe('form', () => {
      it('restores the default value on form.reset()', async () => {
        cleanup();
        const view = render(
          <form data-testid='form'>
            <DateTimeFieldTest defaultValue='2026-01-15T12:30' />
          </form>
        );

        await userEvent.clear(getInput(view));
        (view.getByTestId('form') as HTMLFormElement).reset();

        await expect.element(getInput(view)).toHaveValue('15.01.2026, 12:30');
      });
    });

    describe('wheels', () => {
      it('turns the time on the wheels and keeps the date', async () => {
        cleanup();
        const view = render(<DateTimeFieldTest defaultValue='2026-03-15T09:30' />);

        await userEvent.click(getTrigger(view));
        await userEvent.click(view.getByRole('button', { name: 'Time 09:30' }));
        await expect.element(view.getByRole('spinbutton', { name: 'Hours' })).toHaveFocus();
        await userEvent.keyboard('{ArrowUp}');

        await expect.element(getInput(view)).toHaveValue('15.03.2026, 10:30');
        await expect.element(view.getByRole('button', { name: 'Time 10:30' })).toBeInTheDocument();
      });

      it('takes today for the date when the wheels turn an empty field', async () => {
        cleanup();
        const view = render(<DateTimeFieldTest today='2026-01-15' />);

        await userEvent.click(getTrigger(view));
        await userEvent.click(view.getByRole('button', { name: 'Time --:--' }));
        await expect.element(view.getByRole('spinbutton', { name: 'Hours' })).toHaveFocus();
        await userEvent.keyboard('{ArrowUp}');

        await expect.element(getInput(view)).toHaveValue('15.01.2026, 01:00');
      });
    });
  });

  describe('Error handling', () => {
    it('makes a date without a complete time invalid with the message of the browser', async () => {
      const view = render(<DateTimeFieldTest />);

      await userEvent.type(getInput(view), '15.01.2026, 1');

      expect(getInput(view).validity.customError).toBe(true);
      expect(getInput(view).validationMessage).not.toBe('');

      await userEvent.type(getInput(view), '2:30');

      expect(getInput(view).validity.valid).toBe(true);
    });
  });
  
  describe('Edge Cases', () => {
    it('sizes the calendar and the time wheels by the field', async () => {
      const view = render(<DateTimeFieldTest size='lg' defaultValue='2026-01-15T12:30' />);

      getTrigger(view).focus();
      await userEvent.keyboard('{Enter}');
      await expect.element(getCalendar(view).querySelector<HTMLElement>('[data-size]')).toHaveAttribute('data-size', 'lg');

      view.getByRole('button', { name: 'Time 12:30' }).focus();
      await userEvent.keyboard('{Enter}');
      await expect.element(view.getByRole('group', { name: 'Time' })).toHaveAttribute('data-size', 'lg');
    });

    describe('typing', () => {
      it('steps the time segment at the caret with arrow keys', async () => {
        const view = render(<DateTimeFieldTest timeStep={15} />);
        const input = getInput(view);
      
        await userEvent.type(input, '15.01.2026, 12:30');
        input.setSelectionRange(16, 16);
        await userEvent.keyboard('{ArrowUp}');
      
        await expect.element(input).toHaveValue('15.01.2026, 12:45');
      });
    
    });
  
    describe('field state follows the input', () => {
      const expectSelected = async (view: RenderResult, date: Date) => {
        await userEvent.click(getTrigger(view));
        await expect.element(getCell(view, date)).toHaveAttribute('aria-selected', 'true');
      };

      const expectNotSelected = async (view: RenderResult, date: Date) => {
        await userEvent.click(getTrigger(view));
        await expect.element(getCalendar(view)).toBeInTheDocument();
        await expect.element(getCell(view, date)).not.toHaveAttribute('aria-selected', 'true');
      };

      it('clears the selection and the time when the text is cleared', async () => {
        const view = render(<DateTimeFieldTest />);

        await userEvent.type(getInput(view), '15.01.2026, 12:30');
        await userEvent.clear(getInput(view));

        await expectNotSelected(view, new Date(2026, 0, 15));
        await pickDate(view, new Date(2026, 0, 20));
        await expect.element(getInput(view)).toHaveValue('20.01.2026, 00:00');
      });

      it('takes the date and the time of defaultValue', async () => {
        const view = render(<DateTimeFieldTest defaultValue='2026-01-15T12:30' />);

        await expectSelected(view, new Date(2026, 0, 15));
        await pickDate(view, new Date(2026, 0, 20));
        await expect.element(getInput(view)).toHaveValue('20.01.2026, 12:30');
      });

      it('follows the text restored by a reset button', async () => {
        const view = render(
          <form>
            <DateTimeFieldTest defaultValue='2026-01-10T08:15' />
            <button type='reset'>Reset</button>
          </form>
        );

        await userEvent.clear(getInput(view));
        await userEvent.type(getInput(view), '15.01.2026, 12:30');
        await userEvent.click(view.getByRole('button', { name: 'Reset' }));

        await expect.element(getInput(view)).toHaveValue('10.01.2026, 08:15');
        await expectSelected(view, new Date(2026, 0, 10));
      });
    });

    describe('calendar systems', () => {
      it('writes a picked Persian day and keeps the time', async () => {
        const persian = createCalendarSystem('persian');
        const view = render(<DateTimeFieldTest calendar={persian} />);
      
        await userEvent.type(getInput(view), '01.01.1404, 12:30');
        await userEvent.click(getTrigger(view));
        await pickDate(view, new Date(2025, 2, 22), persian);
      
        await expect.element(getInput(view)).toHaveValue('02.01.1404, 12:30');
      });
    });
  });
  
  
  describe('Accessibility', () => {
    describe('APG', () => {
      const waitForAnimations = (view: RenderResult) => Promise.allSettled(getContent(view).getAnimations().map((animation) => animation.finished));

      const openByKeyboard = async (view: RenderResult) => {
        getTrigger(view).focus();
        await userEvent.keyboard('{Enter}');
        await expect.element(getCalendar(view)).toBeInTheDocument();
        await waitForAnimations(view);
      };

      const pressEnterOn = async (view: RenderResult, date: Date) => {
        getCell(view, date).element().focus();
        await userEvent.keyboard('{Enter}');
      };

      it('closes only the time wheels opened from the calendar dialog on Escape', async () => {
        const view = render(<DateTimeFieldTest defaultValue='2026-01-15T12:30' />);

        await expect.element(getTrigger(view)).toHaveAttribute('aria-haspopup', 'dialog');
        await userEvent.click(getTrigger(view));
        await expect.element(view.getByRole('dialog')).toBe(view.getByTestId(TESTID_CONTENT));

        within(view.getByRole('dialog')).getByRole('button', { name: 'Time 12:30' }).focus();
        await userEvent.keyboard('{Enter}');
        await expect.element(view.getByRole('dialog', { name: 'Time' })).toBeVisible();
        await userEvent.keyboard('{Escape}');

        await expect.poll(() => view.queryByRole('dialog', { name: 'Time' })).toBeNull();
        await expect.element(getContent(view)).toBeVisible();
        await expect.element(view.getByRole('button', { name: 'Time 12:30' })).toHaveFocus();
      });

      it('moves the focus to the typed date in the grid on open', async () => {
        const view = render(<DateTimeFieldTest />);

        await userEvent.type(getInput(view), '15.03.2026, 12:30');
        await openByKeyboard(view);

        await expect.element(getCell(view, new Date(2026, 2, 15))).toHaveFocus();
      });

      it('returns the focus to the trigger on Escape from the grid', async () => {
        const view = render(<DateTimeFieldTest defaultValue='2026-01-15T12:30' />);

        await openByKeyboard(view);
        getCell(view, new Date(2026, 0, 15)).element().focus();
        await userEvent.keyboard('{Escape}');

        await expect.poll(() => view.queryByTestId(TESTID_CALENDAR)).toBeNull();
        await expect.element(getTrigger(view)).toHaveFocus();
        await expect.element(getInput(view)).toHaveValue('15.01.2026, 12:30');
      });

      it('writes the day picked with Enter keeping the time and stays open for the time', async () => {
        const view = render(<DateTimeFieldTest defaultValue='2026-01-15T12:30' />);

        await openByKeyboard(view);
        await expect.element(getCell(view, new Date(2026, 0, 15))).toHaveFocus();
        await pressEnterOn(view, new Date(2026, 0, 20));

        await expect.element(getInput(view)).toHaveValue('20.01.2026, 12:30');
        await expect.element(getCell(view, new Date(2026, 0, 20))).toHaveFocus();

        await userEvent.keyboard('{Escape}');
        await expect.poll(() => view.queryByTestId(TESTID_CALENDAR)).toBeNull();
        await expect.element(getTrigger(view)).toHaveFocus();
      });

      it('stays open after a day picked by a click', async () => {
        const view = render(<DateTimeFieldTest />);

        await openByKeyboard(view);
        await pickDate(view, new Date(2026, 0, 20));

        await expect.element(getInput(view)).toHaveValue('20.01.2026, 00:00');
        await expect.element(getCalendar(view)).toBeInTheDocument();
      });

      it('leaves aria-invalid to the user', async () => {
        const view = render(<DateTimeFieldTest />);

        await userEvent.type(getInput(view), '15.01.2026, 1');
        await expect.element(getInput(view)).not.toHaveAttribute('aria-invalid');

        view.rerender(<DateTimeFieldTest inputProps={{ 'aria-invalid': true }} />);

        await expect.element(getInput(view)).toHaveAttribute('aria-invalid', 'true');
      });

      it('disables the input and the trigger', async () => {
        const view = render(<DateTimeFieldTest disabled defaultValue='2026-01-15T12:30' />);

        await expect.element(getInput(view)).toBeDisabled();
        await expect.element(getTrigger(view)).toBeDisabled();
      });

      it('does not change a read-only input from the calendar', async () => {
        const view = render(<DateTimeFieldTest defaultValue='2026-01-15T12:30' inputProps={{ readOnly: true }} />);

        await openByKeyboard(view);
        await pressEnterOn(view, new Date(2026, 0, 20));

        expect(getInput(view)).toHaveValue('15.01.2026, 12:30');
      });

      it('does not step the time of a read-only input with the arrows', async () => {
        const onChangeValue = vi.fn();
        const view = render(<DateTimeFieldTest readOnly defaultValue='2026-01-15T12:30' onChangeValue={onChangeValue} />);
        const input = getInput(view);
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);

        await userEvent.keyboard('{ArrowUp}');

        expect(input).toHaveValue('15.01.2026, 12:30');
        expect(onChangeValue).not.toHaveBeenCalled();
      });

      it('shows a read-only field in a read-only grid that does not pick', async () => {
        const onChangeValue = vi.fn();
        const view = render(<DateTimeFieldTest readOnly defaultValue='2026-01-15T12:30' onChangeValue={onChangeValue} />);

        await expect.element(getInput(view)).toHaveAttribute('readonly');
        await openByKeyboard(view);
        await expect.element(view.getByRole('grid')).toHaveAttribute('aria-readonly', 'true');
        await pressEnterOn(view, new Date(2026, 0, 20));

        await expect.element(getContent(view)).toHaveAttribute('data-status', 'open');
        expect(getInput(view)).toHaveValue('15.01.2026, 12:30');
        expect(onChangeValue).not.toHaveBeenCalled();
      });
    });
  });
});