# CheckboxCard Examples

## Basic

### Basic: add-on selection

Several independent cards inside a `Fieldset`. The whole card is the label, so clicking anywhere toggles it and the title and description become the accessible name. The control is `CheckboxCardControl` with `CheckboxCardControlInput` and a `CheckboxIndicator` holding the state icons.

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

## Controlled/Stateful

### Controlled/Stateful: selection with a computed total

The parent owns the list of selected extras and passes `checked` and `onChange` to each `CheckboxCardControlInput`. The monthly total is derived from the same state.

<!-- example: checkbox-card/parent-managed-checked-state.tsx -->
```tsx
import { useState } from 'react';
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
  Text,
} from '@vega-ui/react';

const extras = [
  { value: 'storage', title: 'Extra storage', description: '+500 GB for files and backups', price: 12 },
  { value: 'seats', title: '5 more seats', description: 'Invite contractors and guests', price: 40 },
  { value: 'analytics', title: 'Advanced analytics', description: 'Funnels and cohorts', price: 25 },
];

export default function ParentManagedCheckedState() {
  const [selected, setSelected] = useState<string[]>(['storage']);

  const toggle = (value: string, checked: boolean) => {
    if (checked) {
      setSelected([...selected, value]);
      return;
    }
    setSelected(selected.filter((item) => item !== value));
  };

  const total = extras
    .filter((extra) => selected.includes(extra.value))
    .reduce((sum, extra) => sum + extra.price, 0);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div role='group' aria-label='Extras' style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-6)' }}>
        {extras.map((extra) => (
          <CheckboxCard key={extra.value}>
            <CheckboxCardContent>
              <CheckboxCardTitle>{extra.title}</CheckboxCardTitle>
              <CheckboxCardDescription>{extra.description} · ${extra.price}/mo</CheckboxCardDescription>
            </CheckboxCardContent>
            <CheckboxCardControl>
              <CheckboxCardControlInput
                checked={selected.includes(extra.value)}
                onChange={(event) => toggle(extra.value, event.currentTarget.checked)}
              />
              <CheckboxIndicator>
                <CheckboxCardControlCheckedIcon />
                <CheckboxCardControlIndeterminateIcon />
              </CheckboxIndicator>
            </CheckboxCardControl>
          </CheckboxCard>
        ))}
      </div>
      <Text size={3} fontWeight={600} aria-live='polite' style={{ fontVariantNumeric: 'tabular-nums' }}>Extras total: ${total}/mo</Text>
    </div>
  );
}
```
<!-- /example -->

## Form/Integration

### Form/Integration: reading values with FormData

Cards with the same `name` submit every checked `value`, so `FormData.getAll('include')` returns the selection. Reset restores `defaultChecked` on every card.

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

## Layout/Overlay

### Layout/Overlay: horizontal cards in a settings list

`orientation='horizontal'` puts the control on the inline end, which suits a vertical list of settings. `size='sm'` keeps the list dense.

<!-- example: checkbox-card/horizontal-settings-tile.tsx -->
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

const alerts = [
  { value: 'sms', title: 'SMS alerts', description: 'Critical incidents only, by text message' },
  { value: 'email', title: 'Email alerts', description: 'All incidents and weekly uptime reports' },
  { value: 'slack', title: 'Slack alerts', description: 'Posts to #ops-incidents in the Acme workspace' },
];

