import {
  CalendarBase,
  CalendarBaseControlIconButton,
  CalendarBaseHeader,
  CalendarBasePickerButton,
  CalendarBaseWeekLabel,
  CalendarBaseWeekLabels,
  DayPicker,
  DayPickerCell,
  DayPickerLayout,
  Icon,
  MonthPicker,
  MonthPickerCell,
  MonthPickerLayout,
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

export default function HeaderWithDynamicLabels({ locale = 'en-US' }: { locale?: string }) {
  const weekdayFormat = new Intl.DateTimeFormat(locale, { weekday: 'short', timeZone: 'UTC' });
  const monthFormat = new Intl.DateTimeFormat(locale, { month: 'long', timeZone: 'UTC' });
  const yearFormat = new Intl.DateTimeFormat(locale, { year: 'numeric', timeZone: 'UTC' });
  const weekdays = Array.from({ length: 7 }, (_, index) => weekdayFormat.format(Date.UTC(2026, 10, 1 + WEEK_START + index)));

  const [view, setView] = useState<'day' | 'month'>('day');
  const [month, setMonth] = useState('2026-11-01');
  const [active, setActive] = useState('2026-11-01');

  const step = view === 'day' ? 1 : 12;

  const showMonth = (next: string) => {
    setMonth(next);
    setActive(next);
  };

  const pickMonth = (next: string) => {
    showMonth(next);
    setView('day');
  };

  const toggleView = () => {
    setActive(month);
    setView(view === 'day' ? 'month' : 'day');
  };

  return (
    <CalendarBase compact>
      <CalendarBaseHeader>
        <CalendarBaseControlIconButton
          aria-label={view === 'day' ? 'Previous month' : 'Previous year'}
          onClick={() => showMonth(addMonths(month, -step))}
        >
          <Icon><ChevronLeft /></Icon>
        </CalendarBaseControlIconButton>
        <CalendarBasePickerButton aria-pressed={view === 'month'} onClick={toggleView}>
          {monthFormat.format(new Date(month))} {yearFormat.format(new Date(month))}
        </CalendarBasePickerButton>
        <CalendarBaseControlIconButton
          aria-label={view === 'day' ? 'Next month' : 'Next year'}
          onClick={() => showMonth(addMonths(month, step))}
        >
          <Icon><ChevronRight /></Icon>
        </CalendarBaseControlIconButton>
      </CalendarBaseHeader>
      {view === 'day' && (
        <DayPicker aria-label='Days' locale={locale} month={month} active={active} onChangeActive={setActive}>
          <CalendarBaseWeekLabels>
            {weekdays.map((weekday) => (
              <CalendarBaseWeekLabel key={weekday}>{weekday}</CalendarBaseWeekLabel>
            ))}
          </CalendarBaseWeekLabels>
          <DayPickerLayout weekStartsOn={WEEK_START}>
            <DayPickerCell />
          </DayPickerLayout>
        </DayPicker>
      )}
      {view === 'month' && (
        <MonthPicker
          aria-label='Months'
          locale={locale}
          year={month}
          active={active}
          onChangeActive={setActive}
          selected={month}
          onSelectCell={pickMonth}
        >
          <MonthPickerLayout format='short'>
            <MonthPickerCell />
          </MonthPickerLayout>
        </MonthPicker>
      )}
    </CalendarBase>
  );
}
