# Button Patterns

## Primary Form Action

When to use:

- A form needs one clear primary action.

Composition notes:

- Keep the primary action visually stronger than nearby secondary actions.
- Use `type='submit'` deliberately.

Trade-offs:

- Strong action clarity.
- Can become visually noisy if too many buttons compete for emphasis.

<!-- example: button/form-footer-actions.tsx -->
```tsx
import { Button, Label, TextField, TextFieldInput } from '@vega-ui/react';
import { FormEvent, useState } from 'react';

export default function FormFooterActions() {
  const [submitted, setSubmitted] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSubmitted(`${data.get('workspace')} (${data.get('slug')})`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={() => setSubmitted('')}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-12)', width: '100%' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
          <Label htmlFor='workspace-name'>Workspace name</Label>
          <TextField>
            <TextFieldInput id='workspace-name' name='workspace' defaultValue='Acme Design' required />
          </TextField>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
          <Label htmlFor='workspace-slug'>URL slug</Label>
          <TextField>
            <TextFieldInput id='workspace-slug' name='slug' defaultValue='acme-design' pattern='[a-z0-9-]+' required />
          </TextField>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
          <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
          <Button type='submit'>Save workspace</Button>
        </div>
        <output style={{ color: 'var(--label-secondary)', textAlign: 'end', overflowWrap: 'anywhere' }}>
          {submitted === '' ? 'Not saved yet' : `Saved: ${submitted}`}
        </output>
      </div>
    </form>
  );
}
```
<!-- /example -->

## Secondary Action Pair

When to use:

- A local flow needs primary and secondary actions side by side.

Composition notes:

- Use a lower-emphasis treatment for cancel or back actions.
- Keep the button texts complementary rather than ambiguous.

Trade-offs:

- Easy to scan.
- Can become confusing if both buttons use the same emphasis.

<!-- example: button/action-hierarchy.tsx -->
```tsx
import { Button } from '@vega-ui/react';

export default function ActionHierarchy() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '100%' }}>
      <Button type='button' fullWidth>Publish article</Button>
      <Button type='button' fullWidth variant='secondary' appearance='ghost'>Save draft</Button>
      <Button type='button' fullWidth variant='secondary' appearance='ghost'>Preview</Button>
      <Button type='button' fullWidth variant='secondary' appearance='transparent'>Discard</Button>
    </div>
  );
}
```
<!-- /example -->

## Navigation With Button Visuals

When to use:

- Navigation needs to look like a button while staying semantically navigational.

Composition notes:

- Use `asChild` with a real anchor.
- Preserve link semantics when the interaction truly navigates.

Trade-offs:

- Strong visual emphasis for navigation.
- Easy to misuse when a plain link would be clearer.

<!-- example: button/navigation-with-button-visuals.tsx -->
```tsx
import { Button, Icon } from '@vega-ui/react';
import { ArrowRightIcon, ExternalLinkIcon } from '@vega-ui/icons';
import './examples.css';

export default function NavigationWithButtonVisuals() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4)' }}>
      <Button asChild>
        <a href='/onboarding/import'>
          Import contacts
          <Icon size='sm' className='directionalIcon'><ArrowRightIcon /></Icon>
        </a>
      </Button>
      <Button asChild variant='secondary' appearance='ghost'>
        <a href='https://status.example.com' target='_blank' rel='noreferrer'>
          Status page
          <Icon size='sm'><ExternalLinkIcon /></Icon>
        </a>
      </Button>
    </div>
  );
}
```
<!-- /example -->
