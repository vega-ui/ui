import { Fieldset, FieldsetLegend, Radio } from '@vega-ui/react';

const methods = [
  { value: 'standard', label: 'Standard · 5–7 business days · Free' },
  { value: 'express', label: 'Express · 2–3 business days · $9.90' },
  { value: 'overnight', label: 'Overnight · next business day · $24.00' },
];

export default function LabeledRadioOption() {
  return (
    <Fieldset>
      <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Shipping method</FieldsetLegend>
      <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
        {methods.map((method) => (
          <label key={method.value} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
            <Radio name='shipping' value={method.value} defaultChecked={method.value === 'standard'} />
            {method.label}
          </label>
        ))}
      </div>
    </Fieldset>
  );
}
