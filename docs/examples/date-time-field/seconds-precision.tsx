import { useState } from 'react';
import {
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
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';

export default function SecondsPrecision() {
  const [loggedAt, setLoggedAt] = useState('2026-07-01T23:59:58');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 320 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='logged-at'>Log entry time</Label>
        <DateTimeField
          dateFormat='dd.MM.yyyy'
          timeFormat='HH:mm:ss'
          min='2026-07-01T00:00:00'
          value={loggedAt}
          onChangeValue={setLoggedAt}
        >
          <DateTimeFieldInput id='logged-at' placeholder='dd.mm.yyyy, hh:mm:ss' />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateTimeFieldTriggerIconButton aria-label='Choose log date' />
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
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        Value: {loggedAt ? <code>{loggedAt}</code> : 'no complete date and time'}
      </Text>
    </div>
  );
}
