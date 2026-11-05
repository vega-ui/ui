import { Label, Switch, SwitchIndicator, SwitchInput } from '@vega-ui/react';

export default function ValidCompositionPatterns() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <Switch>
          <SwitchInput id='bluetooth' name='bluetooth' />
          <SwitchIndicator />
        </Switch>
        <Label htmlFor='bluetooth'>Bluetooth</Label>
      </div>
      <Switch>
        <SwitchInput name='airplane-mode' aria-label='Airplane mode' />
        <SwitchIndicator />
      </Switch>
    </div>
  );
}
