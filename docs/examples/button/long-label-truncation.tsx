import { Button, Icon } from '@vega-ui/react';
import { SendIcon } from '@vega-ui/icons';

const labels = [
  'Send',
  'An alle Teilnehmer senden',
  'Отправить приглашение всем участникам проекта',
];

export default function LongLabelTruncation() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: 220 }}>
      {labels.map((label) => (
        <Button key={label} type='button' title={label} style={{ maxWidth: '100%' }}>
          <Icon size='sm' style={{ flexShrink: 0 }}><SendIcon /></Icon>
          <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {label}
          </span>
        </Button>
      ))}
    </div>
  );
}
