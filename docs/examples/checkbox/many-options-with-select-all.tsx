import { useState } from 'react';
import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
  Text,
} from '@vega-ui/react';

const teams = ['billing', 'search', 'auth', 'checkout', 'payments', 'catalog', 'inventory', 'shipping', 'reviews', 'ads', 'email', 'reports'];
const services = ['api', 'worker', 'web', 'gateway', 'scheduler'];
const regions = ['eu-west-1', 'eu-central-1', 'us-east-1', 'ap-south-1'];

const deployments = teams.flatMap((team) => services.flatMap((service) => regions.map((region) => `${team}-${service} · ${region}`)));

export default function ManyOptionsWithSelectAll() {
  const [selected, setSelected] = useState<Set<string>>(() => new Set());

  const allSelected = selected.size === deployments.length;
  const someSelected = selected.size > 0 && !allSelected;

  const toggleAll = () => {
    if (allSelected) {
      setSelected(new Set());
      return;
    }
    setSelected(new Set(deployments));
  };

  const toggle = (deployment: string) => {
    const next = new Set(selected);
    if (next.has(deployment)) {
      next.delete(deployment);
    } else {
      next.add(deployment);
    }
    setSelected(next);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <Checkbox style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', fontWeight: 600 }}>
        <CheckboxInput checked={allSelected} indeterminate={someSelected} onChange={toggleAll} />
        <CheckboxIndicator>
          <CheckboxCheckedIcon />
          <CheckboxIndeterminateIcon />
        </CheckboxIndicator>
        Restart all deployments
      </Checkbox>
      <div
        role='group'
        aria-label='Deployments'
        style={{
          display: 'grid',
          gap: 'var(--spacing-4)',
          maxHeight: 240,
          overflowY: 'auto',
          padding: 'var(--spacing-4)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-2)',
        }}
      >
        {deployments.map((deployment) => (
          <Checkbox key={deployment} size='sm' style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
            <CheckboxInput checked={selected.has(deployment)} onChange={() => toggle(deployment)} />
            <CheckboxIndicator>
              <CheckboxCheckedIcon />
              <CheckboxIndeterminateIcon />
            </CheckboxIndicator>
            {deployment}
          </Checkbox>
        ))}
      </div>
      <Text size={2} aria-live='polite' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
        {selected.size} of {deployments.length} selected
      </Text>
    </div>
  );
}
