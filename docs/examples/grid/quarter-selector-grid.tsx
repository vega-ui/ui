import {
  Grid,
  GridCell,
  GridRow,
  GridRowGroup,
  GridRowHeader,
} from '@vega-ui/react';
import './examples.css';

const years = [2024, 2025, 2026];
const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

export default function QuarterSelectorGrid() {
  return (
    <Grid
      aria-label='Reporting quarter'
      selection='single'
      defaultValue='FY2025-Q3'
      defaultActive='FY2025-Q3'
      className='selectableGrid'
    >
      <GridRowGroup>
        {years.map((year, row) => (
          <GridRow key={year} row={row}>
            <GridRowHeader col={0} excluded>FY{year}</GridRowHeader>
            {quarters.map((quarter, col) => (
              <GridCell
                key={quarter}
                col={col + 1}
                value={`FY${year}-${quarter}`}
                aria-label={`${quarter} FY${year}`}
              >
                {quarter}
              </GridCell>
            ))}
          </GridRow>
        ))}
      </GridRowGroup>
    </Grid>
  );
}
