import { Icon, IconButton, VisuallyHidden } from '@vega-ui/react';
import { BellIcon } from '@vega-ui/icons';
import { useState } from 'react';

export default function IconOnlyControlLabel() {
  const [unread, setUnread] = useState(4);

  return (
    <IconButton type='button' variant='secondary' appearance='ghost' onClick={() => setUnread(0)} style={{ position: 'relative' }}>
      <Icon><BellIcon /></Icon>
      <VisuallyHidden asChild>
        <span>Notifications, {unread} unread</span>
      </VisuallyHidden>
      {unread > 0 && (
        <span
          aria-hidden='true'
          style={{
            position: 'absolute',
            insetBlockStart: 'var(--spacing-1)',
            insetInlineEnd: 'var(--spacing-1)',
            minWidth: 'var(--spacing-8)',
            paddingInline: 'var(--spacing-2)',
            boxSizing: 'border-box',
            borderRadius: 999,
            background: 'var(--color-error)',
            color: 'var(--color-white)',
            fontSize: 'var(--font-size-1)',
            lineHeight: 'var(--spacing-8)',
            textAlign: 'center',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {unread}
        </span>
      )}
    </IconButton>
  );
}
