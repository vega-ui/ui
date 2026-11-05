import {
  DataGrid,
  DataGridCell,
  DataGridRow,
  DataGridRowGroup,
} from '@vega-ui/react';
import './examples.css';

const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי'];
const shifts = [
  ['בוקר', 'בוקר', 'חופש', 'ערב', 'ערב'],
  ['ערב', 'חופש', 'בוקר', 'בוקר', 'חופש'],
];

export default function RightToLeft() {
  return (
    <div dir='rtl' lang='he'>
      <DataGrid aria-label='סידור משמרות' defaultActive='0:0' className='dataGridSheet'>
        <DataGridRowGroup>
          <DataGridRow row={0}>
            {days.map((day, col) => (
              <DataGridCell key={day} col={col} role='columnheader'>{day}</DataGridCell>
            ))}
          </DataGridRow>
        </DataGridRowGroup>
        <DataGridRowGroup>
          {shifts.map((row, index) => (
            <DataGridRow key={index} row={index + 1}>
              {row.map((shift, col) => (
                <DataGridCell key={days[col]} col={col}>{shift}</DataGridCell>
              ))}
            </DataGridRow>
          ))}
        </DataGridRowGroup>
      </DataGrid>
    </div>
  );
}
