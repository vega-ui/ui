# Text Patterns

## Helper Copy Below A Field

When to use:

- a field needs short explanatory text

Composition notes:

- keep helper copy secondary in tone
- place it close to the associated field

Trade-offs:

- improves clarity
- adds vertical density

<!-- example: text/helper-text-below-a-field.tsx -->
```tsx
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
```
<!-- /example -->

## Status Copy

When to use:

- a UI surface needs concise state text

Composition notes:

- keep the copy short
- choose color based on state semantics

Trade-offs:

- fast to scan
- color-only meaning should still be avoided

<!-- example: text/status-copy.tsx -->
```tsx
import { Button, Text } from '@vega-ui/react';
import { useEffect, useState, type CSSProperties } from 'react';

const relative = new Intl.RelativeTimeFormat('en-US', { numeric: 'auto' });

export default function StatusCopy() {
  const [lastSync, setLastSync] = useState(() => Date.now() - 4 * 60 * 1000);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 15000);
    return () => window.clearInterval(timer);
  }, []);

  const minutes = Math.round((lastSync - now) / 60000);

  const syncNow = () => {
    const time = Date.now();
    setLastSync(time);
    setNow(time);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-6)', width: '100%' }}>
      <Text size={2} style={{ '--t-color': 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' } as CSSProperties}>
        Last synced{' '}
        <time dateTime={new Date(lastSync).toISOString()}>{relative.format(minutes, 'minute')}</time>
      </Text>
      <Button size='sm' variant='secondary' appearance='ghost' onClick={syncNow}>Sync now</Button>
    </div>
  );
}
```
<!-- /example -->

## Multiline Descriptive Copy

When to use:

- the content contains intentional newline breaks

Composition notes:

- `Text` uses `white-space: pre-line`
- keep line breaks meaningful rather than decorative

Trade-offs:

- preserves authored copy structure
- unexpected newlines in data will also be rendered

<!-- example: text/multiline-content.tsx -->
```tsx
import { Text } from '@vega-ui/react';

const address = 'Acme GmbH\nTorstraße 140\n10119 Berlin\nGermany';
const description = 'Soft merino wool sweater with a relaxed fit,\nribbed cuffs and a crew neck.\nMachine washable at 30\u00a0°C.';

export default function MultilineContent() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <Text size={3}>{address}</Text>
      <Text size={3} style={{ whiteSpace: 'normal' }}>{description}</Text>
    </div>
  );
}
```
<!-- /example -->
