import { FC } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';
import { page, userEvent, type Locator } from 'vitest/browser';

import { DateTimeField, type DateTimeFieldProps } from '../DateTimeField';
import {
  DateTimeFieldInput,
  DateTimeFieldCalendar,
  DateTimeFieldTriggerIconButton,
  type DateTimeFieldInputProps,
} from '../components';

import { Popover, PopoverTrigger, PopoverContent } from '../../Popover';
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

const DateTimeFieldTest: FC<Partial<DateTimeFieldProps> & { inputProps?: DateTimeFieldInputProps }> = ({
  onInput,
  onChange,
  inputProps,
  ...props
}) => (
  <DateTimeField dateFormat={FORMAT} separator={SEPARATOR} {...props}>
    <DateTimeFieldInput
      data-testid={TESTID_INPUT}
      onInput={onInput}
      onChange={onChange}
      {...inputProps}
    />
    <Popover>
      <PopoverTrigger asChild>
        <DateTimeFieldTriggerIconButton aria-label='Open calendar' data-testid={TESTID_TRIGGER} />
      </PopoverTrigger>
      <PopoverContent data-testid={TESTID_CONTENT}>
        <DateTimeFieldCalendar data-testid={TESTID_CALENDAR} style={{ width: 320 }}>
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
const getCell = (r: RenderResult, date: Date, calendar: CalendarSystem = gregorianCalendar) =>
  page.elementLocator(getContent(r)).getByRole('gridcell', { name: formatCalendarDate(calendar, formatISODate(date), 'en-US', { dateStyle: 'full' }), exact: true });

const pickDate = async (r: RenderResult, date: Date, calendar?: CalendarSystem) => {
  const cell = getCell(r, date, calendar);
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
        const r = render(<DateTimeFieldTest />);

        await open(r, '15.01.2026, 12:30');
        await press(r, 'Next month');

        await expect.element(getCell(r, new Date(2026, 1, 15))).toHaveAttribute('tabindex', '0');
        await settle();
        await expect.element(getInput(r)).toHaveValue('15.01.2026, 12:30');
      });

      it('keeps the value and moves focus to the same day of the previous month', async () => {
        const r = render(<DateTimeFieldTest />);

        await open(r, '15.03.2026, 12:30');
        await press(r, 'Previous month');

        await expect.element(getCell(r, new Date(2026, 1, 15))).toHaveAttribute('tabindex', '0');
        await settle();
        await expect.element(getInput(r)).toHaveValue('15.03.2026, 12:30');
      });

      it('keeps the value when a month is picked in the month picker', async () => {
        const r = render(<DateTimeFieldTest />);

        await open(r, '15.01.2026, 12:30');
        await press(r, 'Open month picker');
        await expect.element(getMonthCell(r, 'January')).toHaveFocus();
        await userEvent.keyboard('{ArrowRight}{ArrowRight}{Enter}');

        await expect.element(getCell(r, new Date(2026, 2, 15))).toHaveAttribute('tabindex', '0');
        await settle();
        await expect.element(getInput(r)).toHaveValue('15.01.2026, 12:30');
      });

      it('keeps the value when a year is picked in the year picker', async () => {
        const r = render(<DateTimeFieldTest />);

        await open(r, '15.01.2026, 12:30');
        await press(r, 'Open year picker');
        await expect.element(getYearCell(r, '2026')).toHaveFocus();
        await userEvent.keyboard('{ArrowRight}{Enter}');

        await expect.element(getCell(r, new Date(2027, 0, 15))).toHaveAttribute('tabindex', '0');
        await settle();
        await expect.element(getInput(r)).toHaveValue('15.01.2026, 12:30');
      });

      it('keeps the value while scrolling through months', async () => {
        const r = render(<DateTimeFieldTest />);

        await open(r, '15.01.2026, 12:30');

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
        await expect.element(getInput(r)).toHaveValue('15.01.2026, 12:30');
        expect(onChange).not.toHaveBeenCalled();
      });

      it('writes a day picked after navigating', async () => {
        const r = render(<DateTimeFieldTest />);

        await open(r, '15.01.2026, 12:30');
        await press(r, 'Next month');
        await expect.element(getCell(r, new Date(2026, 1, 15))).toHaveAttribute('tabindex', '0');
        await expect.poll(() => isPageVisible(getCell(r, new Date(2026, 1, 10)))).toBe(true);
        await expect.poll(() => isPageCentered(getCell(r, new Date(2026, 1, 10)))).toBe(true);
        await pickDate(r, new Date(2026, 1, 10));

        await expect.element(getInput(r)).toHaveValue('10.02.2026, 12:30');
      });

      it('closes on Escape without changing the value', async () => {
        const r = render(<DateTimeFieldTest />);

        await open(r, '15.01.2026, 12:30');
        await press(r, 'Next month');
        await expect.element(getCell(r, new Date(2026, 1, 15))).toHaveAttribute('tabindex', '0');
        await userEvent.keyboard('{Escape}');

        await expect.poll(() => r.queryByTestId(TESTID_CONTENT)).toBeNull();
        await expect.element(getInput(r)).toHaveValue('15.01.2026, 12:30');
      });

      it('keeps an empty field empty while navigating', async () => {
        const r = render(<DateTimeFieldTest />);

        await userEvent.click(getTrigger(r));
        await press(r, 'Next month');
        await settle();

        await expect.element(getInput(r)).toHaveValue('');
      });
    });

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
  
  describe('typing', () => {
    it('steps the time segment at the caret with arrow keys', async () => {
      const r = render(<DateTimeFieldTest timeStep={15} />);
      const input = getInput(r);
      
      await userEvent.type(input, '15.01.2026, 12:30');
      input.setSelectionRange(16, 16);
      await userEvent.keyboard('{ArrowUp}');
      
      await expect.element(input).toHaveValue('15.01.2026, 12:45');
    });
    
    it('wraps the stepped time segment around its range', async () => {
      const r = render(<DateTimeFieldTest />);
      const input = getInput(r);
      
      await userEvent.type(input, '15.01.2026, 00:30');
      input.setSelectionRange(13, 13);
      await userEvent.keyboard('{ArrowDown}');
      
      await expect.element(input).toHaveValue('15.01.2026, 23:30');
    });
    
    it('steps the hours by one whatever the time step', async () => {
      const r = render(<DateTimeFieldTest timeStep={15} />);
      const input = getInput(r);
      
      await userEvent.type(input, '15.01.2026, 12:30');
      input.setSelectionRange(13, 13);
      await userEvent.keyboard('{ArrowUp}');
      
      await expect.element(input).toHaveValue('15.01.2026, 13:30');
    });
    
    it('clamps the time to its range', async () => {
      const r = render(<DateTimeFieldTest />);
      
      await userEvent.type(getInput(r), '15.01.2026, 25:30');
      
      await expect.element(getInput(r)).toHaveValue('15.01.2026, 23:30');
    });

    it('accepts the digits of other numbering systems', async () => {
      const r = render(<DateTimeFieldTest />);

      await userEvent.type(getInput(r), '۱۵.۰۱.۲۰۲۶, ۰۸:۳۰');

      await expect.element(getInput(r)).toHaveValue('15.01.2026, 08:30');
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

    it('clears the selection when the text becomes incomplete', async () => {
      const r = render(<DateTimeFieldTest />);

      await userEvent.type(getInput(r), '15.01.2026, 12:30{Backspace}');

      await expectNotSelected(r, new Date(2026, 0, 15));
    });

    it('takes the date and the time of the native defaultValue', async () => {
      const r = render(<DateTimeFieldTest inputProps={{ defaultValue: '15.01.2026, 12:30' }} />);

      await expectSelected(r, new Date(2026, 0, 15));
      await pickDate(r, new Date(2026, 0, 20));
      await expect.element(getInput(r)).toHaveValue('20.01.2026, 12:30');
    });

    it('follows the text restored by a reset button', async () => {
      const r = render(
        <form>
          <DateTimeFieldTest inputProps={{ defaultValue: '10.01.2026, 08:15' }} />
          <button type='reset'>Reset</button>
        </form>
      );

      await userEvent.clear(getInput(r));
      await userEvent.type(getInput(r), '15.01.2026, 12:30');
      await userEvent.click(r.getByRole('button', { name: 'Reset' }));

      await expect.element(getInput(r)).toHaveValue('10.01.2026, 08:15');
      await expectSelected(r, new Date(2026, 0, 10));
    });

    it('clamps the typed text when min changes and dispatches input', async () => {
      const onInput = vi.fn();
      const r = render(<DateTimeFieldTest onInput={onInput} />);

      await userEvent.type(getInput(r), '05.01.2026, 12:30');
      onInput.mockClear();
      r.rerender(<DateTimeFieldTest onInput={onInput} min='2026-01-10T09:00' />);

      await expect.element(getInput(r)).toHaveValue('10.01.2026, 09:00');
      expect(onInput).toHaveBeenCalledTimes(1);
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
        cell.element().focus();
        
        await expect.element(cell).toHaveFocus();
        await userEvent.keyboard('{Enter}');
        
        expect(getInput(r)).toHaveValue('15.01.2026, 00:00');
      });
    });
  });
});