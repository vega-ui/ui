import {
  Button,
  Calendar,
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
  Fieldset,
  FieldsetLegend,
  HelperText,
  Text,
} from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

export default function SubmitTheDateWithAForm() {
  const [date, setDate] = useState('');
  const [missing, setMissing] = useState(false);
  const [submitted, setSubmitted] = useState('');
  const errorId = useId();

  const pick = (next: string) => {
    setDate(next);
    setMissing(false);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const appointment = String(data.get('appointment'));

    if (!appointment) {
      setMissing(true);
      return;
    }

    setSubmitted(appointment);
  };

  const reset = () => {
    setDate('');
    setMissing(false);
    setSubmitted('');
  };

  return (
    <form onSubmit={submit} onReset={reset} style={{ display: 'grid', gap: 'var(--spacing-12)', justifyItems: 'start', width: '100%' }}>
      <Fieldset>
        <FieldsetLegend>Appointment date</FieldsetLegend>
        <Calendar locale='en-US' value={date} onChangeValue={pick}>
          <CalendarHeader>
            <CalendarPrevButton aria-label='Previous' />
            <CalendarHeading>
              <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
              <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
            </CalendarHeading>
            <CalendarNextButton aria-label='Next' />
          </CalendarHeader>
          <CalendarContent>
            <CalendarDays aria-label='Appointment date' aria-describedby={missing ? errorId : undefined}>
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
        </Calendar>
        {missing && <HelperText id={errorId} invalid>Pick a date for the appointment.</HelperText>}
      </Fieldset>
      <input type='hidden' name='appointment' value={date} />
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Button type='submit'>Book</Button>
        <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
      </div>
      <Text aria-live='polite'>{submitted ? `Sent appointment=${submitted}` : ''}</Text>
    </form>
  );
}
