import { Option } from '@vega-ui/react';
import { useId } from 'react';

const plans = [
  { value: 'starter', label: 'Starter', reason: '' },
  { value: 'team', label: 'Team', reason: '' },
  { value: 'legacy', label: 'Legacy Pro', reason: 'No longer available for new workspaces' },
  { value: 'enterprise', label: 'Enterprise', reason: 'Requires a sales contract' },
];

export default function UnavailablePlanHint() {
  const id = useId();

  return (
    <div role='listbox' aria-label='Plan' style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320, padding: 'var(--spacing-4)', borderRadius: 'var(--spacing-8)', background: 'var(--surface-secondary)', border: '1px solid var(--separator-opaque)', boxSizing: 'border-box' }}>
      {plans.map((plan) => (
        <Option
          key={plan.value}
          selected={plan.value === 'team'}
          disabled={plan.reason !== ''}
          aria-describedby={plan.reason === '' ? undefined : `${id}-${plan.value}`}
          style={plan.reason === '' ? undefined : { height: 'auto', paddingBlock: 'var(--spacing-5)' }}
        >
          <span style={{ display: 'flex', flexDirection: 'column' }}>
            {plan.label}
            {plan.reason !== '' && (
              <span id={`${id}-${plan.value}`} style={{ fontSize: 'var(--font-size-2)' }}>
                {plan.reason}
              </span>
            )}
          </span>
        </Option>
      ))}
    </div>
  );
}
