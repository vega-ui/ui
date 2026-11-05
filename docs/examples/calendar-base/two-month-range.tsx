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

export const locales = ['en-US', 'ru-RU', 'ar-EG', 'he-IL'];
const WEEK_START = 0;

function addMonths(month: string, amount: number) {
  const date = new Date(month);
  date.setUTCMonth(date.getUTCMonth() + amount);

  return date.toISOString().slice(0, 10);
}

export default function TwoMonthRange({ locale = 'en-US' }: { locale?: string }) {
  const weekdayFormat = new Intl.DateTimeFormat(locale, { weekday: 'narrow', timeZone: 'UTC' });
  const monthFormat = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric', timeZone: 'UTC' });
  const rangeFormat = new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric', timeZone: 'UTC' });
  const weekdays = Array.from({ length: 7 }, (_, index) => weekdayFormat.format(Date.UTC(2026, 10, 1 + WEEK_START + index)));

  const [month, setMonth] = useState('2026-11-01');
  const [active, setActive] = useState('2026-11-01');
  const [range, setRange] = useState<string[]>([]);

  const nextMonth = addMonths(month, 1);
  const [start, end] = range;

  const showMonth = (amount: number) => {
    const next = addMonths(month, amount);
    setMonth(next);
    setActive(next);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start', width: '100%' }}>
      <CalendarBase>
        <CalendarBaseHeader>
          <CalendarBaseControlIconButton aria-label='Previous month' onClick={() => showMonth(-1)}>
            <Icon><ChevronLeft /></Icon>
          </CalendarBaseControlIconButton>
          <CalendarBaseControlIconButton aria-label='Next month' onClick={() => showMonth(1)}>
            <Icon><ChevronRight /></Icon>
          </CalendarBaseControlIconButton>
        </CalendarBaseHeader>
        <DayPicker
          aria-label='Trip dates'
          locale={locale}
          selection='range'
          month={month}
          active={active}
          onChangeActive={setActive}
          selected={range}
          onSelectCell={setRange}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'var(--spacing-16)', width: '100%' }}
        >
          {[month, nextMonth].map((visible, index) => (
            <div key={visible} role='presentation' style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
              <Text aria-hidden fontWeight={600} style={{ textAlign: 'center' }}>{monthFormat.format(new Date(visible))}</Text>
              <CalendarBaseWeekLabels>
                {weekdays.map((weekday, col) => (
                  <CalendarBaseWeekLabel key={col}>{weekday}</CalendarBaseWeekLabel>
                ))}
              </CalendarBaseWeekLabels>
              <DayPickerLayout
                aria-label={monthFormat.format(new Date(visible))}
                month={visible}
                offset={index}
                weekStartsOn={WEEK_START}
              >
                <DayPickerCell />
              </DayPickerLayout>
            </div>
          ))}
        </DayPicker>
      </CalendarBase>
      <Text aria-live='polite' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
        {start && end ? rangeFormat.formatRange(new Date(start), new Date(end)) : 'Pick departure and return'}
      </Text>
    </div>
  );
}
