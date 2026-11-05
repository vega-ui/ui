import { Icon, Text } from '@vega-ui/react';
import { CircleCheckIcon, ShieldIcon, TriangleAlertIcon } from '@vega-ui/icons';

export default function InfoRow() {
  return (
    <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', margin: 0, padding: 0, listStyle: 'none', width: '100%' }}>
      <li style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-4)' }}>
        <Icon size='sm' style={{ flexShrink: 0, marginBlockStart: 'var(--spacing-3)', color: 'var(--color-green-accent-500)' }}><CircleCheckIcon /></Icon>
        <Text size={3}>SSO is enabled for this workspace</Text>
      </li>
      <li style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-4)' }}>
        <Icon size='sm' style={{ flexShrink: 0, marginBlockStart: 'var(--spacing-3)', color: 'var(--color-primary-500)' }}><ShieldIcon /></Icon>
        <Text size={3}>Two-factor authentication is required for admins</Text>
      </li>
      <li style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-4)' }}>
        <Icon size='sm' style={{ flexShrink: 0, marginBlockStart: 'var(--spacing-3)', color: 'var(--color-error)' }}><TriangleAlertIcon /></Icon>
        <Text size={3}>2 members have not verified their email</Text>
      </li>
    </ul>
  );
}
