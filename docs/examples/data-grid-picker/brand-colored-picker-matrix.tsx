import { type CSSProperties } from 'react';
import {
  DataGridPicker,
  DataGridPickerItem,
  DataGridPickerRow,
  DataGridPickerRowGroup,
} from '@vega-ui/react';

const amounts = [[5, 10, 15], [20, 50, 100]];
const roundItem = { '--data-grid-picker-item-br-ratio': 0.5 } as CSSProperties;

export default function BrandColoredPickerMatrix() {
  return (
    <DataGridPicker
      aria-label='Tip amount, USD'
      variant='primary'
      size='lg'
      defaultSelected={15}
      defaultActive={15}
      style={{ width: 240 }}
    >
      <DataGridPickerRowGroup>
        {amounts.map((row, rowIndex) => (
          <DataGridPickerRow key={rowIndex} row={rowIndex}>
            {row.map((amount, col) => (
              <DataGridPickerItem key={amount} col={col} value={amount} style={roundItem}>${amount}</DataGridPickerItem>
            ))}
          </DataGridPickerRow>
        ))}
      </DataGridPickerRowGroup>
    </DataGridPicker>
  );
}
