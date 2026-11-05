import {
  DayPicker,
  DayPickerCell,
  DayPickerLayout,
  useDayPickerCellContext,
} from '@vega-ui/react';

const events: Record<string, string[]> = {
  '2026-11-04': ['Design review', 'Sprint planning'],
  '2026-11-12': ['Release 3.2'],
  '2026-11-18': ['Team offsite', 'Retro', 'Demo day'],
};

function EventDay() {
  const { date, label } = useDayPickerCellContext();
  const count = date === undefined ? 0 : (events[date]?.length ?? 0);

  if (count === 0) return <DayPickerCell />;

  return (
    <DayPickerCell aria-label={`${label}, ${count} ${count === 1 ? 'event' : 'events'}`}>
      <span style={{ display: 'grid', justifyItems: 'center', lineHeight: 1 }}>
        <span>{label}</span>
        <span aria-hidden style={{ fontSize: '0.6em', color: 'var(--label-secondary)' }}>{'•'.repeat(count)}</span>
      </span>
    </DayPickerCell>
  );
}

export default function CellTemplate() {
  return (
    <DayPicker aria-label='Team events, November 2026' locale='en-US' month='2026-11-01' size='sm'>
      <DayPickerLayout>
        <EventDay />
      </DayPickerLayout>
    </DayPicker>
  );
}
