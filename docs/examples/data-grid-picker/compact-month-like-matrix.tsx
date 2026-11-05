import {
  DataGridPicker,
  DataGridPickerItem,
  DataGridPickerRow,
  DataGridPickerRowGroup,
} from '@vega-ui/react';

const months = [
  ['Jan', 'Feb', 'Mar', 'Apr'],
  ['May', 'Jun', 'Jul', 'Aug'],
  ['Sep', 'Oct', 'Nov', 'Dec'],
];

export default function CompactMonthLikeMatrix() {
  return (
    <DataGridPicker
      aria-label='Statement month, 2026'
      size='sm'
      defaultSelected='2026-05'
      defaultActive='2026-05'
      style={{ width: 280 }}
    >
      <DataGridPickerRowGroup>
        {months.map((row, rowIndex) => (
          <DataGridPickerRow key={rowIndex} row={rowIndex}>
            {row.map((month, col) => {
              const value = `2026-${String(rowIndex * 4 + col + 1).padStart(2, '0')}`;

              return (
                <DataGridPickerItem key={month} col={col} value={value}>{month}</DataGridPickerItem>
              );
            })}
          </DataGridPickerRow>
        ))}
      </DataGridPickerRowGroup>
    </DataGridPicker>
  );
}
