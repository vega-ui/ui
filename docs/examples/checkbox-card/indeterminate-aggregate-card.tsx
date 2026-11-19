import { useState } from 'react';
import {
  Checkbox,
  CheckboxCard,
  CheckboxCardContent,
  CheckboxCardControl,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxCardControlInput,
  CheckboxCardDescription,
  CheckboxCardTitle,
  CheckboxIndicator,
  CheckboxInput,
} from '@vega-ui/react';
import { CheckIcon, MinusIcon } from '@vega-ui/icons';

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
            <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
            <CheckboxIndeterminateIcon><MinusIcon strokeWidth={4} /></CheckboxIndeterminateIcon>
          </CheckboxIndicator>
        </CheckboxCardControl>
      </CheckboxCard>
      <div role='group' aria-label='European offices' style={{ display: 'grid', gap: 'var(--spacing-5)', paddingInlineStart: 'var(--spacing-8)' }}>
        {offices.map((office) => (
          <Checkbox key={office}>
            <CheckboxInput checked={enabled.includes(office)} onChange={() => toggle(office)} />
            <CheckboxIndicator>
              <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
            </CheckboxIndicator>
            {office}
          </Checkbox>
        ))}
      </div>
    </div>
  );
}
