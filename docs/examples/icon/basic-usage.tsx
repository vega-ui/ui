import { Icon } from '@vega-ui/react';
import { CalendarIcon, MessageSquareIcon, PaperclipIcon } from '@vega-ui/icons';

export default function BasicUsage() {
  return (
    <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4) var(--spacing-10)', margin: 0, padding: 0, listStyle: 'none', color: 'var(--label-secondary)' }}>
      <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
        <Icon size='sm'><CalendarIcon /></Icon>
        Due May 14
      </li>
      <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
        <Icon size='sm'><MessageSquareIcon /></Icon>
        12 comments
      </li>
      <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
        <Icon size='sm'><PaperclipIcon /></Icon>
        3 files
      </li>
    </ul>
  );
}
