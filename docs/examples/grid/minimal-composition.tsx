import {
  Grid,
  GridCell,
  GridRow,
  GridRowGroup,
} from '@vega-ui/react';
import './examples.css';

export default function MinimalComposition() {
  return (
    <Grid aria-label='Release checklist' defaultActive='0:0' className='gridSheet'>
      <GridRowGroup>
        <GridRow row={0}>
          <GridCell col={0}>Design</GridCell>
          <GridCell col={1}>Build</GridCell>
          <GridCell col={2}>Ship</GridCell>
        </GridRow>
        <GridRow row={1}>
          <GridCell col={0}>Done</GridCell>
          <GridCell col={1}>In progress</GridCell>
          <GridCell col={2}>Not started</GridCell>
        </GridRow>
      </GridRowGroup>
    </Grid>
  );
}
