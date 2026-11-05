import { Label, Text, TextField, TextFieldInput } from '@vega-ui/react';
import { useId, useState } from 'react';

const MAX_LENGTH = 60;

export default function CharacterCounterSuffix() {
  const id = useId();
  const counterId = `${id}-counter`;
  const [title, setTitle] = useState('Q3 roadmap review');
  const remaining = MAX_LENGTH - title.length;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Meeting title</Label>
      <TextField>
        <TextFieldInput
          id={id}
          value={title}
          maxLength={MAX_LENGTH}
          aria-describedby={counterId}
          onChange={(event) => setTitle(event.currentTarget.value)}
        />
        <Text
          id={counterId}
          size={2}
          style={{ paddingInlineEnd: 'var(--spacing-6)', whiteSpace: 'nowrap', color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}
        >
          {remaining} left
        </Text>
      </TextField>
      <Text size={2} style={{ color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>
        Calendar preview: {title.trim() === '' ? 'Untitled meeting' : title.trim()}
      </Text>
    </div>
  );
}
