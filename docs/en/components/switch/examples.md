# Switch Examples

## Basic

### Basic: settings rows with descriptions

The `Switch` root is the track itself, so the visible title is a separate `Label` linked to `SwitchInput` with `htmlFor`/`id`, and the description is attached with `aria-describedby`. `flex-shrink: 0` keeps the track from shrinking next to long text.

<!-- example: switch/settings-toggle.tsx -->
```tsx
import { Label, Switch, SwitchIndicator, SwitchInput, Text } from '@vega-ui/react';

const settings = [
  { id: 'auto-updates', title: 'Automatic updates', description: 'Install security patches overnight.', checked: true },
  { id: 'usage-data', title: 'Share usage data', description: 'Help us improve with anonymous diagnostics.', checked: false },
  { id: 'beta-features', title: 'Beta features', description: 'Try new tools before they are released.', checked: false },
];

export default function SettingsToggle() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      {settings.map((setting) => (
        <div key={setting.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <div style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
            <Label htmlFor={setting.id}>{setting.title}</Label>
            <Text id={`${setting.id}-description`} size={2} style={{ color: 'var(--label-secondary)' }}>
              {setting.description}
            </Text>
          </div>
          <Switch style={{ flexShrink: 0 }}>
            <SwitchInput id={setting.id} defaultChecked={setting.checked} aria-describedby={`${setting.id}-description`} />
            <SwitchIndicator />
          </Switch>
        </div>
      ))}
    </div>
  );
}
```
<!-- /example -->

## Controlled/Stateful

### Controlled/Stateful: immediate effect

A switch applies its change right away. The parent owns `checked`, updates it from `event.currentTarget.checked`, and the status line below reflects the new state at once.

<!-- example: switch/parent-owned-switch-state.tsx -->
```tsx
import { useState } from 'react';
import { Label, Switch, SwitchIndicator, SwitchInput, Text } from '@vega-ui/react';

export default function ParentOwnedSwitchState() {
  const [maintenance, setMaintenance] = useState(false);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: 420 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
        <Label htmlFor='maintenance-mode'>Maintenance mode</Label>
        <Switch>
          <SwitchInput
            id='maintenance-mode'
            checked={maintenance}
            onChange={(event) => setMaintenance(event.currentTarget.checked)}
          />
          <SwitchIndicator />
        </Switch>
      </div>
      <Text size={2} aria-live='polite' style={{ color: 'var(--label-secondary)' }}>
        {maintenance ? 'Visitors see the maintenance page. Admins can still sign in.' : 'The site is live for everyone.'}
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Form/Integration

### Form/Integration: reading values with FormData

A switch submits like a checkbox: the `name` is present with the value `on` when it is on and absent when it is off, so read it with `FormData.has`. Reset restores `defaultChecked`.

<!-- example: switch/form-data-submission.tsx -->
```tsx
import { FormEvent, useState } from 'react';
import { Button, Fieldset, FieldsetLegend, Label, Switch, SwitchIndicator, SwitchInput, Text } from '@vega-ui/react';

const privacy = [
  { name: 'profile-public', title: 'Public profile', checked: true },
  { name: 'show-email', title: 'Show email address', checked: false },
  { name: 'search-indexing', title: 'Allow search engines to index my profile', checked: false },
];

