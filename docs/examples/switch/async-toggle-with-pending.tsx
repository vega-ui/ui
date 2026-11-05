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
