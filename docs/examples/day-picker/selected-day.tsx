import {
  Button,
  DayPicker,
  DayPickerCell,
  DayPickerLayout,
  Text,
} from '@vega-ui/react';
import { useState } from 'react';

export const locales = ['en-US', 'ru-RU', 'ar-EG', 'he-IL'];

export default function SelectedDay({ locale = 'en-US' }: { locale?: string }) {
  const dateFormat = new Intl.DateTimeFormat(locale, { dateStyle: 'full', timeZone: 'UTC' });

  const [due, setDue] = useState<string | null>('2026-11-20');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start', width: '100%' }}>
      <DayPicker aria-label='Invoice due date, November 2026' locale={locale} month='2026-11-01' selected={due} onSelectCell={setDue}>
        <DayPickerLayout>
          <DayPickerCell />
        </DayPickerLayout>
      </DayPicker>
      <Text aria-live='polite' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>Due: {due ? dateFormat.format(new Date(due)) : 'not set'}</Text>
      <Button size='sm' variant='secondary' appearance='ghost' disabled={due === null} onClick={() => setDue(null)}>Clear due date</Button>
    </div>
  );
}
