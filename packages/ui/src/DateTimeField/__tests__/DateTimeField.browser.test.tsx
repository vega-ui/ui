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

      it('reports the typed date and time as ISO', async () => {
        cleanup();
        const onChangeValue = vi.fn();
        const r = render(<DateTimeFieldTest onChangeValue={onChangeValue} />);

        await userEvent.type(getInput(r), '15.01.2026, 12:30');

        expect(onChangeValue).toHaveBeenLastCalledWith('2026-01-15T12:30');
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
  });
  
  describe('Edge Cases', () => {
    it('ignores invalid datetime input and does not sync calendar', async () => {
      const onChange = vi.fn();
      const r = render(<DateTimeFieldTest onChange={onChange} />);
      
      const input = getInput(r);
      
      await userEvent.type(input, 'aa.bb.cccc, dd:ee');
      
      expect(onChange).toHaveBeenCalledTimes(0);
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
  });
  
  
  describe('Accessibility', () => {
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