import {
  DataGrid,
  DataGridCell,
  DataGridRow,
  DataGridRowGroup,
} from '@vega-ui/react';
import './examples.css';

const keys = [['7', '8', '9'], ['4', '5', '6'], ['1', '2', '3']];

export default function CellSizeTuningAtUsageSite() {
  return (
    <DataGrid aria-label='Keypad' defaultActive='1:1' className='dataGridSheet dataGridCompact'>
      <DataGridRowGroup>
        {keys.map((row, rowIndex) => (
          <DataGridRow key={row[0]} row={rowIndex}>
            {row.map((key, col) => (
              <DataGridCell key={key} col={col}>{key}</DataGridCell>
            ))}
          </DataGridRow>
        ))}
      </DataGridRowGroup>
    </DataGrid>
  );
}
