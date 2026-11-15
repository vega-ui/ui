import {
  Grid,
  GridCell,
  GridItem,
  GridRow,
  GridRowGroup,
} from '@vega-ui/react';

export default function ItemMinimalComposition() {
  return (
    <Grid aria-label='Plan length' selection='single' wrap='horizontal' defaultActive='1m' style={{ width: 240 }}>
      <GridRowGroup>
        <GridRow row={0}>
          <GridCell col={0} value='1m' asChild>
            <GridItem>1 mo</GridItem>
          </GridCell>
          <GridCell col={1} value='6m' asChild>
            <GridItem>6 mo</GridItem>
          </GridCell>
          <GridCell col={2} value='12m' asChild>
            <GridItem>12 mo</GridItem>
          </GridCell>
        </GridRow>
      </GridRowGroup>
    </Grid>
  );
}
