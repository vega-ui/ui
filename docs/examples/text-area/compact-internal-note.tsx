import { Button, Label, Text, TextArea } from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

interface Note {
  id: number;
  text: string;
}

export default function CompactInternalNote() {
  const id = useId();
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, text: 'Customer asked to move the renewal to March.' },
  ]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const text = String(new FormData(form).get('note')).trim();
    if (text === '') return;

    setNotes((current) => [...current, { id: Date.now(), text }]);
    form.reset();
  };

  return (
    <div
      style={{
        display: 'grid',
        gap: 'var(--spacing-8)',
        width: '100%',
        padding: 'var(--spacing-8)',
        boxSizing: 'border-box',
        borderRadius: 'var(--radius-5)',
        border: '1px solid var(--separator-opaque)',
        background: 'var(--surface-primary)',
      }}
    >
      <ul style={{ display: 'grid', gap: 'var(--spacing-4)', margin: 0, padding: 0, listStyle: 'none' }}>
        {notes.map((note) => (
          <li key={note.id}><Text size={2} style={{ overflowWrap: 'anywhere' }}>{note.text}</Text></li>
        ))}
      </ul>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={id} size='sm'>Internal note</Label>
        <TextArea id={id} name='note' size='sm' rows={2} fullWidth placeholder='Visible to your team only' />
        <Button type='submit' size='sm' variant='secondary' appearance='ghost' style={{ justifySelf: 'end', marginBlockStart: 'var(--spacing-1)' }}>Add note</Button>
      </form>
    </div>
  );
}
