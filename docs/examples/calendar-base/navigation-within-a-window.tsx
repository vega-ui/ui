import {
  CalendarBase,
  CalendarBaseControlIconButton,
  CalendarBaseHeader,
  CalendarBaseWeekLabel,
  CalendarBaseWeekLabels,
  DayPicker,
  DayPickerCell,
  DayPickerLayout,
  HelperText,
  Icon,
  Text,
} from '@vega-ui/react';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { useId, useState } from 'react';

const LOCALE = 'en-US';
const WEEK_START = 0;
const FIRST_DAY = '2026-11-16';
const LAST_DAY = '2027-01-15';
const weekdayFormat = new Intl.DateTimeFormat(LOCALE, { weekday: 'short', timeZone: 'UTC' });
const monthFormat = new Intl.DateTimeFormat(LOCALE, { month: 'long', year: 'numeric', timeZone: 'UTC' });
const weekdays = Array.from({ length: 7 }, (_, index) => weekdayFormat.format(Date.UTC(2026, 10, 1 + WEEK_START + index)));

function addMonths(month: string, amount: number) {
  const date = new Date(month);
  date.setUTCMonth(date.getUTCMonth() + amount);

  return date.toISOString().slice(0, 10);
}

function getMonthStart(day: string) {
  return `${day.slice(0, 7)}-01`;
}

export default function NavigationWithinAWindow() {
  const [month, setMonth] = useState(getMonthStart(FIRST_DAY));
  const [active, setActive] = useState(FIRST_DAY);
  const hintId = useId();

  const isFirstMonth = month === getMonthStart(FIRST_DAY);
  const isLastMonth = month === getMonthStart(LAST_DAY);

  const showMonth = (amount: number) => {
    const next = addMonths(month, amount);
    setMonth(next);
    setActive(next < FIRST_DAY ? FIRST_DAY : next);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', justifyItems: 'start', width: '100%' }}>
      <CalendarBase compact>
        <CalendarBaseHeader>
          <CalendarBaseControlIconButton aria-label='Previous month' disabled={isFirstMonth} onClick={() => showMonth(-1)}>
            <Icon><ChevronLeft /></Icon>
          </CalendarBaseControlIconButton>
          <Text fontWeight={600} style={{ alignSelf: 'center' }}>{monthFormat.format(new Date(month))}</Text>
          <CalendarBaseControlIconButton aria-label='Next month' disabled={isLastMonth} onClick={() => showMonth(1)}>
            <Icon><ChevronRight /></Icon>
          </CalendarBaseControlIconButton>
        </CalendarBaseHeader>
        <DayPicker
          aria-label='Return date'
          aria-describedby={hintId}
          locale={LOCALE}
          month={month}
          from={FIRST_DAY}
          to={LAST_DAY}
          active={active}
          onChangeActive={setActive}
        >
          <CalendarBaseWeekLabels>
            {weekdays.map((weekday) => (
              <CalendarBaseWeekLabel key={weekday}>{weekday}</CalendarBaseWeekLabel>
            ))}
          </CalendarBaseWeekLabels>
          <DayPickerLayout weekStartsOn={WEEK_START}>
            <DayPickerCell />
          </DayPickerLayout>
        </DayPicker>
      </CalendarBase>
      <HelperText id={hintId}>Returns are accepted from November 16 to January 15.</HelperText>
    </div>
  );
}
