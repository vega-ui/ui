import {
  Grid,
  GridCell,
  GridRow,
  GridRowGroup,
} from '@vega-ui/react';
import './examples.css';

const keys = [['7', '8', '9'], ['4', '5', '6'], ['1', '2', '3']];

export default function CellSizeTuningAtUsageSite() {
  return (
    <Grid aria-label='Keypad' defaultActive='1:1' className='gridSheet gridCompact'>
      <GridRowGroup>
        {keys.map((row, rowIndex) => (
          <GridRow key={row[0]} row={rowIndex}>
            {row.map((key, col) => (
              <GridCell key={key} col={col}>{key}</GridCell>
            ))}
          </GridRow>
        ))}
      </GridRowGroup>
    </Grid>
  );
}
