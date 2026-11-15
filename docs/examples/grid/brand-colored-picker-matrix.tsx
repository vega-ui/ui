import { type CSSProperties } from 'react';
import {
  Grid,
  GridCell,
  GridItem,
  GridRow,
  GridRowGroup,
} from '@vega-ui/react';

const amounts = [[5, 10, 15], [20, 50, 100]];
const roundItem = { '--grid-item-br-ratio': 0.5 } as CSSProperties;

export default function BrandColoredPickerMatrix() {
  return (
    <Grid
      aria-label='Tip amount, USD'
      selection='single'
      wrap='horizontal'
      defaultValue={15}
      defaultActive={15}
      style={{ width: 240 }}
    >
      <GridRowGroup>
        {amounts.map((row, rowIndex) => (
          <GridRow key={rowIndex} row={rowIndex}>
            {row.map((amount, col) => (
              <GridCell key={amount} col={col} value={amount} asChild>
                <GridItem variant='primary' size='lg' style={roundItem}>${amount}</GridItem>
              </GridCell>
            ))}
          </GridRow>
        ))}
      </GridRowGroup>
    </Grid>
  );
}
