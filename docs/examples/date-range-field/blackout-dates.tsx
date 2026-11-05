import { FormEvent, useState } from 'react';
import {
  Button,
  CalendarContent,
  CalendarDay,
  CalendarDays,
  CalendarHeader,
  CalendarMonth,
  CalendarMonthLabel,
  CalendarMonths,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarViewButton,
  CalendarViewButtonGroup,
  CalendarWeekday,
  CalendarWeekdays,
  CalendarWeeks,
  CalendarYear,
  CalendarYearLabel,
  CalendarYears,
  DateRangeField,
  DateRangeFieldCalendar,
  DateRangeFieldInput,
  DateRangeFieldTriggerIconButton,
  HelperText,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';

const BLACKOUT_DATES = ['2026-06-12', '2026-06-13', '2026-06-14'];

const includesBlackout = ([start, end]: [string, string]) => {
  const last = end === '' ? start : end;

  return BLACKOUT_DATES.some((date) => date >= start && date <= last);
};

export default function BlackoutDates() {
  const [rental, setRental] = useState<[string, string]>(['', '']);
  const [error, setError] = useState('');
  const invalid = error !== '';

  const onChangeValue = (range: [string, string]) => {
    setRental(range);
    setError('');
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (includesBlackout(rental)) {
      setError('The van is booked from 12 to 14 June. Choose dates around them.');
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 320 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='rental-dates'>Rental dates</Label>
        <DateRangeField
          format='dd.MM.yyyy'
          separator='.'
          disabledDates={BLACKOUT_DATES}
          error={invalid}
          value={rental}
          onChangeValue={onChangeValue}
        >
          <DateRangeFieldInput
            id='rental-dates'
            required
            placeholder='dd.mm.yyyy – dd.mm.yyyy'
            aria-invalid={invalid}
            aria-describedby='rental-dates-hint'
          />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateRangeFieldTriggerIconButton aria-label='Choose rental dates' />
            </PopoverTrigger>
            <PopoverContent>
              <DateRangeFieldCalendar>
                <CalendarHeader>
                  <CalendarPrevButton aria-label='Previous month' />
                  <CalendarViewButtonGroup>
                    <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
                    <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
                  </CalendarViewButtonGroup>
                  <CalendarNextButton aria-label='Next month' />
                </CalendarHeader>
                <CalendarContent>
                  <CalendarDays>
                    <CalendarWeekdays>
                      <CalendarWeekday />
                    </CalendarWeekdays>
                    <CalendarWeeks>
                      <CalendarDay />
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
        <HelperText id='rental-dates-hint' error={invalid}>{invalid ? error : 'Unavailable from 12 to 14 June 2026.'}</HelperText>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
        <Button type='submit'>Book van</Button>
      </div>
    </form>
  );
}
