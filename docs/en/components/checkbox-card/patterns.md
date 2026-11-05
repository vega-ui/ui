# CheckboxCard Patterns

## Plan Selection Tile

When to use:
Present plan features or package options where the whole card should be clickable.

Composition notes:
Keep title and description in `CheckboxCardContent` and render the control on the opposite edge.

Trade-offs:
The pattern is expressive, but consumes more space than a normal checkbox row.

<!-- example: checkbox-card/plan-option-tile.tsx -->
```tsx
import {
  CheckboxCard,
  CheckboxCardContent,
  CheckboxCardControl,
  CheckboxCardControlCheckedIcon,
  CheckboxCardControlIndeterminateIcon,
  CheckboxCardControlInput,
  CheckboxCardDescription,
  CheckboxCardTitle,
  CheckboxIndicator,
  Fieldset,
  FieldsetLegend,
} from '@vega-ui/react';

const addons = [
  { value: 'priority-support', title: 'Priority support', description: 'Replies within 1 business hour, 24/7 incident line.' },
  { value: 'audit-log', title: 'Audit log', description: 'Keep a 365-day history of every change in the workspace.' },
  { value: 'sso', title: 'Single sign-on', description: 'SAML and OIDC login through Okta, Entra ID or Google.' },
];

export default function PlanOptionTile() {
  return (
    <Fieldset style={{ width: '100%' }}>
      <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Add-ons</FieldsetLegend>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-6)' }}>
        {addons.map((addon) => (
          <CheckboxCard key={addon.value}>
            <CheckboxCardContent>
              <CheckboxCardTitle>{addon.title}</CheckboxCardTitle>
              <CheckboxCardDescription>{addon.description}</CheckboxCardDescription>
            </CheckboxCardContent>
            <CheckboxCardControl>
              <CheckboxCardControlInput name='addons' value={addon.value} defaultChecked={addon.value === 'audit-log'} />
              <CheckboxIndicator>
                <CheckboxCardControlCheckedIcon />
                <CheckboxCardControlIndeterminateIcon />
              </CheckboxIndicator>
            </CheckboxCardControl>
          </CheckboxCard>
        ))}
      </div>
    </Fieldset>
  );
}
```
<!-- /example -->

## Settings Tile With Native Form Participation

When to use:
The app wants a rich tile UI, but still submits through a native form.

Composition notes:
Give each `CheckboxCardControlInput` a shared `name` and its own `value`, then read the selection with `FormData.getAll`.

Trade-offs:
Form integration becomes easier, but layout and semantics still need to keep the full card readable.

<!-- example: checkbox-card/form-data-submission.tsx -->
```tsx
import { FormEvent, useState } from 'react';
import {
  Button,
  CheckboxCard,
  CheckboxCardContent,
  CheckboxCardControl,
  CheckboxCardControlCheckedIcon,
  CheckboxCardControlIndeterminateIcon,
  CheckboxCardControlInput,
  CheckboxCardDescription,
  CheckboxCardTitle,
  CheckboxIndicator,
  Fieldset,
  FieldsetLegend,
  Text,
} from '@vega-ui/react';

const contents = [
  { value: 'projects', title: 'Projects', description: 'Boards, tasks and their history' },
  { value: 'files', title: 'Files', description: 'Attachments up to 2 GB each' },
  { value: 'members', title: 'Members', description: 'Names, roles and last activity' },
];

export default function FormDataSubmission() {
  const [result, setResult] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const included = new FormData(event.currentTarget).getAll('include');
    setResult(`include=${included.join(',')}`);
  };

  return (
    <form onSubmit={handleSubmit} onReset={() => setResult('')} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <Fieldset>
        <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Export workspace data</FieldsetLegend>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-6)' }}>
          {contents.map((content) => (
            <CheckboxCard key={content.value} size='sm'>
              <CheckboxCardContent>
                <CheckboxCardTitle>{content.title}</CheckboxCardTitle>
                <CheckboxCardDescription>{content.description}</CheckboxCardDescription>
              </CheckboxCardContent>
              <CheckboxCardControl>
                <CheckboxCardControlInput name='include' value={content.value} defaultChecked />
                <CheckboxIndicator>
                  <CheckboxCardControlCheckedIcon />
                  <CheckboxCardControlIndeterminateIcon />
                </CheckboxIndicator>
              </CheckboxCardControl>
            </CheckboxCard>
          ))}
        </div>
      </Fieldset>
      <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
        <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
          <Button type='submit'>Start export</Button>
          <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
        </div>
        <Text size={2} aria-live='polite' style={{ color: 'var(--label-secondary)' }}>{result}</Text>
      </div>
    </form>
  );
}
```
<!-- /example -->
