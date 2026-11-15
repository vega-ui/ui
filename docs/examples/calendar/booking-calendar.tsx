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
          defaultFocusedDate='2026-11-01'
          disabledDates={isBooked}
          value={[start, end]}
          onChangeValue={setRange}
        >
          <CalendarHeader>
            <CalendarPrevButton aria-label='Previous' />
            <CalendarHeading>
              <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
              <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
            </CalendarHeading>
            <CalendarNextButton aria-label='Next' />
          </CalendarHeader>
          <CalendarContent>
            <CalendarDays aria-label='Stay dates' aria-describedby={messageId}>
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
        <HelperText id={messageId} invalid={invalid} aria-live='polite'>{message}</HelperText>
      </div>
      <Button disabled={!complete || invalid}>Reserve</Button>
    </div>
  );
}
