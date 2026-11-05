import { Icon, Label, Switch, SwitchIndicator, SwitchInput } from '@vega-ui/react';
import { Moon } from '@vega-ui/icons';

export default function CustomIndicator() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <Switch>
          <SwitchInput id='custom-focus-mode' />
          <SwitchIndicator style={{ background: 'var(--color-primary-700)' }} />
        </Switch>
        <Label htmlFor='custom-focus-mode'>Focus mode</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <Switch>
          <SwitchInput id='custom-dark-mode' defaultChecked />
          <SwitchIndicator style={{ background: 'var(--color-primary-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon size='sm'><Moon stroke='var(--color-white)' /></Icon>
          </SwitchIndicator>
        </Switch>
        <Label htmlFor='custom-dark-mode'>Dark mode</Label>
      </div>
    </div>
  );
}
