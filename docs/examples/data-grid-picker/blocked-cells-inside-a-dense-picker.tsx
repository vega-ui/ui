import {
  DataGridPicker,
  DataGridPickerItem,
  DataGridPickerRow,
  DataGridPickerRowGroup,
  HelperText,
} from '@vega-ui/react';

const sizes = [[36, 37, 38, 39, 40, 41], [42, 43, 44, 45, 46, 47]];
const soldOut = [37, 41, 42, 46];

export default function BlockedCellsInsideADensePicker() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 300 }}>
      <DataGridPicker
        aria-label='Shoe size, EU'
        aria-describedby='shoe-size-hint'
        size='sm'
        disabled={soldOut}
        defaultActive={36}
        style={{ width: '100%' }}
      >
        <DataGridPickerRowGroup>
          {sizes.map((row, rowIndex) => (
            <DataGridPickerRow key={rowIndex} row={rowIndex}>
              {row.map((size, col) => (
                <DataGridPickerItem key={size} col={col} value={size} aria-label={soldOut.includes(size) ? `${size}, sold out` : String(size)}>
                  {size}
                </DataGridPickerItem>
              ))}
            </DataGridPickerRow>
          ))}
        </DataGridPickerRowGroup>
      </DataGridPicker>
      <HelperText id='shoe-size-hint'>Sold-out sizes are skipped by the arrow keys.</HelperText>
    </div>
  );
}
