import { FormEvent, useState } from 'react';
import {
  Button,
  CalendarContent,
  CalendarDay,
  CalendarDays,
  CalendarDaysScroller,
  CalendarDaysScrollerContent,
  CalendarHeader,
  CalendarHeading,
  CalendarMonth,
  CalendarMonthLabel,
  CalendarMonths,
  CalendarMonthsGrid,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarViewButton,
  CalendarWeekday,
  CalendarWeekdays,
  CalendarWeeks,
  CalendarYear,
  CalendarYearLabel,
  CalendarYears,
  CalendarYearsGrid,
  CalendarYearsScroller,
  CalendarYearsScrollerContent,
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

const HINT = 'Enter the full date as dd.mm.yyyy.';

export default function RenewalForm() {
  const [error, setError] = useState('');
  const invalid = error !== '';

  const onInvalid = (event: FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.validity.valueMissing) {
      setError('Enter the renewal date.');
      return;
    }

    setError('The date is incomplete. Use dd.mm.yyyy.');
  };

  return (
    <form onSubmit={(event) => event.preventDefault()} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 280 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='renewal-date'>Renewal date</Label>
        <DateField format='dd.MM.yyyy' separator='.'>
          <DateFieldInput
            name='renewalDate'
            id='renewal-date'
            required
            placeholder='dd.mm.yyyy'
            aria-invalid={invalid}
            aria-describedby='renewal-date-hint'
            onInvalid={onInvalid}
            onInput={() => setError('')}
          />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateFieldTriggerIconButton aria-label='Choose renewal date' />
            </PopoverTrigger>
            <PopoverContent>
              <DateFieldCalendar aria-label='Choose renewal date'>
                <CalendarHeader>
                  <CalendarPrevButton aria-label='Previous month' />
                  <CalendarHeading>
                    <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
                    <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
                  </CalendarHeading>
                  <CalendarNextButton aria-label='Next month' />
                </CalendarHeader>
                <CalendarContent>
                  <CalendarDays>
                    <CalendarWeekdays>
                      <CalendarWeekday />
                    </CalendarWeekdays>
                    <CalendarDaysScroller>
                      <CalendarDaysScrollerContent>
                        <CalendarWeeks>
                          <CalendarDay />
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
        <HelperText id='renewal-date-hint' invalid={invalid}>{invalid ? error : HINT}</HelperText>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
        <Button type='submit'>Save</Button>
      </div>
    </form>
  );
}
