import {
  Grid,
  GridCell,
  GridRow,
  GridRowGroup,
} from '@vega-ui/react';
import './examples.css';

export default function SelectionMinimalComposition() {
  return (
    <Grid aria-label='Quarter' selection='single' defaultActive='q1' className='selectableGrid'>
      <GridRowGroup>
        <GridRow row={0}>
          <GridCell col={0} value='q1'>Q1</GridCell>
          <GridCell col={1} value='q2'>Q2</GridCell>
        </GridRow>
        <GridRow row={1}>
          <GridCell col={0} value='q3'>Q3</GridCell>
          <GridCell col={1} value='q4'>Q4</GridCell>
        </GridRow>
      </GridRowGroup>
    </Grid>
  );
}
