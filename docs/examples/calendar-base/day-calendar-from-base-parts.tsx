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

const LOCALE = 'en-GB';
const WEEK_START = 1;
const weekdayFormat = new Intl.DateTimeFormat(LOCALE, { weekday: 'short', timeZone: 'UTC' });
const monthFormat = new Intl.DateTimeFormat(LOCALE, { month: 'long', year: 'numeric', timeZone: 'UTC' });
const weekdays = Array.from({ length: 7 }, (_, index) => weekdayFormat.format(Date.UTC(2026, 10, 1 + WEEK_START + index)));

function addMonths(month: string, amount: number) {
  const date = new Date(month);
  date.setUTCMonth(date.getUTCMonth() + amount);

  return date.toISOString().slice(0, 10);
}

export default function DayCalendarFromBaseParts() {
  const [month, setMonth] = useState('2026-11-01');
  const [active, setActive] = useState('2026-11-01');
  const [selected, setSelected] = useState<string | null>(null);

  const showMonth = (amount: number) => {
    const next = addMonths(month, amount);
    setMonth(next);
    setActive(next);
  };

  return (
    <CalendarBase compact>
      <CalendarBaseHeader>
        <CalendarBaseControlIconButton aria-label='Previous month' onClick={() => showMonth(-1)}>
          <Icon><ChevronLeft /></Icon>
        </CalendarBaseControlIconButton>
        <Text fontWeight={600} aria-live='polite' style={{ alignSelf: 'center' }}>
          {monthFormat.format(new Date(month))}
        </Text>
        <CalendarBaseControlIconButton aria-label='Next month' onClick={() => showMonth(1)}>
          <Icon><ChevronRight /></Icon>
        </CalendarBaseControlIconButton>
      </CalendarBaseHeader>
      <DayPicker
        aria-label={monthFormat.format(new Date(month))}
        locale={LOCALE}
        month={month}
        active={active}
        onChangeActive={setActive}
        selected={selected}
        onSelectCell={setSelected}
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
  );
}
