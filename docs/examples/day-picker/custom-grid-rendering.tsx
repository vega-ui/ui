import {
  DayPicker,
  DayPickerItem,
  DayPickerRow,
  DayPickerRowGroup,
  GridColumnHeader,
  Text,
  createDayPickerGrid,
} from '@vega-ui/react';

const MONTH = '2026-11-01';
const WORK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const weeks = createDayPickerGrid({ month: MONTH, weekStartsOn: 1 }).filter(({ data }) =>
  data.slice(0, 5).some(({ inCurrentMonth }) => inCurrentMonth)
);

export default function CustomGridRendering() {
  return (
    <DayPicker aria-label='Workdays' locale='en-US' defaultFocusedDate={MONTH} style={{ inlineSize: 'fit-content' }}>
      <DayPickerRow row={-1}>
        {WORK_DAYS.map((weekday, col) => (
          <GridColumnHeader key={weekday} col={col} excluded asChild>
            <Text size={2} style={{ color: 'var(--label-tertiary)', minBlockSize: 'var(--spacing-18)' }}>
              {weekday}
            </Text>
          </GridColumnHeader>
        ))}
      </DayPickerRow>
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
