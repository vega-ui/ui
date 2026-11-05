import { Label, Switch, SwitchIndicator, SwitchInput } from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
      <Switch>
        <SwitchInput id='wifi' name='wifi' defaultChecked />
        <SwitchIndicator />
      </Switch>
      <Label htmlFor='wifi'>Wi-Fi</Label>
    </div>
  );
}
