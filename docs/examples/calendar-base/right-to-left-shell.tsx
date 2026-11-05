import {
  CalendarBase,
  CalendarBaseControlIconButton,
  CalendarBaseHeader,
  CalendarBaseWeekLabel,
  CalendarBaseWeekLabels,
  DayPicker,
  DayPickerCell,
  DayPickerLayout,
  Icon,
  Text,
} from '@vega-ui/react';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { useState } from 'react';

const LOCALE = 'he-IL';
const WEEK_START = 0;
const weekdayFormat = new Intl.DateTimeFormat(LOCALE, { weekday: 'narrow', timeZone: 'UTC' });
const monthFormat = new Intl.DateTimeFormat(LOCALE, { month: 'long', year: 'numeric', timeZone: 'UTC' });
const weekdays = Array.from({ length: 7 }, (_, index) => weekdayFormat.format(Date.UTC(2026, 10, 1 + WEEK_START + index)));

function addMonths(month: string, amount: number) {
  const date = new Date(month);
  date.setUTCMonth(date.getUTCMonth() + amount);

  return date.toISOString().slice(0, 10);
}

export default function RightToLeftShell() {
  const [month, setMonth] = useState('2026-11-01');
  const [active, setActive] = useState('2026-11-01');

  const showMonth = (amount: number) => {
    const next = addMonths(month, amount);
    setMonth(next);
    setActive(next);
  };

  return (
    <CalendarBase compact dir='rtl' lang={LOCALE}>
      <CalendarBaseHeader>
        <CalendarBaseControlIconButton aria-label='החודש הקודם' onClick={() => showMonth(-1)}>
          <Icon><ChevronRight /></Icon>
        </CalendarBaseControlIconButton>
        <Text fontWeight={600} style={{ alignSelf: 'center' }}>{monthFormat.format(new Date(month))}</Text>
        <CalendarBaseControlIconButton aria-label='החודש הבא' onClick={() => showMonth(1)}>
          <Icon><ChevronLeft /></Icon>
        </CalendarBaseControlIconButton>
      </CalendarBaseHeader>
      <DayPicker aria-label='ימים' locale={LOCALE} month={month} active={active} onChangeActive={setActive}>
        <CalendarBaseWeekLabels>
          {weekdays.map((weekday, col) => (
            <CalendarBaseWeekLabel key={col}>{weekday}</CalendarBaseWeekLabel>
          ))}
        </CalendarBaseWeekLabels>
        <DayPickerLayout weekStartsOn={WEEK_START}>
          <DayPickerCell />
        </DayPickerLayout>
      </DayPicker>
    </CalendarBase>
  );
}
