import {
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
  Spinner,
  Text,
} from '@vega-ui/react';
import { useState } from 'react';

const dateFormat = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeZone: 'UTC' });

function saveMeeting(date: string) {
  return new Promise<string>((resolve) => setTimeout(() => resolve(date), 1500));
}

export default function WholeCalendarWhileSaving() {
  const [date, setDate] = useState('2026-11-02');
  const [saving, setSaving] = useState(false);

  const reschedule = async (next: string) => {
    setDate(next);
    setSaving(true);
    await saveMeeting(next);
    setSaving(false);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start', width: '100%' }}>
      <Calendar locale='en-US' disabled={saving} value={date} onChangeValue={reschedule}>
        <CalendarHeader>
          <CalendarPrevButton aria-label='Previous' />
          <CalendarViewButtonGroup>
            <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
            <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
          </CalendarViewButtonGroup>
          <CalendarNextButton aria-label='Next' />
        </CalendarHeader>
        <CalendarContent>
          <CalendarDays aria-label='Meeting date'>
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
      <div aria-live='polite' style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <Text>
          {saving ? `Moving the meeting to ${dateFormat.format(new Date(date))}…` : `Meeting on ${dateFormat.format(new Date(date))}`}
        </Text>
        {saving && <Spinner size={2} aria-label='Saving' />}
      </div>
    </div>
  );
}
