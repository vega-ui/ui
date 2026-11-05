import {
  CalendarBase,
  CalendarBaseControlIconButton,
  CalendarBaseHeader,
  CalendarBaseWeekLabel,
  CalendarBaseWeekLabels,
  DayPicker,
  DayPickerItem,
  DayPickerRow,
  DayPickerRowGroup,
  Icon,
  Text,
} from '@vega-ui/react';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { useState } from 'react';

const LOCALE = 'en-GB';
const DAY = 86_400_000;
const weekdayFormat = new Intl.DateTimeFormat(LOCALE, { weekday: 'short', timeZone: 'UTC' });
const dayFormat = new Intl.DateTimeFormat(LOCALE, { day: 'numeric', timeZone: 'UTC' });
const rangeFormat = new Intl.DateTimeFormat(LOCALE, { day: 'numeric', month: 'short', timeZone: 'UTC' });
const fullyBooked = ['2026-11-04', '2026-11-12'];

function getWeek(monday: string) {
  return Array.from({ length: 7 }, (_, index) => new Date(Date.parse(monday) + index * DAY).toISOString().slice(0, 10));
}

function addWeeks(monday: string, amount: number) {
  return new Date(Date.parse(monday) + amount * 7 * DAY).toISOString().slice(0, 10);
}

export default function SharedWeekdayRow() {
  const [monday, setMonday] = useState('2026-11-02');
  const [active, setActive] = useState('2026-11-02');
  const [selected, setSelected] = useState<string | null>(null);

  const week = getWeek(monday);

  const showWeek = (amount: number) => {
    const next = addWeeks(monday, amount);
    setMonday(next);
    setActive(next);
  };

  return (
    <CalendarBase compact>
      <CalendarBaseHeader>
        <CalendarBaseControlIconButton aria-label='Previous week' onClick={() => showWeek(-1)}>
          <Icon><ChevronLeft /></Icon>
        </CalendarBaseControlIconButton>
        <Text fontWeight={600} style={{ alignSelf: 'center' }}>
          {rangeFormat.format(new Date(week[0]))} – {rangeFormat.format(new Date(week[6]))}
        </Text>
        <CalendarBaseControlIconButton aria-label='Next week' onClick={() => showWeek(1)}>
          <Icon><ChevronRight /></Icon>
        </CalendarBaseControlIconButton>
      </CalendarBaseHeader>
      <DayPicker
        aria-label='Appointment day'
        locale={LOCALE}
        month={monday}
        active={active}
        onChangeActive={setActive}
        selected={selected}
        onSelectCell={setSelected}
        disabled={fullyBooked}
      >
        <CalendarBaseWeekLabels>
          {week.map((day) => (
            <CalendarBaseWeekLabel key={day}>{weekdayFormat.format(new Date(day))}</CalendarBaseWeekLabel>
          ))}
        </CalendarBaseWeekLabels>
        <DayPickerRowGroup>
          <DayPickerRow row={0}>
            {week.map((day, col) => (
              <DayPickerItem key={day} col={col} value={day}>{dayFormat.format(new Date(day))}</DayPickerItem>
            ))}
          </DayPickerRow>
        </DayPickerRowGroup>
      </DayPicker>
    </CalendarBase>
  );
}
