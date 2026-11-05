import {
  CalendarBase,
  CalendarBaseControlIconButton,
  CalendarBaseHeader,
  CalendarBaseWeekLabel,
  CalendarBaseWeekLabels,
  Card,
  DayPicker,
  DayPickerCell,
  DayPickerLayout,
  Heading,
  Icon,
  Text,
} from '@vega-ui/react';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { useState } from 'react';

const LOCALE = 'en-US';
const WEEK_START = 0;
const weekdayFormat = new Intl.DateTimeFormat(LOCALE, { weekday: 'narrow', timeZone: 'UTC' });
const longWeekdayFormat = new Intl.DateTimeFormat(LOCALE, { weekday: 'long', timeZone: 'UTC' });
const monthFormat = new Intl.DateTimeFormat(LOCALE, { month: 'short', year: 'numeric', timeZone: 'UTC' });
const weekdays = Array.from({ length: 7 }, (_, index) => Date.UTC(2026, 10, 1 + WEEK_START + index));

function addMonths(month: string, amount: number) {
  const date = new Date(month);
  date.setUTCMonth(date.getUTCMonth() + amount);

  return date.toISOString().slice(0, 10);
}

export default function CompactEmbeddedShell() {
  const [month, setMonth] = useState('2026-11-01');
  const [active, setActive] = useState('2026-11-01');

  const showMonth = (amount: number) => {
    const next = addMonths(month, amount);
    setMonth(next);
    setActive(next);
  };

  return (
    <Card style={{ display: 'grid', gap: 'var(--spacing-6)', inlineSize: 'fit-content' }}>
      <Heading as='h3' size={3}>Team calendar</Heading>
      <CalendarBase compact size='xs'>
        <CalendarBaseHeader>
          <CalendarBaseControlIconButton aria-label='Previous month' onClick={() => showMonth(-1)}>
            <Icon size='xs'><ChevronLeft /></Icon>
          </CalendarBaseControlIconButton>
          <Text size={2} fontWeight={600} style={{ alignSelf: 'center' }}>{monthFormat.format(new Date(month))}</Text>
          <CalendarBaseControlIconButton aria-label='Next month' onClick={() => showMonth(1)}>
            <Icon size='xs'><ChevronRight /></Icon>
          </CalendarBaseControlIconButton>
        </CalendarBaseHeader>
        <DayPicker aria-label='Team calendar' locale={LOCALE} month={month} active={active} onChangeActive={setActive}>
          <CalendarBaseWeekLabels>
            {weekdays.map((date) => (
              <CalendarBaseWeekLabel key={date} aria-label={longWeekdayFormat.format(date)}>
                {weekdayFormat.format(date)}
              </CalendarBaseWeekLabel>
            ))}
          </CalendarBaseWeekLabels>
          <DayPickerLayout weekStartsOn={WEEK_START}>
            <DayPickerCell />
          </DayPickerLayout>
        </DayPicker>
      </CalendarBase>
    </Card>
  );
}
