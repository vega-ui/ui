import { Button, HelperText, Label, Text, TextArea } from '@vega-ui/react';
import { FormEvent, KeyboardEvent, useId, useState } from 'react';

export default function SupportRequestForm() {
  const id = useId();
  const [sent, setSent] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = String(new FormData(event.currentTarget).get('message'));
    setSent(`Sent ${message.length} characters`);
    event.currentTarget.reset();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Enter') return;
    if (!event.metaKey && !event.ctrlKey) return;

    event.preventDefault();
    event.currentTarget.form?.requestSubmit();
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={id}>Message to support</Label>
        <TextArea
          id={id}
          name='message'
          rows={5}
          fullWidth
          required
          minLength={20}
          aria-describedby={`${id}-hint`}
          onKeyDown={onKeyDown}
        />
        <HelperText id={`${id}-hint`}>At least 20 characters. Press Ctrl+Enter or ⌘+Enter to send.</HelperText>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <Button type='submit'>Send request</Button>
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{sent}</Text>
      </div>
    </form>
  );
}
