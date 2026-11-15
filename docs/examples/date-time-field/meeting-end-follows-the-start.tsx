import { useState } from 'react';
import {
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
  DateTimeField,
  DateTimeFieldCalendar,
  DateTimeFieldInput,
  DateTimeFieldTriggerIconButton,
  Fieldset,
  FieldsetLegend,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';

const addHours = (iso: string, hours: number) => {
  const date = new Date(`${iso}Z`);
  date.setUTCHours(date.getUTCHours() + hours);

  return date.toISOString().slice(0, 16);
};

const describeDuration = (start: string, end: string) => {
  if (!start || !end) return 'Choose the start and the end';

  const minutes = (Date.parse(end) - Date.parse(start)) / 60_000;
  if (minutes < 0) return 'The end is before the start';

  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;

  if (hours === 0) return `${rest} min`;
  if (rest === 0) return `${hours} h`;

  return `${hours} h ${rest} min`;
};

export default function MeetingTimes() {
  const [start, setStart] = useState('2026-07-15T10:00');
  const [end, setEnd] = useState('2026-07-15T11:00');

  const changeStart = (nextStart: string) => {
    setStart(nextStart);

    if (nextStart !== '' && end !== '' && end < nextStart) {
      setEnd(addHours(nextStart, 1));
    }
  };

  return (
    <Fieldset style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 320 }}>
      <FieldsetLegend>Meeting</FieldsetLegend>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='meeting-start'>Starts</Label>
        <DateTimeField dateFormat='dd.MM.yyyy' timeStep={15} value={start} onChangeValue={changeStart}>
          <DateTimeFieldInput id='meeting-start' placeholder='dd.mm.yyyy, hh:mm' />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateTimeFieldTriggerIconButton aria-label='Choose start date' />
            </PopoverTrigger>
            <PopoverContent>
              <DateTimeFieldCalendar aria-label='Choose start date'>
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
              </DateTimeFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateTimeField>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='meeting-end'>Ends</Label>
        <DateTimeField
          dateFormat='dd.MM.yyyy'
          timeStep={15}
          min={start}
          value={end}
          onChangeValue={setEnd}
        >
          <DateTimeFieldInput id='meeting-end' placeholder='dd.mm.yyyy, hh:mm' />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateTimeFieldTriggerIconButton aria-label='Choose end date' />
            </PopoverTrigger>
            <PopoverContent>
              <DateTimeFieldCalendar aria-label='Choose end date'>
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
              </DateTimeFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateTimeField>
      </div>
      <Text size={2} aria-live='polite' style={{ color: 'var(--label-secondary)' }}>
        Duration: {describeDuration(start, end)}
      </Text>
    </Fieldset>
  );
}
