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
  DateTimeField,
  DateTimeFieldCalendar,
  DateTimeFieldInput,
  DateTimeFieldTriggerIconButton,
  HelperText,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';

const HINT = 'Date and 24-hour time, for example 15.07.2026, 09:30.';

export default function MaintenanceWindowForm() {
  const [error, setError] = useState('');
  const invalid = error !== '';

  const onInvalid = (event: FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.validity.valueMissing) {
      setError('Enter when the maintenance starts.');
      return;
    }

    setError('The date or the time is incomplete.');
  };

  return (
    <form onSubmit={(event) => event.preventDefault()} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 320 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='maintenance-start'>Maintenance starts</Label>
        <DateTimeField dateFormat='dd.MM.yyyy' error={invalid}>
          <DateTimeFieldInput
            id='maintenance-start'
            name='maintenanceStart'
            required
            pattern='\d{2}\.\d{2}\.\d{4}, \d{2}:\d{2}'
            placeholder='dd.mm.yyyy, hh:mm'
            aria-invalid={invalid}
            aria-describedby='maintenance-start-hint'
            onInvalid={onInvalid}
            onInput={() => setError('')}
          />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateTimeFieldTriggerIconButton aria-label='Choose maintenance date' />
            </PopoverTrigger>
            <PopoverContent>
              <DateTimeFieldCalendar>
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
              </DateTimeFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateTimeField>
        <HelperText id='maintenance-start-hint' error={invalid}>{invalid ? error : HINT}</HelperText>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
        <Button type='submit'>Save</Button>
      </div>
    </form>
  );
}
