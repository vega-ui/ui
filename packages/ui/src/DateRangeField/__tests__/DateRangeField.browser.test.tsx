import { FC, useState } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';
import { page, userEvent } from 'vitest/browser';

import { DateRangeField, type DateRangeFieldProps } from '../DateRangeField';
import { DateRangeFieldInput, DateRangeFieldCalendar, DateRangeFieldTriggerIconButton, type DateRangeFieldInputProps } from '../components';
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

const DateRangeFieldTest: FC<Partial<DateRangeFieldProps> & { inputProps?: DateRangeFieldInputProps }> = ({
  onInput,
  onChange,
  inputProps,
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
    <Popover placement='bottom-end'>
      <PopoverTrigger asChild>
        <DateRangeFieldTriggerIconButton aria-label='Open calendar' data-testid={TESTID_TRIGGER} />
      </PopoverTrigger>
      <PopoverContent data-testid={TESTID_CONTENT}>
        <DateRangeFieldCalendar data-testid={TESTID_CALENDAR_ROOT} style={{ width: 320 }}>
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

      it('reports the typed range as ISO', async () => {
        cleanup();
        const onChangeValue = vi.fn();
        const r = render(<DateRangeFieldTest onChangeValue={onChangeValue} />);

        await userEvent.type(getInput(r), `10.01.2026${RANGE_SEPARATOR}15.01.2026`);

        expect(onChangeValue).toHaveBeenLastCalledWith(['2026-01-10', '2026-01-15']);
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
    
    it('renders input and calendar trigger', async () => {
      await expect.element(getInput(r)).toHaveRole('textbox');
      await expect.element(getTrigger(r)).toHaveRole('button');
    });
    
    it('opens calendar popover', async () => {
      expect(r.queryByTestId(TESTID_CALENDAR_ROOT)).toBeNull();
      
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
      
      await userEvent.type(input, `10.01.2026${RANGE_SEPARATOR}15.01.2026`);
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

    it('does not crash when opening calendar with empty value', async () => {
      const r = render(<DateRangeFieldTest />);
      
      await userEvent.click(getTrigger(r));
      await expect.element(getCalendarRoot(r)).toBeInTheDocument();
    });

    describe('typing', () => {
      it('swaps a reversed range', async () => {
        const r = render(<DateRangeFieldTest />);
      
        await userEvent.type(getInput(r), `15.01.2026${RANGE_SEPARATOR}10.01.2026`);
      
        await expect.element(getInput(r)).toHaveValue(`10.01.2026${RANGE_SEPARATOR}15.01.2026`);
      });

      it('accepts the digits of other numbering systems', async () => {
        const r = render(<DateRangeFieldTest />);

        await userEvent.type(getInput(r), `١٠.٠١.٢٠٢٦${RANGE_SEPARATOR}١٥.٠١.٢٠٢٦`);

        await expect.element(getInput(r)).toHaveValue(`10.01.2026${RANGE_SEPARATOR}15.01.2026`);
      });
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

      it('clamps both typed dates when min and max change and dispatches input', async () => {
        const onInput = vi.fn();
        const r = render(<DateRangeFieldTest onInput={onInput} />);

        await userEvent.type(getInput(r), `05.01.2026${RANGE_SEPARATOR}25.01.2026`);
        onInput.mockClear();
        r.rerender(<DateRangeFieldTest onInput={onInput} min='2026-01-10' max='2026-01-20' />);

        await expect.element(getInput(r)).toHaveValue(`10.01.2026${RANGE_SEPARATOR}20.01.2026`);
        expect(onInput).toHaveBeenCalledTimes(1);
        await openCalendar(r);
        await expect.element(getCell(r, new Date(2026, 0, 10))).toHaveAttribute('aria-selected', 'true');
        await expect.element(getCell(r, new Date(2026, 0, 20))).toHaveAttribute('aria-selected', 'true');
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
    it('supports keyboard selection', async () => {
      const r = render(<DateRangeFieldTest />);
      
      await userEvent.click(getTrigger(r));
      
      const cell = getCell(r, new Date(2026, 0, 10));
      cell.element().focus();
      
      await expect.element(cell).toHaveFocus();
      await userEvent.keyboard('{Enter}');
      
      expect(getInput(r)).toHaveValue('10.01.2026');
    });
  });
});