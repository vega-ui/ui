import { Combobox, ComboboxIcon, ComboboxInput, ComboboxListbox, ComboboxTrigger, HelperText, Label, ListboxOption, TextField } from '@vega-ui/react';
import { useId } from 'react';

const lengths = ['15 minutes', '30 minutes', '45 minutes', '1 hour', '90 minutes', '2 hours'];

export default function FixedSuggestions() {
  const id = useId();
  const hintId = `${id}-hint`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor={id}>Meeting length</Label>
      <Combobox autocomplete='none'>
        <TextField>
          <ComboboxInput id={id} name='length' placeholder='For example, 50 minutes' aria-describedby={hintId} />
          <ComboboxTrigger aria-label='Show lengths'>
            <ComboboxIcon />
          </ComboboxTrigger>
        </TextField>
        <ComboboxListbox aria-label='Common lengths'>
          {lengths.map((length) => <ListboxOption key={length} value={length}>{length}</ListboxOption>)}
        </ComboboxListbox>
      </Combobox>
      <HelperText id={hintId}>Pick a common length or type your own.</HelperText>
    </div>
  );
}
