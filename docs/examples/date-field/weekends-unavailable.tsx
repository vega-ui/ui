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
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTriggerIconButton,
  HelperText,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';

const isWeekend = (iso: string) => {
  const weekday = new Date(`${iso}T00:00:00Z`).getUTCDay();

  return weekday === 0 || weekday === 6;
};

export default function WeekendsUnavailable() {
  const [deliveryDate, setDeliveryDate] = useState('');
  const [error, setError] = useState('');
  const invalid = error !== '';

  const onChangeValue = (date: string) => {
    setDeliveryDate(date);
    setError('');
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (deliveryDate && isWeekend(deliveryDate)) {
      setError('We do not deliver on weekends. Choose a weekday.');
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 300 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='delivery-date'>Delivery date</Label>
        <DateField
          format='dd.MM.yyyy'
          separator='.'
          disabledDates={isWeekend}
          error={invalid}
          value={deliveryDate}
          onChangeValue={onChangeValue}
        >
          <DateFieldInput
            id='delivery-date'
            required
            placeholder='dd.mm.yyyy'
            aria-invalid={invalid}
            aria-describedby='delivery-date-hint'
          />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateFieldTriggerIconButton aria-label='Choose delivery date' />
            </PopoverTrigger>
            <PopoverContent>
              <DateFieldCalendar>
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
              </DateFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateField>
        <HelperText id='delivery-date-hint' error={invalid}>{invalid ? error : 'Monday to Friday only.'}</HelperText>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
        <Button type='submit'>Book delivery</Button>
      </div>
    </form>
  );
}
