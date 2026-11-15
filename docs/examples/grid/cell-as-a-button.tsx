import { useId, useState } from 'react';
import {
  Grid,
  GridCell,
  GridRow,
  GridRowGroup,
  Label,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import './examples.css';

const symbols = [
  [{ symbol: '°', name: 'Degree sign' }, { symbol: '±', name: 'Plus-minus' }, { symbol: '×', name: 'Multiplication' }, { symbol: '÷', name: 'Division' }],
  [{ symbol: '—', name: 'Em dash' }, { symbol: '…', name: 'Ellipsis' }, { symbol: '←', name: 'Left arrow' }, { symbol: '→', name: 'Right arrow' }],
  [{ symbol: '€', name: 'Euro' }, { symbol: '£', name: 'Pound' }, { symbol: '©', name: 'Copyright' }, { symbol: '™', name: 'Trademark' }],
];

export default function CellAsAButton() {
  const id = useId();
  const [note, setNote] = useState('Oven at 180');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', inlineSize: 'min(100%, 280px)' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
        <Label htmlFor={id}>Note</Label>
        <TextField>
          <TextFieldInput id={id} value={note} onChange={(event) => setNote(event.target.value)} />
        </TextField>
      </div>
      <Grid aria-label='Symbols' wrap='horizontal' defaultActive='0:0' className='selectableGrid symbolPalette'>
        <GridRowGroup>
          {symbols.map((line, row) => (
            <GridRow key={row} row={row}>
              {line.map((item, col) => (
                <GridCell key={item.name} col={col} asChild>
                  <button type='button' aria-label={item.name} onClick={() => setNote(note + item.symbol)}>
                    {item.symbol}
                  </button>
                </GridCell>
              ))}
            </GridRow>
          ))}
        </GridRowGroup>
      </Grid>
    </div>
  );
}
