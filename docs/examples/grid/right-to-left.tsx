import {
  Grid,
  GridCell,
  GridColumnHeader,
  GridRow,
  GridRowGroup,
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
      <Grid aria-label='סידור משמרות' defaultActive='1:0' className='gridSheet'>
        <GridRowGroup>
          <GridRow row={0}>
            {days.map((day, col) => (
              <GridColumnHeader key={day} col={col} excluded>{day}</GridColumnHeader>
            ))}
          </GridRow>
        </GridRowGroup>
        <GridRowGroup>
          {shifts.map((row, index) => (
            <GridRow key={index} row={index + 1}>
              {row.map((shift, col) => (
                <GridCell key={days[col]} col={col}>{shift}</GridCell>
              ))}
            </GridRow>
          ))}
        </GridRowGroup>
      </Grid>
    </div>
  );
}
