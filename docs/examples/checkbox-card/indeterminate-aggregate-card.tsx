import { useState } from 'react';
import {
  Checkbox,
  CheckboxCard,
  CheckboxCardContent,
  CheckboxCardControl,
  CheckboxCardControlCheckedIcon,
  CheckboxCardControlIndeterminateIcon,
  CheckboxCardControlInput,
  CheckboxCardDescription,
  CheckboxCardTitle,
  CheckboxCheckedIcon,
  CheckboxIndicator,
  CheckboxInput,
} from '@vega-ui/react';

const offices = ['Berlin', 'Lisbon', 'Warsaw', 'Dublin', 'Madrid'];

export default function IndeterminateAggregateCard() {
  const [enabled, setEnabled] = useState<string[]>(['Berlin', 'Lisbon']);

  const allEnabled = enabled.length === offices.length;
  const someEnabled = enabled.length > 0 && !allEnabled;

  const toggleAll = () => {
    if (allEnabled) {
      setEnabled([]);
      return;
    }
    setEnabled(offices);
  };

  const toggle = (office: string) => {
    if (enabled.includes(office)) {
      setEnabled(enabled.filter((item) => item !== office));
      return;
    }
    setEnabled([...enabled, office]);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <CheckboxCard orientation='horizontal'>
        <CheckboxCardContent>
          <CheckboxCardTitle>European offices</CheckboxCardTitle>
          <CheckboxCardDescription style={{ fontVariantNumeric: 'tabular-nums' }}>{enabled.length} of {offices.length} offices use hybrid schedules</CheckboxCardDescription>
        </CheckboxCardContent>
        <CheckboxCardControl>
          <CheckboxCardControlInput checked={allEnabled} indeterminate={someEnabled} onChange={toggleAll} />
          <CheckboxIndicator>
            <CheckboxCardControlCheckedIcon />
            <CheckboxCardControlIndeterminateIcon />
          </CheckboxIndicator>
        </CheckboxCardControl>
      </CheckboxCard>
      <div role='group' aria-label='European offices' style={{ display: 'grid', gap: 'var(--spacing-5)', paddingInlineStart: 'var(--spacing-8)' }}>
        {offices.map((office) => (
          <Checkbox key={office} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
            <CheckboxInput checked={enabled.includes(office)} onChange={() => toggle(office)} />
            <CheckboxIndicator>
              <CheckboxCheckedIcon />
            </CheckboxIndicator>
            {office}
          </Checkbox>
        ))}
      </div>
    </div>
  );
}
