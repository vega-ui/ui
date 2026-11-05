import {
  CalendarBaseWeekLabel,
  CalendarBaseWeekLabels,
  DayPicker,
  DayPickerItem,
  DayPickerRow,
  DayPickerRowGroup,
  createDayPickerGrid,
} from '@vega-ui/react';

const MONTH = '2026-11-01';
const WORK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const weeks = createDayPickerGrid({ month: MONTH, weekStartsOn: 1 }).filter(({ data }) =>
  data.slice(0, 5).some(({ inCurrentMonth }) => inCurrentMonth)
);

export default function CustomGridRendering() {
  return (
    <DayPicker aria-label='Workdays, November 2026' locale='en-US' month={MONTH} style={{ inlineSize: 'fit-content' }}>
      <CalendarBaseWeekLabels style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
        {WORK_DAYS.map((weekday) => (
          <CalendarBaseWeekLabel key={weekday}>{weekday}</CalendarBaseWeekLabel>
        ))}
      </CalendarBaseWeekLabels>
      <DayPickerRowGroup>
        {weeks.map(({ row, data }) => (
          <DayPickerRow key={row} row={row}>
            {data.slice(0, 5).map(({ col, date, day, inCurrentMonth }) => (
              <DayPickerItem key={col} col={col} value={date} disabled={!inCurrentMonth} excluded={!inCurrentMonth}>
                {inCurrentMonth ? day : ''}
              </DayPickerItem>
            ))}
          </DayPickerRow>
        ))}
      </DayPickerRowGroup>
    </DayPicker>
  );
}
