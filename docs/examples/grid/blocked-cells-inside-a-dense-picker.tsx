import {
  Grid,
  GridCell,
  GridItem,
  GridRow,
  GridRowGroup,
  HelperText,
} from '@vega-ui/react';

const sizes = [[36, 37, 38, 39, 40, 41], [42, 43, 44, 45, 46, 47]];
const soldOut = [37, 41, 42, 46];

export default function BlockedCellsInsideADensePicker() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 300 }}>
      <Grid
        aria-label='Shoe size, EU'
        aria-describedby='shoe-size-hint'
        selection='single'
        wrap='horizontal'
        disabled={soldOut}
        defaultActive={36}
        style={{ width: '100%' }}
      >
        <GridRowGroup>
          {sizes.map((row, rowIndex) => (
            <GridRow key={rowIndex} row={rowIndex}>
              {row.map((size, col) => (
                <GridCell key={size} col={col} value={size} aria-label={soldOut.includes(size) ? `${size}, sold out` : String(size)} asChild>
                  <GridItem size='sm'>{size}</GridItem>
                </GridCell>
              ))}
            </GridRow>
          ))}
        </GridRowGroup>
      </Grid>
      <HelperText id='shoe-size-hint'>Sold-out sizes are skipped by the arrow keys.</HelperText>
    </div>
  );
}
