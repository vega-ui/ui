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
