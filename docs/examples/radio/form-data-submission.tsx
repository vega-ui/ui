import { FormEvent, useState } from 'react';
import { Button, Fieldset, FieldsetLegend, Radio, Text } from '@vega-ui/react';

const sizes = [
  { value: 's-2vcpu-4gb', label: '2 vCPU · 4 GB RAM · $24/mo' },
  { value: 's-4vcpu-8gb', label: '4 vCPU · 8 GB RAM · $48/mo' },
  { value: 's-8vcpu-16gb', label: '8 vCPU · 16 GB RAM · $96/mo' },
];

export default function FormDataSubmission() {
  const [result, setResult] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setResult(`size=${data.get('size')}`);
  };

  return (
    <form onSubmit={handleSubmit} onReset={() => setResult('')} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <Fieldset>
        <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Server size</FieldsetLegend>
        <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
          {sizes.map((size) => (
            <label key={size.value} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
              <Radio name='size' value={size.value} required />
              {size.label}
            </label>
          ))}
        </div>
      </Fieldset>
      <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
        <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
          <Button type='submit'>Create server</Button>
          <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
        </div>
        <Text size={2} aria-live='polite' style={{ color: 'var(--label-secondary)' }}>{result}</Text>
      </div>
    </form>
  );
}
