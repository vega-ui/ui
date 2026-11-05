import { useState } from 'react';
import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
  Text,
} from '@vega-ui/react';

const permissions = ['View invoices', 'Download invoices', 'Edit payment methods', 'Cancel subscription'];

export default function IndeterminateParentSelector() {
  const [selected, setSelected] = useState<string[]>(['View invoices', 'Download invoices']);

  const allSelected = selected.length === permissions.length;
  const someSelected = selected.length > 0 && !allSelected;

  const toggleAll = () => {
    if (allSelected) {
      setSelected([]);
      return;
    }
    setSelected(permissions);
  };

  const toggle = (permission: string) => {
    if (selected.includes(permission)) {
      setSelected(selected.filter((item) => item !== permission));
      return;
    }
    setSelected([...selected, permission]);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <Checkbox style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', fontWeight: 600 }}>
        <CheckboxInput checked={allSelected} indeterminate={someSelected} onChange={toggleAll} />
        <CheckboxIndicator>
          <CheckboxCheckedIcon />
          <CheckboxIndeterminateIcon />
        </CheckboxIndicator>
        Billing
      </Checkbox>
      <div role='group' aria-label='Billing permissions' style={{ display: 'grid', gap: 'var(--spacing-6)', paddingInlineStart: 'var(--spacing-12)' }}>
        {permissions.map((permission) => (
          <Checkbox key={permission} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
            <CheckboxInput checked={selected.includes(permission)} onChange={() => toggle(permission)} />
            <CheckboxIndicator>
              <CheckboxCheckedIcon />
              <CheckboxIndeterminateIcon />
            </CheckboxIndicator>
            {permission}
          </Checkbox>
        ))}
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
        {selected.length} of {permissions.length} permissions granted
      </Text>
    </div>
  );
}
