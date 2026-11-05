import {
  MonthPicker,
  MonthPickerItem,
  MonthPickerRow,
  MonthPickerRowGroup,
  createMonthPickerGrid,
} from '@vega-ui/react';

const YEAR = '2026-01-01';
const narrowFormat = new Intl.DateTimeFormat('en-US', { month: 'narrow', timeZone: 'UTC' });
const longFormat = new Intl.DateTimeFormat('en-US', { month: 'long', timeZone: 'UTC' });
const rows = createMonthPickerGrid({ year: YEAR, cols: 6 });

export default function CustomGridRendering() {
  return (
    <MonthPicker aria-label='Month, 2026' locale='en-US' year={YEAR} style={{ width: '100%' }}>
      <MonthPickerRowGroup>
        {rows.map(({ row, data }) => (
          <MonthPickerRow key={row} row={row}>
            {data.map(({ col, month }) => (
              <MonthPickerItem key={month} col={col} value={month} aria-label={longFormat.format(new Date(month))}>
                {narrowFormat.format(new Date(month))}
              </MonthPickerItem>
            ))}
          </MonthPickerRow>
        ))}
      </MonthPickerRowGroup>
    </MonthPicker>
  );
}