export default function FormDataSubmission() {
  const [result, setResult] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const entries = privacy.map((item) => `${item.name}=${data.has(item.name) ? 'on' : 'off'}`);
    setResult(entries.join(', '));
  };

  return (
    <form onSubmit={handleSubmit} onReset={() => setResult('')} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <Fieldset>
        <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Privacy</FieldsetLegend>
        <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
          {privacy.map((item) => (
            <div key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
              <Label htmlFor={item.name}>{item.title}</Label>
              <Switch style={{ flexShrink: 0 }}>
                <SwitchInput id={item.name} name={item.name} defaultChecked={item.checked} />
                <SwitchIndicator />
              </Switch>
            </div>
          ))}
        </div>
      </Fieldset>
      <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
        <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
          <Button type='submit'>Save</Button>
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

### Layout/Overlay: toggles inside a sheet

A short list of settings in a `Sheet`, named by its heading through `aria-labelledby`. The switches apply immediately, so the sheet needs no submit button, only a close button.

<!-- example: switch/overlay-toggle-list.tsx -->
```tsx
import { CSSProperties } from 'react';
import {
  Button,
  Heading,
  Icon,
  IconButton,
  Label,
  Sheet,
  SheetClose,
  SheetContent,
  SheetHandle,
  SheetTrigger,
  Switch,
  SwitchIndicator,
  SwitchInput,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const options = [
  { id: 'sheet-autoplay', title: 'Autoplay next episode', checked: true },
  { id: 'sheet-subtitles', title: 'Always show subtitles', checked: false },
  { id: 'sheet-data-saver', title: 'Data saver on mobile networks', checked: true },
];

export default function OverlayToggleList() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Playback settings</Button>
      </SheetTrigger>
      <SheetContent aria-labelledby='playback-settings-title'>
        <SheetHandle aria-label='Resize sheet' />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id='playback-settings-title' size={4} fontWeight={600} as='h2'>Playback settings</Heading>
          <SheetClose asChild>
            <IconButton
              aria-label='Close'
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </IconButton>
          </SheetClose>
        </div>
        <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
          {options.map((option) => (
            <div key={option.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
              <Label htmlFor={option.id}>{option.title}</Label>
              <Switch style={{ flexShrink: 0 }}>
                <SwitchInput id={option.id} name={option.id} defaultChecked={option.checked} />
                <SwitchIndicator />
              </Switch>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
```
<!-- /example -->

## Error

### Error: rule across several switches

Turning both channels off breaks a product rule. The error appears right away, both inputs get `aria-invalid` and `aria-describedby` pointing at it, and turning either channel back on clears it. `Switch` has no invalid style of its own, so the message carries the state.

<!-- example: switch/at-least-one-channel.tsx -->
```tsx
import { useState } from 'react';
import { Fieldset, FieldsetLegend, HelperText, Label, Switch, SwitchIndicator, SwitchInput } from '@vega-ui/react';

export default function AtLeastOneChannel() {
  const [email, setEmail] = useState(true);
  const [push, setPush] = useState(false);

  const invalid = !email && !push;
  const describedBy = invalid ? 'channels-error' : undefined;

  return (
    <Fieldset style={{ width: '100%', maxWidth: 420 }}>
      <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Incident notifications</FieldsetLegend>
      <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Label htmlFor='channel-email'>Email</Label>
          <Switch>
            <SwitchInput
              id='channel-email'
              checked={email}
              aria-invalid={invalid}
              aria-describedby={describedBy}
              onChange={(event) => setEmail(event.currentTarget.checked)}
            />
            <SwitchIndicator />
          </Switch>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Label htmlFor='channel-push'>Push notifications</Label>
          <Switch>
            <SwitchInput
              id='channel-push'
              checked={push}
              aria-invalid={invalid}
              aria-describedby={describedBy}
              onChange={(event) => setPush(event.currentTarget.checked)}
            />
            <SwitchIndicator />
          </Switch>
        </div>
      </div>
      {invalid && <HelperText id='channels-error' error>Keep at least one channel on, or nobody will be paged during an incident.</HelperText>}
    </Fieldset>
  );
}
```
<!-- /example -->

## Disabled

### Disabled: master switch disables a group

Turning off the master switch sets `disabled` on the `Fieldset`, and every switch inside inherits it natively. The security alerts switch is always disabled and explains why through `aria-describedby`.

<!-- example: switch/disabled-switches.tsx -->
```tsx
import { useState } from 'react';
import { Fieldset, FieldsetLegend, HelperText, Label, Switch, SwitchIndicator, SwitchInput } from '@vega-ui/react';

const kinds = [
  { id: 'notify-comments', title: 'Comments', checked: true },
  { id: 'notify-mentions', title: 'Mentions', checked: true },
  { id: 'notify-reviews', title: 'Review requests', checked: false },
];

export default function DisabledSwitches() {
  const [enabled, setEnabled] = useState(true);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 420 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
        <Label htmlFor='notify-all'>Desktop notifications</Label>
        <Switch>
          <SwitchInput id='notify-all' checked={enabled} onChange={(event) => setEnabled(event.currentTarget.checked)} />
          <SwitchIndicator />
        </Switch>
      </div>
      <Fieldset disabled={!enabled}>
        <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Notify me about</FieldsetLegend>
        <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
          {kinds.map((kind) => (
            <div key={kind.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
              <Label htmlFor={kind.id}>{kind.title}</Label>
              <Switch>
                <SwitchInput id={kind.id} name={kind.id} defaultChecked={kind.checked} />
                <SwitchIndicator />
              </Switch>
            </div>
          ))}
          <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
              <Label htmlFor='notify-security'>Security alerts</Label>
              <Switch>
                <SwitchInput id='notify-security' defaultChecked disabled aria-describedby='notify-security-note' />
                <SwitchIndicator />
              </Switch>
            </div>
            <HelperText id='notify-security-note'>Always on for workspace owners.</HelperText>
          </div>
        </div>
      </Fieldset>
    </div>
  );
}
```
<!-- /example -->

## Edge

### Edge: saving to a server

The switch flips optimistically, then waits for the request. While saving it is `aria-busy` and `aria-disabled` instead of `disabled`, so focus stays on it; a failed request reverts the value and the reason is announced through `aria-live`. Turning on two-factor authentication fails on purpose.

<!-- example: switch/async-toggle-with-pending.tsx -->
```tsx
import { useState } from 'react';
import { Label, Switch, SwitchIndicator, SwitchInput, Text } from '@vega-ui/react';

const settings = [
  { id: 'weekly-digest', title: 'Weekly email digest' },
  { id: 'two-factor', title: 'Require two-factor authentication' },
];

const saveSetting = (id: string, value: boolean) => new Promise<void>((resolve, reject) => {
  setTimeout(() => {
    if (id === 'two-factor' && value) {
      reject(new Error('Add a verified phone number first.'));
      return;
    }
    resolve();
  }, 1200);
});

export default function AsyncToggleWithPending() {
  const [values, setValues] = useState<Record<string, boolean>>({ 'weekly-digest': false, 'two-factor': false });
  const [pending, setPending] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Record<string, string>>({});

  const handleChange = async (id: string, next: boolean) => {
    if (pending[id]) return;
    const previous = values[id];
    setValues((current) => ({ ...current, [id]: next }));
    setPending((current) => ({ ...current, [id]: true }));
    setStatus((current) => ({ ...current, [id]: 'Saving…' }));
    try {
      await saveSetting(id, next);
      setStatus((current) => ({ ...current, [id]: 'Saved.' }));
    } catch (error) {
      setValues((current) => ({ ...current, [id]: previous }));
      setStatus((current) => ({ ...current, [id]: `Not saved: ${(error as Error).message}` }));
    }
    setPending((current) => ({ ...current, [id]: false }));
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      {settings.map((setting) => (
        <div key={setting.id} style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Label htmlFor={setting.id}>{setting.title}</Label>
            <Switch style={{ flexShrink: 0 }}>
              <SwitchInput
                id={setting.id}
                checked={values[setting.id]}
                aria-disabled={pending[setting.id]}
                aria-busy={pending[setting.id]}
                aria-describedby={`${setting.id}-status`}
                onChange={(event) => handleChange(setting.id, event.currentTarget.checked)}
              />
              <SwitchIndicator />
            </Switch>
          </div>
          <Text id={`${setting.id}-status`} size={2} aria-live='polite' style={{ color: 'var(--label-secondary)', minBlockSize: '1lh' }}>
            {status[setting.id]}
          </Text>
        </div>
      ))}
    </div>
  );
}
```
<!-- /example -->

### Edge: right-to-left layout

Settings rows inside `dir='rtl'`. The row layout mirrors through flexbox; check that the thumb moves toward the inline end of the track when the switch turns on.

<!-- example: switch/right-to-left.tsx -->
```tsx
import { Label, Switch, SwitchIndicator, SwitchInput } from '@vega-ui/react';

const settings = [
  { id: 'rtl-dark-mode', title: 'الوضع الداكن', checked: true },
  { id: 'rtl-notifications', title: 'الإشعارات', checked: false },
];

export default function RightToLeft() {
  return (
    <div dir='rtl' lang='ar' style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      {settings.map((setting) => (
        <div key={setting.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Label htmlFor={setting.id}>{setting.title}</Label>
          <Switch>
            <SwitchInput id={setting.id} defaultChecked={setting.checked} />
            <SwitchIndicator />
          </Switch>
        </div>
      ))}
    </div>
  );
}
```
<!-- /example -->
