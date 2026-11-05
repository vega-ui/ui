import type { CSSProperties } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Fieldset,
  FieldsetLegend,
  Heading,
  Icon,
  IconButton,
  Label,
  Switch,
  SwitchIndicator,
  SwitchInput,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';
import { useId } from 'react';

const SETTINGS = [
  { name: 'showEmail', label: 'Show my email to teammates', checked: true },
  { name: 'showActivity', label: 'Show when I was last active', checked: false },
  { name: 'searchable', label: 'Let people find me by phone number', checked: false },
];

const rowStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' };

export default function PrivacySettingsInDialog() {
  const id = useId();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Privacy settings</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby={`${id}-title`} style={{ width: 'min(440px, 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={`${id}-title`} as='h2' size={4} fontWeight={600}>Privacy</Heading>
          <DialogClose asChild>
            <IconButton
              aria-label='Close'
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </IconButton>
          </DialogClose>
        </div>
        <form method='dialog' style={{ display: 'grid', gap: 'var(--spacing-10)', marginBlockStart: 'var(--spacing-8)' }}>
          <Fieldset appearance='transparent'>
            <FieldsetLegend>Profile visibility</FieldsetLegend>
            {SETTINGS.map((setting) => (
              <div key={setting.name} style={rowStyle}>
                <Label htmlFor={`${id}-${setting.name}`} fontWeight={400}>{setting.label}</Label>
                <Switch style={{ flexShrink: 0 }}>
                  <SwitchInput id={`${id}-${setting.name}`} name={setting.name} defaultChecked={setting.checked} />
                  <SwitchIndicator />
                </Switch>
              </div>
            ))}
          </Fieldset>
          <Button type='submit' style={{ justifySelf: 'end' }}>Done</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
