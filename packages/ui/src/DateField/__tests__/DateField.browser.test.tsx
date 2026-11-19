import { FC, useState } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';

import { DateField, type DateFieldProps } from '../DateField';
import { DateFieldInput, DateFieldCalendar, DateFieldTrigger, type DateFieldInputProps, type DateFieldCalendarProps } from '../components';
import { Popover, PopoverTrigger, PopoverContent, type PopoverProps, type PopoverContentProps } from '../../Popover';
import { Icon } from '../../Icon';

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
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { page, userEvent, type Locator } from 'vitest/browser';
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

const TESTID_INPUT = 'datefield-input';
const TESTID_TRIGGER = 'datefield-trigger';
const TESTID_CONTENT = 'datefield-popover-content';
const TESTID_CALENDAR_ROOT = 'datefield-calendar';

const FORMAT = 'dd.MM.yyyy';
const SEPARATOR = '.';

interface DateFieldTestProps extends Partial<DateFieldProps> {
  inputProps?: DateFieldInputProps
  popoverProps?: PopoverProps
  contentProps?: PopoverContentProps
  calendarProps?: DateFieldCalendarProps
}

const DateFieldTest: FC<DateFieldTestProps> = ({
  onInput,
  onChange,
  inputProps,
  popoverProps,
  contentProps,
  calendarProps,
  ...props
}) => {
  return (
    <DateField format={FORMAT} separator={SEPARATOR} {...props}>
      <DateFieldInput data-testid={TESTID_INPUT} onInput={onInput} onChange={onChange} {...inputProps} />
      <Popover placement='bottom-end' {...popoverProps}>
        <PopoverTrigger asChild>
          <DateFieldTrigger square aria-label='Open calendar'  data-testid={TESTID_TRIGGER} />
        </PopoverTrigger>
        <PopoverContent data-testid={TESTID_CONTENT} {...contentProps}>
          <DateFieldCalendar data-testid={TESTID_CALENDAR_ROOT} style={{ width: 320 }} {...calendarProps}>
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
          </DateFieldCalendar>
        </PopoverContent>
      </Popover>
    </DateField>
  );
};

const getInput = (r: RenderResult) => r.getByTestId(TESTID_INPUT) as HTMLInputElement;
const getTrigger = (r: RenderResult) => r.getByTestId(TESTID_TRIGGER);
const getContent = (r: RenderResult) => r.getByTestId(TESTID_CONTENT);
const getCalendarRoot = (r: RenderResult) => r.getByTestId(TESTID_CALENDAR_ROOT);
const getCell = (r: RenderResult, date: Date, calendar: CalendarSystem = gregorianCalendar) =>
  page.elementLocator(getContent(r)).getByRole('gridcell', { name: formatCalendarDate(calendar, formatISODate(date), 'en-US', { dateStyle: 'full' }), exact: true });

const pickDate = async (r: RenderResult, date: Date, calendar?: CalendarSystem) => {
  await Promise.allSettled(document.getAnimations().map((animation) => animation.finished));
  const cell = getCell(r, date, calendar)
  await userEvent.click(cell);
};

