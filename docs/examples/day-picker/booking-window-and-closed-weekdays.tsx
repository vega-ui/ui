import {
  DayPicker,
  DayPickerCell,
  DayPickerLayout,
  HelperText,
} from '@vega-ui/react';
import { useId } from 'react';

const holidays = ['2026-11-26'];

function isClosed(day: string) {
  if (new Date(day).getUTCDay() === 0) return true;

  return holidays.includes(day);
}

export default function BookingWindowAndClosedWeekdays() {
  const hintId = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', justifyItems: 'start', width: '100%' }}>
      <DayPicker
        aria-label='Pickup day'
        aria-describedby={hintId}
        locale='en-US'
        defaultFocusedDate='2026-11-01'
        min='2026-11-03'
        max='2026-11-28'
        disabledDates={isClosed}
      >
        <DayPickerLayout>
          <DayPickerCell />
        </DayPickerLayout>
      </DayPicker>
      <HelperText id={hintId}>
        Pickup from November 3 to 28, Monday to Saturday. Closed on November 26 for Thanksgiving.
      </HelperText>
    </div>
  );
}
