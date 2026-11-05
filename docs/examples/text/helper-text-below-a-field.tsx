import { Button, Label, Text, TextField, TextFieldInput } from '@vega-ui/react';
import { useState, type CSSProperties, type FormEvent } from 'react';

const maxLength = 40;

export default function HelperTextBelowAField() {
  const [headline, setHeadline] = useState('');
  const [saved, setSaved] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSaved(`Saved headline: ${data.get('headline')}`);
  };

  const onReset = () => {
    setHeadline('');
    setSaved('');
  };

  return (
    <form onSubmit={onSubmit} onReset={onReset} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='profile-headline'>Profile headline</Label>
        <TextField>
          <TextFieldInput
            id='profile-headline'
            name='headline'
            maxLength={maxLength}
            value={headline}
            aria-describedby='profile-headline-hint profile-headline-count'
            onChange={(event) => setHeadline(event.target.value)}
            required
          />
        </TextField>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--spacing-6)' }}>
          <Text id='profile-headline-hint' size={2} style={{ '--t-color': 'var(--label-secondary)' } as CSSProperties}>
            Shown under your name in comments.
          </Text>
          <Text
            id='profile-headline-count'
            size={2}
            style={{ '--t-color': 'var(--label-tertiary)', fontVariantNumeric: 'tabular-nums', flexShrink: 0 } as CSSProperties}
          >
            {headline.length}/{maxLength}
          </Text>
        </div>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
          <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
          <Button type='submit'>Save</Button>
        </div>
        {saved && <Text size={2} role='status' style={{ '--t-color': 'var(--label-secondary)', overflowWrap: 'anywhere' } as CSSProperties}>{saved}</Text>}
      </div>
    </form>
  );
}
