import { Combobox, ComboboxIcon, ComboboxInput, ComboboxListbox, ComboboxTrigger, HelperText, Label, ListboxOption, TextField } from '@vega-ui/react';
import { ChangeEvent, useId, useState } from 'react';

const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
  'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
];

export default function InlineCompletion() {
  const id = useId();
  const hintId = `${id}-hint`;
  const [text, setText] = useState('');
  const [query, setQuery] = useState('');
  const [state, setState] = useState<string | null>(null);
  const matches = states.filter((name) => name.toLowerCase().startsWith(query.toLowerCase()));

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, selectionStart, selectionEnd } = event.target;

    setText(value);
    setQuery(selectionEnd === value.length ? value.slice(0, selectionStart ?? undefined) : value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor={id}>State</Label>
      <Combobox autocomplete='both' value={state} onChangeValue={(next) => setState(next)}>
        <TextField>
          <ComboboxInput id={id} aria-describedby={hintId} value={text} onChange={onChange} />
          <ComboboxTrigger aria-label='Show states'>
            <ComboboxIcon />
          </ComboboxTrigger>
        </TextField>
        <ComboboxListbox aria-label='States'>
          {matches.map((name) => <ListboxOption key={name} value={name}>{name}</ListboxOption>)}
        </ComboboxListbox>
      </Combobox>
      <HelperText id={hintId}>
        {state === null ? 'Type the first letters, then press Enter or Tab to accept.' : `Shipping rates for ${state}.`}
      </HelperText>
    </div>
  );
}
