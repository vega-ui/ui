import {
  Grid,
  GridCell,
  GridItem,
  GridRow,
  GridRowGroup,
} from '@vega-ui/react';

const months = [
  ['Jan', 'Feb', 'Mar', 'Apr'],
  ['May', 'Jun', 'Jul', 'Aug'],
  ['Sep', 'Oct', 'Nov', 'Dec'],
];

export default function CompactMonthLikeMatrix() {
  return (
    <Grid
      aria-label='Statement month, 2026'
      selection='single'
      wrap='horizontal'
      defaultValue='2026-05'
      defaultActive='2026-05'
      style={{ width: 280 }}
    >
      <GridRowGroup>
        {months.map((row, rowIndex) => (
          <GridRow key={rowIndex} row={rowIndex}>
            {row.map((month, col) => {
              const value = `2026-${String(rowIndex * 4 + col + 1).padStart(2, '0')}`;

              return (
                <GridCell key={month} col={col} value={value} asChild>
                  <GridItem size='sm'>{month}</GridItem>
                </GridCell>
              );
            })}
          </GridRow>
        ))}
      </GridRowGroup>
    </Grid>
  );
}
