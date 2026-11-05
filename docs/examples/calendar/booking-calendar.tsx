import {
  Button,
  Calendar,
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
  HelperText,
} from '@vega-ui/react';
import { useId, useState } from 'react';

const DAY = 86_400_000;
const booked = new Set(['2026-11-12', '2026-11-13', '2026-11-20', '2026-11-21', '2026-12-05']);
const dateFormat = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });

function isBooked(date: string) {
  return booked.has(date);
}

function spansBookedNight(start: string, end: string) {
  for (let time = Date.parse(start); time < Date.parse(end); time += DAY) {
    if (booked.has(new Date(time).toISOString().slice(0, 10))) return true;
  }

  return false;
}

export default function BookingCalendar() {
  const [[start, end], setRange] = useState<[string, string]>(['', '']);
  const messageId = useId();

  const complete = start !== '' && end !== '';
  const invalid = complete && spansBookedNight(start, end);
  const nights = complete ? (Date.parse(end) - Date.parse(start)) / DAY : 0;

  let message = 'Pick check-in and check-out. Unavailable days are booked.';
  if (invalid) message = 'These dates include a booked night. Pick another range.';
  if (complete && !invalid) message = `${dateFormat.formatRange(new Date(start), new Date(end))}, ${nights} nights`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-12)', justifyItems: 'start', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)', justifyItems: 'start' }}>
        <Calendar
          compact
          locale='en-US'
          selection='range'
          min='2026-11-01'
          max='2027-04-30'
          defaultMonth='2026-11-01'
          disabledDates={isBooked}
          value={[start, end]}
          onChangeValue={setRange}
        >
          <CalendarHeader>
            <CalendarPrevButton aria-label='Previous' />
            <CalendarViewButtonGroup>
              <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
              <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
            </CalendarViewButtonGroup>
            <CalendarNextButton aria-label='Next' />
          </CalendarHeader>
          <CalendarContent>
            <CalendarDays aria-label='Stay dates' aria-describedby={messageId}>
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
        </Calendar>
        <HelperText id={messageId} error={invalid} aria-live='polite'>{message}</HelperText>
      </div>
      <Button disabled={!complete || invalid}>Reserve</Button>
    </div>
  );
}
