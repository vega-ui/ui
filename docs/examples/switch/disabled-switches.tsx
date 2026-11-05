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
