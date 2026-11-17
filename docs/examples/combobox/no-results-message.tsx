import { Combobox, ComboboxIcon, ComboboxInput, ComboboxListbox, ComboboxTrigger, HelperText, Label, ListboxOption, TextField } from '@vega-ui/react';
import { useId, useState } from 'react';

const languages = [
  'Arabic', 'Bengali', 'Chinese', 'Dutch', 'English', 'French', 'German', 'Hindi', 'Indonesian', 'Italian',
  'Japanese', 'Korean', 'Polish', 'Portuguese', 'Russian', 'Spanish', 'Swahili', 'Turkish', 'Ukrainian', 'Vietnamese',
];

export default function NoResultsMessage() {
  const id = useId();
  const statusId = `${id}-status`;
  const [query, setQuery] = useState('');
  const normalized = query.trim().toLowerCase();
  const matches = languages.filter((language) => language.toLowerCase().includes(normalized));
  const empty = normalized !== '' && matches.length === 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor={id}>Subtitles</Label>
      <Combobox>
        <TextField>
          <ComboboxInput
            id={id}
            placeholder='Search languages'
            aria-describedby={statusId}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxTrigger aria-label='Show languages'>
            <ComboboxIcon />
          </ComboboxTrigger>
        </TextField>
        <ComboboxListbox aria-label='Languages'>
          {matches.map((language) => <ListboxOption key={language} value={language}>{language}</ListboxOption>)}
        </ComboboxListbox>
      </Combobox>
      <HelperText id={statusId} role='status'>
        {empty ? `No subtitles in “${query.trim()}” yet. Try another language.` : 'Subtitles are available in 20 languages.'}
      </HelperText>
    </div>
  );
}
