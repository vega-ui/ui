import { Icon, VisuallyHidden } from '@vega-ui/react';
import { CircleCheckIcon, CircleXIcon } from '@vega-ui/icons';

const checks = [
  { name: 'Unit tests', passed: true },
  { name: 'Lint', passed: true },
  { name: 'Visual regression', passed: false },
];

export default function StandaloneMeaningfulIcon() {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th scope='col' style={{ paddingBlock: 'var(--spacing-4)', borderBlockEnd: '1px solid var(--separator-opaque)', textAlign: 'start' }}>Check</th>
          <th scope='col' style={{ paddingBlock: 'var(--spacing-4)', borderBlockEnd: '1px solid var(--separator-opaque)', textAlign: 'end' }}>Status</th>
        </tr>
      </thead>
      <tbody>
        {checks.map((check) => (
          <tr key={check.name}>
            <td style={{ paddingBlock: 'var(--spacing-4)', borderBlockEnd: '1px solid var(--separator-opaque)' }}>{check.name}</td>
            <td style={{ paddingBlock: 'var(--spacing-4)', borderBlockEnd: '1px solid var(--separator-opaque)', textAlign: 'end' }}>
              <Icon
                size='sm'
                style={{ color: check.passed ? 'var(--color-green-accent-500)' : 'var(--color-error)' }}
              >
                {check.passed ? <CircleCheckIcon /> : <CircleXIcon />}
              </Icon>
              <VisuallyHidden asChild>
                <span>{check.passed ? 'Passed' : 'Failed'}</span>
              </VisuallyHidden>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
