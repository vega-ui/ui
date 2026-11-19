import { Label, Switch, SwitchIndicator, SwitchInput, type SwitchInputProps } from '@vega-ui/react';
import { useId } from 'react';

export function MySwitch(props: SwitchInputProps) {
  return (
    <Switch>
      <SwitchInput {...props} />
      <SwitchIndicator />
    </Switch>
  );
}

export default function Recipe() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <MySwitch id={`${id}-wifi`} name='wifi' defaultChecked />
        <Label htmlFor={`${id}-wifi`}>Wi-Fi</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <MySwitch id={`${id}-bluetooth`} name='bluetooth' />
        <Label htmlFor={`${id}-bluetooth`}>Bluetooth</Label>
      </div>
    </div>
  );
}
