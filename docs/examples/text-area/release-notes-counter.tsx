import { Label, Text, TextArea } from '@vega-ui/react';
import { useId, useState } from 'react';

const MAX_LENGTH = 280;

export default function ReleaseNotesCounter() {
  const id = useId();
  const counterId = `${id}-counter`;
  const [notes, setNotes] = useState('Faster search across archived invoices.\nDark mode for the billing portal.');
  const lines = notes.split('\n').filter((line) => line.trim() !== '');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={id}>Release highlights</Label>
        <TextArea
          id={id}
          rows={4}
          fullWidth
          value={notes}
          maxLength={MAX_LENGTH}
          aria-describedby={counterId}
          onChange={(event) => setNotes(event.currentTarget.value)}
        />
        <Text id={counterId} size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
          {notes.length} / {MAX_LENGTH} characters
        </Text>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
        <Text size={2} fontWeight={500} style={{ color: 'var(--label-secondary)' }}>Changelog preview</Text>
        <ul style={{ display: 'grid', gap: 'var(--spacing-2)', margin: 0, paddingInlineStart: 'var(--spacing-10)' }}>
          {lines.map((line, index) => (
            <li key={index}><Text size={2} style={{ overflowWrap: 'anywhere' }}>{line}</Text></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