describe('DateField', () => {
  describe('Critical User Paths', () => {
    describe('controlled input', () => {
      const ControlledDateFieldTest: FC<Partial<DateFieldProps>> = (props) => {
        const [value, setValue] = useState('');

        return (
          <>
            <DateFieldTest {...props} value={value} onChangeValue={setValue} />
            <button type='button' onClick={() => setValue('2026-01-15')}>Fill</button>
          </>
        );
      };

      it('keeps the typed text and selects the date', async () => {
        cleanup();
        const r = render(<ControlledDateFieldTest />);

        await userEvent.type(getInput(r), '15.01.2026');

        await expect.element(getInput(r)).toHaveValue('15.01.2026');
        await userEvent.click(getTrigger(r));
        await expect.element(getCell(r, new Date(2026, 0, 15))).toHaveAttribute('aria-selected', 'true');
      });

      it('dispatches input for a whole value the parent accepts', async () => {
        cleanup();
        const r = render(<ControlledDateFieldTest />);
        const onInput = vi.fn();
        getInput(r).addEventListener('input', onInput);

        await userEvent.fill(getInput(r), '15.01.2026');

        expect(onInput).toHaveBeenCalled();
      });

      it('selects the date of a value set outside', async () => {
        cleanup();
        const r = render(<ControlledDateFieldTest />);

        await userEvent.click(r.getByRole('button', { name: 'Fill' }));

        await expect.element(getInput(r)).toHaveValue('15.01.2026');
        await userEvent.click(getTrigger(r));
        await expect.element(getCell(r, new Date(2026, 0, 15))).toHaveAttribute('aria-selected', 'true');
      });
    });


    let r: RenderResult;
    const onInput = vi.fn();
    
    beforeEach(() => {
      r = render(<DateFieldTest onInput={onInput} />);
    });
    
    it('selecting a day in calendar writes value into native input and dispatches input/change events', async () => {
      await userEvent.click(getTrigger(r));
      await pickDate(r, new Date(2026, 0, 15));
      
      expect(getInput(r)).toHaveValue('15.01.2026');
      expect(onInput).toHaveBeenCalledTimes(1);
    });
    
    it('supports min/max constraints: selecting out-of-range day does not change input value', async () => {
      const min = '2026-01-10';
      const max = '2026-01-20';
      
      r.rerender(<DateFieldTest min={min} max={max} />);
      
      const input = getInput(r);
      expect(input).toHaveValue('');
      
      await userEvent.click(getTrigger(r));
      await expect.element(getCell(r, new Date(2026, 0, 5))).toBeDisabled();
      await expect.element(getCell(r, new Date(2026, 0, 21))).toBeDisabled();
    });
  });
  
  describe('Error handling', () => {
    const getForm = (r: RenderResult) => r.getByTestId('form') as HTMLFormElement;

    it('makes an incomplete date invalid with the message of the browser', async () => {
      const r = render(<form data-testid='form'><DateFieldTest /></form>);

      await userEvent.type(getInput(r), '15.01');

      expect(getInput(r).validity.customError).toBe(true);
      expect(getInput(r).validationMessage).not.toBe('');
      expect(getInput(r).matches(':invalid')).toBe(true);
      expect(getForm(r).checkValidity()).toBe(false);
    });

    it('leaves an empty required field to the native valueMissing check', async () => {
      const r = render(
        <form data-testid='form'>
          <DateFieldTest inputProps={{ required: true }} />
        </form>
      );

      expect(getInput(r).validity.valueMissing).toBe(true);
      expect(getForm(r).checkValidity()).toBe(false);

      await userEvent.type(getInput(r), '15.01.2026');

      expect(getForm(r).checkValidity()).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    describe('calendar navigation follows the WAI-ARIA date picker pattern', () => {
      const getMonthCell = (r: RenderResult, month: string) =>
        page.elementLocator(getContent(r)).getByRole('gridcell', { name: month, exact: true });

      const getYearCell = (r: RenderResult, year: string) =>
        page.elementLocator(getContent(r)).getByRole('gridcell', { name: year, exact: true });

      const press = async (r: RenderResult, button: string) => {
        r.getByRole('button', { name: button }).focus();
        await userEvent.keyboard('{Enter}');
      };

      const open = async (r: RenderResult, typed: string) => {
        await userEvent.type(getInput(r), typed);
        await userEvent.click(getTrigger(r));
      };

      const settle = () => new Promise((resolve) => setTimeout(resolve, 300));

      const isPageVisible = (cell: Locator) => {
        const cellPage = cell.query()?.closest('[data-index]');
        const scroller = cellPage?.parentElement;
        if (!cellPage || !scroller) return false;

        const outer = scroller.getBoundingClientRect();
        const inner = cellPage.getBoundingClientRect();

        return inner.left >= outer.left - 1 && inner.right <= outer.right + 1;
      };

      const isPageCentered = (cell: Locator) => {
        const cellPage = cell.query()?.closest('[data-index]');
        const scroller = cellPage?.parentElement;
        if (!cellPage || !scroller) return false;

        const pages = Array.from(scroller.children);

        return pages.indexOf(cellPage) === Math.floor(pages.length / 2);
      };

      it('keeps the value and moves focus to the same day of the next month', async () => {
        const r = render(<DateFieldTest />);

        await open(r, '15.01.2026');
        await press(r, 'Next month');

        await expect.element(getCell(r, new Date(2026, 1, 15))).toHaveAttribute('tabindex', '0');
        await settle();
        await expect.element(getInput(r)).toHaveValue('15.01.2026');
      });

      it('keeps the value and moves focus to the same day of the previous month', async () => {
        const r = render(<DateFieldTest />);

        await open(r, '15.03.2026');
        await press(r, 'Previous month');

        await expect.element(getCell(r, new Date(2026, 1, 15))).toHaveAttribute('tabindex', '0');
        await settle();
        await expect.element(getInput(r)).toHaveValue('15.03.2026');
      });

      it('keeps the value when a month is picked in the month picker', async () => {
        const r = render(<DateFieldTest />);

        await open(r, '15.01.2026');
        await press(r, 'Open month picker');
        await expect.element(getMonthCell(r, 'January')).toHaveFocus();
        await userEvent.keyboard('{ArrowRight}{ArrowRight}{Enter}');

        await expect.element(getCell(r, new Date(2026, 2, 15))).toHaveAttribute('tabindex', '0');
        await settle();
        await expect.element(getInput(r)).toHaveValue('15.01.2026');
      });

      it('keeps the value when a year is picked in the year picker', async () => {
        const r = render(<DateFieldTest />);

        await open(r, '15.01.2026');
        await press(r, 'Open year picker');
        await expect.element(getYearCell(r, '2026')).toHaveFocus();
        await userEvent.keyboard('{ArrowRight}{Enter}');

        await expect.element(getCell(r, new Date(2027, 0, 15))).toHaveAttribute('tabindex', '0');
        await settle();
        await expect.element(getInput(r)).toHaveValue('15.01.2026');
      });

      it('keeps the value while scrolling through months', async () => {
        const r = render(<DateFieldTest />);

        await open(r, '15.01.2026');

        const getScroller = () => {
          let element = getCell(r, new Date(2026, 0, 15)).element().parentElement;
          while (element && element.scrollWidth <= element.clientWidth) element = element.parentElement;
          return element;
        };
        await expect.poll(() => getScroller()?.scrollLeft).toBeGreaterThan(0);

        const onChange = vi.fn();
        getInput(r).addEventListener('change', onChange);
        for (let month = 1; month <= 3; month++) {
          const scroller = getScroller()!;
          scroller.scrollBy({ left: scroller.clientWidth, behavior: 'instant' });
          await expect.element(getCell(r, new Date(2026, month, 15))).toHaveAttribute('tabindex', '0');
        }

        await expect.element(getCell(r, new Date(2026, 3, 15))).toHaveAttribute('tabindex', '0');
        await settle();
        await expect.element(getInput(r)).toHaveValue('15.01.2026');
        expect(onChange).not.toHaveBeenCalled();
      });

      it('writes a day picked after navigating', async () => {
        const r = render(<DateFieldTest />);

        await open(r, '15.01.2026');
        await press(r, 'Next month');
        await expect.element(getCell(r, new Date(2026, 1, 15))).toHaveAttribute('tabindex', '0');
        await expect.poll(() => isPageVisible(getCell(r, new Date(2026, 1, 10)))).toBe(true);
        await expect.poll(() => isPageCentered(getCell(r, new Date(2026, 1, 10)))).toBe(true);
        await pickDate(r, new Date(2026, 1, 10));

        await expect.element(getInput(r)).toHaveValue('10.02.2026');
      });

      it('closes on Escape without changing the value', async () => {
        const r = render(<DateFieldTest />);

        await open(r, '15.01.2026');
        await press(r, 'Next month');
        await expect.element(getCell(r, new Date(2026, 1, 15))).toHaveAttribute('tabindex', '0');
        await userEvent.keyboard('{Escape}');

        await expect.poll(() => r.queryByTestId(TESTID_CALENDAR_ROOT)).toBeNull();
        await expect.element(getInput(r)).toHaveValue('15.01.2026');
      });

      it('keeps an empty field empty while navigating', async () => {
        const r = render(<DateFieldTest />);

        await userEvent.click(getTrigger(r));
        await press(r, 'Next month');
        await settle();

        await expect.element(getInput(r)).toHaveValue('');
      });
    });

    describe('typing', () => {
      it('shows and picks a date with a two-digit year', async () => {
        const r = render(<DateFieldTest format='MM/dd/yy' separator='/' defaultValue='1999-03-04' />);

        await expect.element(getInput(r)).toHaveValue('03/04/99');
        await userEvent.click(getTrigger(r));
        await expect.element(getCell(r, new Date(1999, 2, 4))).toHaveAttribute('aria-selected', 'true');
        await pickDate(r, new Date(1999, 2, 10));

        await expect.element(getInput(r)).toHaveValue('03/10/99');
      });
    });
  
    describe('field state follows the input', () => {
      const expectSelected = async (r: RenderResult, date: Date) => {
        await userEvent.click(getTrigger(r));
        await expect.element(getCell(r, date)).toHaveAttribute('aria-selected', 'true');
      };

      const expectNotSelected = async (r: RenderResult, date: Date) => {
        await userEvent.click(getTrigger(r));
        await expect.element(getCalendarRoot(r)).toBeInTheDocument();
        await expect.element(getCell(r, date)).not.toHaveAttribute('aria-selected', 'true');
      };

      it('clears the selection when the text is cleared', async () => {
        const r = render(<DateFieldTest />);

        await userEvent.type(getInput(r), '15.01.2026');
        await userEvent.clear(getInput(r));

        await expectNotSelected(r, new Date(2026, 0, 15));
      });

      it('selects a picked day typed again after clearing', async () => {
        const r = render(<DateFieldTest />);

        await userEvent.click(getTrigger(r));
        await pickDate(r, new Date(2026, 0, 15));
        await userEvent.keyboard('{Escape}');
        await expect.poll(() => r.queryByTestId(TESTID_CALENDAR_ROOT)).toBeNull();
        await userEvent.clear(getInput(r));
        await userEvent.type(getInput(r), '15.01.2026');

        await expectSelected(r, new Date(2026, 0, 15));
      });

      it('selects the day of defaultValue', async () => {
        const r = render(<DateFieldTest defaultValue='2026-01-15' />);

        await expectSelected(r, new Date(2026, 0, 15));
      });

      it('follows the text restored by form.reset()', async () => {
        const r = render(
          <form data-testid='form'>
            <DateFieldTest defaultValue='2026-01-10' />
          </form>
        );

        await userEvent.clear(getInput(r));
        await userEvent.type(getInput(r), '15.01.2026');
        (r.getByTestId('form') as HTMLFormElement).reset();

        await expect.element(getInput(r)).toHaveValue('10.01.2026');
        await expectSelected(r, new Date(2026, 0, 10));
      });

      it('clears the selection when a reset button empties the text', async () => {
        const r = render(
          <form>
            <DateFieldTest />
            <button type='reset'>Reset</button>
          </form>
        );

        await userEvent.type(getInput(r), '15.01.2026');
        await userEvent.click(r.getByRole('button', { name: 'Reset' }));

        await expect.element(getInput(r)).toHaveValue('');
        await expectNotSelected(r, new Date(2026, 0, 15));
      });
    });

    describe('calendar systems', () => {
      const persian = createCalendarSystem('persian');
    
      it('accepts a day that exists only in the Persian calendar', async () => {
        const r = render(<DateFieldTest calendar={persian} />);
      
        await userEvent.type(getInput(r), '31.06.1404');
        await userEvent.click(getTrigger(r));
      
        await expect.element(getCell(r, new Date(2025, 8, 22), persian)).toHaveAttribute('aria-selected', 'true');
      });
    
      it('writes a picked day in the Persian calendar', async () => {
        const r = render(<DateFieldTest calendar={persian} />);
      
        await userEvent.type(getInput(r), '01.01.1404');
        await userEvent.click(getTrigger(r));
        await pickDate(r, new Date(2025, 2, 22), persian);
      
        await expect.element(getInput(r)).toHaveValue('02.01.1404');
      });
    
      it('shows the calendar popup in the locale of the field', async () => {
        const r = render(<DateFieldTest locale='de-DE' />);
      
        await userEvent.type(getInput(r), '15.03.2026');
        await userEvent.click(getTrigger(r));
      
        await expect.element(getCalendarRoot(r)).toHaveTextContent('März');
        await expect.element(getCalendarRoot(r)).toHaveAttribute('lang', 'de-DE');
      });
    
    });
  });
  
  
  describe('Accessibility', () => {
    describe('APG', () => {
      const waitForAnimations = () => Promise.allSettled(document.getAnimations().map((animation) => animation.finished));

      const openByKeyboard = async (r: RenderResult) => {
        getTrigger(r).focus();
        await userEvent.keyboard('{Enter}');
        await expect.element(getCalendarRoot(r)).toBeInTheDocument();
        await waitForAnimations();
      };

      const OpenDateFieldTest: FC<DateFieldTestProps> = (props) => {
        const [open, setOpen] = useState(false);

        return (
          <DateFieldTest
            {...props}
            popoverProps={{ open, onChangeOpen: setOpen }}
            calendarProps={{ onChangeValue: () => setOpen(true) }}
          />
        );
      };

      it('makes the trigger a button with the given name that controls the popup', async () => {
        const r = render(<DateFieldTest />);

        const trigger = r.getByRole('button', { name: 'Open calendar' });

        await expect.element(trigger).toHaveAttribute('popovertarget', getContent(r).id);
      });

      it('exposes the popup as a dialog with the given name', async () => {
        const r = render(<DateFieldTest calendarProps={{ 'aria-label': 'Choose date' }} />);

        await expect.element(getTrigger(r)).toHaveAttribute('aria-haspopup', 'dialog');
        await userEvent.click(getTrigger(r));

        await expect.element(r.getByRole('dialog', { name: 'Choose date' })).toBe(getCalendarRoot(r));
      });

      it('moves the focus to the typed date in the grid on open', async () => {
        const r = render(<DateFieldTest />);

        await userEvent.type(getInput(r), '15.03.2026');
        await openByKeyboard(r);

        await expect.element(getCell(r, new Date(2026, 2, 15))).toHaveFocus();
      });

      it('moves the focus to today on open when the field is empty', async () => {
        const r = render(<DateFieldTest />);

        await openByKeyboard(r);

        await expect.element(getCell(r, new Date(2026, 0, 1))).toHaveFocus();
      });

      it('moves the focus to the first available date on open when today is before min', async () => {
        const r = render(<DateFieldTest min='2026-02-10' />);

        await openByKeyboard(r);

        await expect.element(getCell(r, new Date(2026, 1, 10))).toHaveFocus();
      });

      it('moves the focus into the grid on open by a click', async () => {
        const r = render(<DateFieldTest defaultValue='2026-01-15' />);

        await userEvent.click(getTrigger(r));

        await expect.element(getCell(r, new Date(2026, 0, 15))).toHaveFocus();
      });

      it('returns the focus to the trigger on Escape from the grid', async () => {
        const r = render(<DateFieldTest defaultValue='2026-01-15' />);

        await openByKeyboard(r);
        await expect.element(getCell(r, new Date(2026, 0, 15))).toHaveFocus();
        await userEvent.keyboard('{Escape}');

        await expect.poll(() => r.queryByTestId(TESTID_CALENDAR_ROOT)).toBeNull();
        await expect.element(getTrigger(r)).toHaveFocus();
        await expect.element(getInput(r)).toHaveValue('15.01.2026');
      });

      it('writes the day picked with Enter, closes and returns the focus to the trigger', async () => {
        const r = render(<DateFieldTest />);

        await openByKeyboard(r);
        await expect.element(getCell(r, new Date(2026, 0, 1))).toHaveFocus();
        await userEvent.keyboard('{ArrowRight}{Enter}');

        await expect.element(getInput(r)).toHaveValue('02.01.2026');
        await expect.poll(() => r.queryByTestId(TESTID_CALENDAR_ROOT)).toBeNull();
        await expect.element(getTrigger(r)).toHaveFocus();
      });

      it('writes the day picked by a click, closes and returns the focus to the trigger', async () => {
        const r = render(<DateFieldTest />);

        await openByKeyboard(r);
        await pickDate(r, new Date(2026, 0, 15));

        await expect.element(getInput(r)).toHaveValue('15.01.2026');
        await expect.poll(() => r.queryByTestId(TESTID_CALENDAR_ROOT)).toBeNull();
        await expect.element(getTrigger(r)).toHaveFocus();
      });

      it('keeps the popup open after a pick when a controlled open stays true', async () => {
        const r = render(<OpenDateFieldTest />);

        await openByKeyboard(r);
        await userEvent.keyboard('{ArrowRight}{Enter}');

        await expect.element(getInput(r)).toHaveValue('02.01.2026');
        await expect.element(getCell(r, new Date(2026, 0, 2))).toHaveAttribute('aria-selected', 'true');
        await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
      });

      it('leaves aria-invalid to the user', async () => {
        const r = render(<DateFieldTest />);

        await userEvent.type(getInput(r), '15.01');
        await expect.element(getInput(r)).not.toHaveAttribute('aria-invalid');

        r.rerender(<DateFieldTest inputProps={{ 'aria-invalid': true }} />);

        await expect.element(getInput(r)).toHaveAttribute('aria-invalid', 'true');
      });

      it('disables the input and the trigger', async () => {
        const r = render(<DateFieldTest disabled defaultValue='2026-01-15' />);

        await expect.element(getInput(r)).toBeDisabled();
        await expect.element(getTrigger(r)).toBeDisabled();
      });

      it('does not change a read-only input from the calendar', async () => {
        const r = render(<DateFieldTest defaultValue='2026-01-15' inputProps={{ readOnly: true }} />);

        await openByKeyboard(r);
        getCell(r, new Date(2026, 0, 20)).element().focus();
        await userEvent.keyboard('{Enter}');

        expect(getInput(r)).toHaveValue('15.01.2026');
      });

      it('shows a read-only field in a read-only grid that navigates but does not pick', async () => {
        const onChange = vi.fn();
        const onChangeValue = vi.fn();
        const r = render(<DateFieldTest readOnly defaultValue='2026-01-15' onChange={onChange} onChangeValue={onChangeValue} />);

        await expect.element(getInput(r)).toHaveAttribute('readonly');
        await openByKeyboard(r);
        await expect.element(r.getByRole('grid')).toHaveAttribute('aria-readonly', 'true');
        await userEvent.keyboard('{ArrowRight}');
        await expect.element(getCell(r, new Date(2026, 0, 16))).toHaveFocus();
        await userEvent.keyboard('{Enter}');

        await expect.element(getCell(r, new Date(2026, 0, 15))).toHaveAttribute('aria-selected', 'true');
        await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
        expect(getInput(r)).toHaveValue('15.01.2026');
        expect(onChange).not.toHaveBeenCalled();
        expect(onChangeValue).not.toHaveBeenCalled();
      });
    });
  });
});