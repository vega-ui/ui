import {
  YearPicker,
  YearPickerItem,
  YearPickerRow,
  YearPickerRowGroup,
  createYearPickerGrid,
} from '@vega-ui/react';

const START = '2020-01-01';
const shortFormat = new Intl.DateTimeFormat('en-US', { year: '2-digit', timeZone: 'UTC' });
const longFormat = new Intl.DateTimeFormat('en-US', { year: 'numeric', timeZone: 'UTC' });
const rows = createYearPickerGrid({ start: START, rows: 2, cols: 5 });

export default function CustomGridRendering() {
  return (
    <YearPicker aria-label='Season, 2020s' locale='en-US' year={START} style={{ width: '100%' }}>
      <YearPickerRowGroup>
        {rows.map(({ row, data }) => (
          <YearPickerRow key={row} row={row}>
            {data.map(({ col, year }) => (
              <YearPickerItem key={year} col={col} value={year} aria-label={longFormat.format(new Date(year))}>
                ’{shortFormat.format(new Date(year))}
              </YearPickerItem>
            ))}
          </YearPickerRow>
        ))}
      </YearPickerRowGroup>
    </YearPicker>
  );
}