export default function HorizontalSettingsTile() {
  return (
    <Fieldset style={{ width: '100%' }}>
      <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Incident alerts</FieldsetLegend>
      <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
        {alerts.map((alert) => (
          <CheckboxCard key={alert.value} orientation='horizontal' size='sm'>
            <CheckboxCardContent>
              <CheckboxCardTitle>{alert.title}</CheckboxCardTitle>
              <CheckboxCardDescription>{alert.description}</CheckboxCardDescription>
            </CheckboxCardContent>
            <CheckboxCardControl>
              <CheckboxCardControlInput name='alerts' value={alert.value} defaultChecked={alert.value !== 'sms'} />
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

## Error

### Error: at least one card required

Native `required` cannot express “at least one of the group”, so the check runs on submit. The error is linked to the `Fieldset` through `aria-describedby`, the inputs get `aria-invalid`, and checking any card clears it.

<!-- example: checkbox-card/at-least-one-required.tsx -->
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
  HelperText,
} from '@vega-ui/react';

const platforms = [
  { value: 'ios', title: 'iOS', description: 'App Store build, iPhone and iPad' },
  { value: 'android', title: 'Android', description: 'Google Play build, phones and tablets' },
  { value: 'web', title: 'Web', description: 'Progressive web app on your domain' },
];

export default function AtLeastOneRequired() {
  const [invalid, setInvalid] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selected = new FormData(event.currentTarget).getAll('platforms');
    if (selected.length === 0) {
      setInvalid(true);
      setMessage('');
      return;
    }
    setMessage(`Building for ${selected.join(', ')}.`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', justifyItems: 'start', width: '100%' }}>
      <Fieldset style={{ width: '100%' }} aria-describedby={invalid ? 'platforms-error' : undefined}>
        <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Target platforms</FieldsetLegend>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-6)' }}>
          {platforms.map((platform) => (
            <CheckboxCard key={platform.value} size='sm'>
              <CheckboxCardContent>
                <CheckboxCardTitle>{platform.title}</CheckboxCardTitle>
                <CheckboxCardDescription>{platform.description}</CheckboxCardDescription>
              </CheckboxCardContent>
              <CheckboxCardControl>
                <CheckboxCardControlInput
                  name='platforms'
                  value={platform.value}
                  aria-invalid={invalid}
                  onChange={() => setInvalid(false)}
                />
                <CheckboxIndicator>
                  <CheckboxCardControlCheckedIcon />
                  <CheckboxCardControlIndeterminateIcon />
                </CheckboxIndicator>
              </CheckboxCardControl>
            </CheckboxCard>
          ))}
        </div>
        {invalid && <HelperText id='platforms-error' error>Choose at least one platform.</HelperText>}
      </Fieldset>
      <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start' }}>
        <Button type='submit'>Start build</Button>
        {message && <HelperText aria-live='polite'>{message}</HelperText>}
      </div>
    </form>
  );
}
```
<!-- /example -->

## Disabled

### Disabled: option unavailable on the current plan

A `disabled` input disables the whole card visually. The description gets an `id` and the input points to it with `aria-describedby`, so screen readers hear why the option is unavailable.

<!-- example: checkbox-card/blocked-upgrade-option.tsx -->
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
} from '@vega-ui/react';

export default function BlockedUpgradeOption() {
  return (
    <div role='group' aria-label='Reports' style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-6)', width: '100%' }}>
      <CheckboxCard>
        <CheckboxCardContent>
          <CheckboxCardTitle>Weekly summary</CheckboxCardTitle>
          <CheckboxCardDescription>Key metrics every Monday at 9:00.</CheckboxCardDescription>
        </CheckboxCardContent>
        <CheckboxCardControl>
          <CheckboxCardControlInput name='reports' value='weekly' defaultChecked />
          <CheckboxIndicator>
            <CheckboxCardControlCheckedIcon />
            <CheckboxCardControlIndeterminateIcon />
          </CheckboxIndicator>
        </CheckboxCardControl>
      </CheckboxCard>
      <CheckboxCard>
        <CheckboxCardContent>
          <CheckboxCardTitle>Premium reports</CheckboxCardTitle>
          <CheckboxCardDescription id='premium-reports-note'>Available on the Enterprise plan. Contact sales to upgrade.</CheckboxCardDescription>
        </CheckboxCardContent>
        <CheckboxCardControl>
          <CheckboxCardControlInput name='reports' value='premium' disabled aria-describedby='premium-reports-note' />
          <CheckboxIndicator>
            <CheckboxCardControlCheckedIcon />
            <CheckboxCardControlIndeterminateIcon />
          </CheckboxIndicator>
        </CheckboxCardControl>
      </CheckboxCard>
    </div>
  );
}
```
<!-- /example -->

## Edge

### Edge: card summarizing a nested list

The card is checked when every office is enabled and `indeterminate` when only some are; clicking it toggles all of them. The description counts the enabled offices from the same state.

<!-- example: checkbox-card/indeterminate-aggregate-card.tsx -->
```tsx
import { useState } from 'react';
import {
  Checkbox,
  CheckboxCard,
  CheckboxCardContent,
  CheckboxCardControl,
  CheckboxCardControlCheckedIcon,
  CheckboxCardControlIndeterminateIcon,
  CheckboxCardControlInput,
  CheckboxCardDescription,
  CheckboxCardTitle,
  CheckboxCheckedIcon,
  CheckboxIndicator,
  CheckboxInput,
} from '@vega-ui/react';

const offices = ['Berlin', 'Lisbon', 'Warsaw', 'Dublin', 'Madrid'];

export default function IndeterminateAggregateCard() {
  const [enabled, setEnabled] = useState<string[]>(['Berlin', 'Lisbon']);

  const allEnabled = enabled.length === offices.length;
  const someEnabled = enabled.length > 0 && !allEnabled;

  const toggleAll = () => {
    if (allEnabled) {
      setEnabled([]);
      return;
    }
    setEnabled(offices);
  };

  const toggle = (office: string) => {
    if (enabled.includes(office)) {
      setEnabled(enabled.filter((item) => item !== office));
      return;
    }
    setEnabled([...enabled, office]);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <CheckboxCard orientation='horizontal'>
        <CheckboxCardContent>
          <CheckboxCardTitle>European offices</CheckboxCardTitle>
          <CheckboxCardDescription style={{ fontVariantNumeric: 'tabular-nums' }}>{enabled.length} of {offices.length} offices use hybrid schedules</CheckboxCardDescription>
        </CheckboxCardContent>
        <CheckboxCardControl>
          <CheckboxCardControlInput checked={allEnabled} indeterminate={someEnabled} onChange={toggleAll} />
          <CheckboxIndicator>
            <CheckboxCardControlCheckedIcon />
            <CheckboxCardControlIndeterminateIcon />
          </CheckboxIndicator>
        </CheckboxCardControl>
      </CheckboxCard>
      <div role='group' aria-label='European offices' style={{ display: 'grid', gap: 'var(--spacing-5)', paddingInlineStart: 'var(--spacing-8)' }}>
        {offices.map((office) => (
          <Checkbox key={office} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
            <CheckboxInput checked={enabled.includes(office)} onChange={() => toggle(office)} />
            <CheckboxIndicator>
              <CheckboxCheckedIcon />
            </CheckboxIndicator>
            {office}
          </Checkbox>
        ))}
      </div>
    </div>
  );
}
```
<!-- /example -->

### Edge: long titles and descriptions

`CheckboxCardTitle` stays on one line and truncates with an ellipsis; the full text is still in the DOM, so the accessible name is complete, and `title` shows it on hover. Set `white-space: normal` on the title when it must wrap. Descriptions always wrap.

<!-- example: checkbox-card/long-content.tsx -->
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
} from '@vega-ui/react';

const title = 'Automatically archive inactive projects after 90 days without activity';
const description = 'Archived projects stay searchable and can be restored by any workspace admin. Integrations, webhooks and scheduled exports of archived projects are paused until the project is restored.';

export default function LongContent() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <CheckboxCard>
        <CheckboxCardContent>
          <CheckboxCardTitle title={title}>{title}</CheckboxCardTitle>
          <CheckboxCardDescription>{description}</CheckboxCardDescription>
        </CheckboxCardContent>
        <CheckboxCardControl>
          <CheckboxCardControlInput name='archive' value='truncated' />
          <CheckboxIndicator>
            <CheckboxCardControlCheckedIcon />
            <CheckboxCardControlIndeterminateIcon />
          </CheckboxIndicator>
        </CheckboxCardControl>
      </CheckboxCard>
      <CheckboxCard>
        <CheckboxCardContent style={{ minWidth: 0 }}>
          <CheckboxCardTitle style={{ whiteSpace: 'normal' }}>{title}</CheckboxCardTitle>
          <CheckboxCardDescription>{description}</CheckboxCardDescription>
        </CheckboxCardContent>
        <CheckboxCardControl>
          <CheckboxCardControlInput name='archive' value='wrapped' />
          <CheckboxIndicator>
            <CheckboxCardControlCheckedIcon />
            <CheckboxCardControlIndeterminateIcon />
          </CheckboxIndicator>
        </CheckboxCardControl>
      </CheckboxCard>
    </div>
  );
}
```
<!-- /example -->
