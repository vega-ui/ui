import { Icon, Option, Text } from '@vega-ui/react';
import { CopyIcon, LinkIcon, MailIcon, Share2Icon } from '@vega-ui/icons';

const actions = [
  { value: 'link', label: 'Copy link', hint: 'Anyone with the link can view', icon: LinkIcon },
  { value: 'email', label: 'Send by email', hint: 'Up to 20 recipients', icon: MailIcon },
  { value: 'duplicate', label: 'Duplicate', hint: 'Creates a private copy', icon: CopyIcon },
  { value: 'export', label: 'Export to Drive', hint: 'PDF or DOCX', icon: Share2Icon },
];

export default function RichOptionContent() {
  return (
    <div
      role='listbox'
      aria-label='Share options'
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-3)',
        padding: 'var(--spacing-4)',
        width: '100%',
        maxWidth: 300,
        boxSizing: 'border-box',
        borderRadius: 'var(--spacing-8)',
        background: 'var(--surface-secondary)',
        border: '1px solid var(--separator-opaque)',
        boxShadow: 'var(--surface-shadow)',
      }}
    >
      {actions.map((action) => (
        <Option
          key={action.value}
          selected={action.value === 'link'}
          style={{ height: 'auto', paddingBlock: 'var(--spacing-5)', gap: 'var(--spacing-8)' }}
        >
          <Icon size='sm'>
            <action.icon />
          </Icon>
          <span style={{ display: 'flex', flexDirection: 'column' }}>
            <Text size={3}>{action.label}</Text>
            <Text size={2} style={{ opacity: 0.75 }}>{action.hint}</Text>
          </span>
        </Option>
      ))}
    </div>
  );
}
