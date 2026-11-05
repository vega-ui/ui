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
