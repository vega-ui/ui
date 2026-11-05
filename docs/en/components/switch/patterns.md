# Switch Patterns

## Immediate Settings Toggle

When to use:

- One preference or feature should turn on or off directly.

Composition notes:

- Keep the visible label state-oriented.
- Give `SwitchInput` a `name` if the setting also lives in a native form.

Trade-offs:

- Strong binary affordance.
- Weak fit for groups of mutually exclusive options.

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

## Settings Row With Helper Text

When to use:

- A settings screen needs a compact toggle plus short explanatory copy.

Composition notes:

- Keep the switch and primary label on one row.
- Put optional helper text below instead of inside the label itself.

Trade-offs:

- Easy to scan in preferences panels.
- Can become noisy if every row adds too much helper copy.

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

## Overlay Toggle List

When to use:

- A drawer or sheet contains a short list of binary settings.

Composition notes:

- Keep the list short and clearly state-oriented.
- Avoid mixing toggles with mutually exclusive choice patterns in the same visual cluster.

Trade-offs:

- Works well for compact preference panels.
- Harder to scan if too many switches are stacked with weak labels.

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
