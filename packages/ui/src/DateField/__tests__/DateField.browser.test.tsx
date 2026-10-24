import { FC } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';

import { DateField, type DateFieldProps } from '../DateField';
import { DateFieldInput, DateFieldCalendar, DateFieldTriggerIconButton, type DateFieldInputProps } from '../components';
import { Popover, PopoverTrigger, PopoverContent } from '../../Popover';
import { Icon } from '../../Icon';

import {
  CalendarHeader,
  CalendarContent,
  CalendarPrevButton,
  CalendarNextButton,
  CalendarViewButtonGroup,
  CalendarViewButton,
  CalendarMonthLabel,
  CalendarYearLabel,
  CalendarDays, CalendarWeekdays, CalendarWeekday, CalendarDay,
  CalendarWeeks,
  CalendarMonth,
  CalendarMonths,
  CalendarYear,
  CalendarYears,
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

const DateFieldTest: FC<Partial<DateFieldProps> & { inputProps?: DateFieldInputProps }> = ({
  onInput,
  onChange,
  inputProps,
  ...props
}) => {
  return (
    <DateField format={FORMAT} separator={SEPARATOR} {...props}>
      <DateFieldInput data-testid={TESTID_INPUT} onInput={onInput} onChange={onChange} {...inputProps} />
      <Popover placement='bottom-end'>
        <PopoverTrigger asChild>
          <DateFieldTriggerIconButton aria-label='Open calendar'  data-testid={TESTID_TRIGGER} />
        </PopoverTrigger>
        <PopoverContent data-testid={TESTID_CONTENT}>
          <DateFieldCalendar data-testid={TESTID_CALENDAR_ROOT} style={{ width: 320 }}>
            <CalendarHeader>
              <CalendarPrevButton aria-label='Previous month'>
                <Icon>
                  <ChevronLeft />
                </Icon>
              </CalendarPrevButton>
              <CalendarViewButtonGroup>
                <CalendarViewButton view='month' aria-label='Open month picker'>
                  <CalendarMonthLabel />
                </CalendarViewButton>
                <CalendarViewButton view='year' aria-label='Open year picker'>
                  <CalendarYearLabel />
                </CalendarViewButton>
              </CalendarViewButtonGroup>
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
                <CalendarWeeks>
                  <LabeledDay />
                </CalendarWeeks>
              </CalendarDays>
              <CalendarMonths>
                <CalendarMonth />
              </CalendarMonths>
              <CalendarYears>
                <CalendarYear />
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
const queryContent = (r: RenderResult) => r.queryByTestId(TESTID_CONTENT);
const getContent = (r: RenderResult) => r.getByTestId(TESTID_CONTENT);
const getCalendarRoot = (r: RenderResult) => r.getByTestId(TESTID_CALENDAR_ROOT);
const getCell = (r: RenderResult, date: Date, calendar: CalendarSystem = gregorianCalendar) =>
  page.elementLocator(getContent(r)).getByRole('gridcell', { name: formatCalendarDate(calendar, formatISODate(date), 'en-US', { dateStyle: 'full' }), exact: true });

const pickDate = async (r: RenderResult, date: Date, calendar?: CalendarSystem) => {
  const cell = getCell(r, date, calendar)
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
        await pickDate(r, new Date(2026, 1, 10));

        await expect.element(getInput(r)).toHaveValue('10.02.2026');
      });

      it('closes on Escape without changing the value', async () => {
        const r = render(<DateFieldTest />);

        await open(r, '15.01.2026');
        await press(r, 'Next month');
        await expect.element(getCell(r, new Date(2026, 1, 15))).toHaveAttribute('tabindex', '0');
        await userEvent.keyboard('{Escape}');

        await expect.poll(() => r.queryByTestId(TESTID_CONTENT)).toBeNull();
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
  
  describe('typing', () => {
    it('pads a day digit that cannot start a two-digit day', async () => {
      const r = render(<DateFieldTest />);
      
      await userEvent.type(getInput(r), '4');
      
      await expect.element(getInput(r)).toHaveValue('04');
    });
    
    it('clamps the day to the length of the month', async () => {
      const r = render(<DateFieldTest />);
      
      await userEvent.type(getInput(r), '31.02.2026');
      
      await expect.element(getInput(r)).toHaveValue('28.02.2026');
    });
    
    it('clamps a typed date to min and max', async () => {
      const r = render(<DateFieldTest min='2026-01-10' max='2026-01-20' />);
      
      await userEvent.type(getInput(r), '05.01.2026');
      
      await expect.element(getInput(r)).toHaveValue('10.01.2026');
    });

    it('accepts the digits of other numbering systems', async () => {
      const r = render(<DateFieldTest />);

      await userEvent.type(getInput(r), '١٥.٠١.٢٠٢٦');

      await expect.element(getInput(r)).toHaveValue('15.01.2026');
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

    it('clears the selection when the text becomes incomplete', async () => {
      const r = render(<DateFieldTest />);

      await userEvent.type(getInput(r), '15.01.2026{Backspace}');

      await expectNotSelected(r, new Date(2026, 0, 15));
    });

    it('selects a picked day typed again after clearing', async () => {
      const r = render(<DateFieldTest />);

      await userEvent.click(getTrigger(r));
      await pickDate(r, new Date(2026, 0, 15));
      await userEvent.keyboard('{Escape}');
      await expect.poll(() => queryContent(r)).toBeNull();
      await userEvent.clear(getInput(r));
      await userEvent.type(getInput(r), '15.01.2026');

      await expectSelected(r, new Date(2026, 0, 15));
    });

    it('selects the day of the native defaultValue', async () => {
      const r = render(<DateFieldTest inputProps={{ defaultValue: '15.01.2026' }} />);

      await expectSelected(r, new Date(2026, 0, 15));
    });

    it('follows the text restored by form.reset()', async () => {
      const r = render(
        <form data-testid='form'>
          <DateFieldTest inputProps={{ defaultValue: '10.01.2026' }} />
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

    it('clamps the typed text when min changes and dispatches input', async () => {
      const onInput = vi.fn();
      const r = render(<DateFieldTest onInput={onInput} />);

      await userEvent.type(getInput(r), '05.01.2026');
      onInput.mockClear();
      r.rerender(<DateFieldTest onInput={onInput} min='2026-01-10' />);

      await expect.element(getInput(r)).toHaveValue('10.01.2026');
      expect(onInput).toHaveBeenCalledTimes(1);
      await expectSelected(r, new Date(2026, 0, 10));
    });

    it('clamps the typed text when max changes', async () => {
      const r = render(<DateFieldTest />);

      await userEvent.type(getInput(r), '25.01.2026');
      r.rerender(<DateFieldTest max='2026-01-20' />);

      await expect.element(getInput(r)).toHaveValue('20.01.2026');
      await expectSelected(r, new Date(2026, 0, 20));
    });
  });

  describe('calendar systems', () => {
    const persian = createCalendarSystem('persian');
    
    it('accepts a day that exists only in the Persian calendar', async () => {
      const r = render(<DateFieldTest calendar={persian} />);
      
      await userEvent.type(getInput(r), '31.06.1404');
      await userEvent.click(getTrigger(r));
      
      await expect.element(getInput(r)).toHaveValue('31.06.1404');
      await expect.element(getCell(r, new Date(2025, 8, 22), persian)).toHaveAttribute('aria-selected', 'true');
    });
    
    it('writes a picked day in the Persian calendar', async () => {
      const r = render(<DateFieldTest calendar={persian} />);
      
      await userEvent.type(getInput(r), '01.01.1404');
      await userEvent.click(getTrigger(r));
      await pickDate(r, new Date(2025, 2, 22), persian);
      
      await expect.element(getInput(r)).toHaveValue('02.01.1404');
    });
    
    it('accepts the 13th month of a Hebrew leap year', async () => {
      const r = render(<DateFieldTest calendar={createCalendarSystem('hebrew')} />);
      
      await userEvent.type(getInput(r), '01.13.5784');
      
      await expect.element(getInput(r)).toHaveValue('01.13.5784');
    });
    
    it('shows the calendar popup in the locale of the field', async () => {
      const r = render(<DateFieldTest locale='de-DE' />);
      
      await userEvent.type(getInput(r), '15.03.2026');
      await userEvent.click(getTrigger(r));
      
      await expect.element(getCalendarRoot(r)).toHaveTextContent('März');
      await expect.element(getCalendarRoot(r)).toHaveAttribute('lang', 'de-DE');
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
        cell.element().focus();
        
        await expect.element(cell).toHaveFocus();
        await userEvent.keyboard('{Enter}');
        
        expect(getInput(r)).toHaveValue('15.01.2026');
      });
    });
  });
});