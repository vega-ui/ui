import { Button, HelperText, Label, TextArea } from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

const LIMIT = 160;

export default function SoftLimitError() {
  const id = useId();
  const messageId = `${id}-message`;
  const [bio, setBio] = useState(
    'Product designer at Northwind. I work on billing, onboarding and everything in between, and I spend weekends restoring old film cameras and hiking the coastal trails near Porto.',
  );
  const over = bio.length - LIMIT;
  const invalid = over > 0;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={id}>Short bio</Label>
        <TextArea
          id={id}
          rows={6}
          fullWidth
          value={bio}
          error={invalid}
          aria-invalid={invalid}
          aria-describedby={messageId}
          onChange={(event) => setBio(event.currentTarget.value)}
        />
        <HelperText id={messageId} error={invalid}>
          {invalid ? `${over} characters over the ${LIMIT}-character limit.` : `${LIMIT - bio.length} characters left.`}
        </HelperText>
      </div>
      <Button type='submit' disabled={invalid} style={{ justifySelf: 'start' }}>Save bio</Button>
    </form>
  );
}
