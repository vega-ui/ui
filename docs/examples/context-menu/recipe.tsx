import { useState, type CSSProperties, type ReactNode } from 'react';
import {
  ContextMenu,
  ContextMenuTrigger,
  Icon,
  MenuContent,
  MenuItem,
  MenuSubmenu,
  MenuSubmenuTrigger,
  Separator,
  Text,
  type ContextMenuProps,
  type MenuSubmenuProps,
} from '@vega-ui/react';
import { ChevronRightIcon, FileTextIcon } from '@vega-ui/icons';

interface MyContextMenuProps extends ContextMenuProps {
  trigger: ReactNode
  label: string
}

export function MyContextMenu({ trigger, label, children, ...props }: MyContextMenuProps) {
  return (
    <ContextMenu {...props}>
      <ContextMenuTrigger asChild>{trigger}</ContextMenuTrigger>
      <MenuContent aria-label={label}>{children}</MenuContent>
    </ContextMenu>
  );
}

interface MyMenuSubmenuProps extends MenuSubmenuProps {
  summary: ReactNode
}

export function MyMenuSubmenu({ summary, children, ...props }: MyMenuSubmenuProps) {
  return (
    <MenuSubmenu {...props}>
      <MenuSubmenuTrigger>
        {summary}
        <Icon size='xs' style={{ marginInlineStart: 'auto', color: 'var(--label-secondary)' }}><ChevronRightIcon /></Icon>
      </MenuSubmenuTrigger>
      <MenuContent>{children}</MenuContent>
    </MenuSubmenu>
  );
}

const muted: CSSProperties = { color: 'var(--label-secondary)' };

export default function Recipe() {
  const [status, setStatus] = useState('Edited 2 hours ago');

  const card = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-6)',
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: 360,
        padding: 'var(--spacing-6) var(--spacing-8)',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      <Icon size='lg' style={muted}><FileTextIcon /></Icon>
      <div style={{ display: 'grid', minWidth: 0 }}>
        <Text size={3} fontWeight={500}>Q3 report.pdf</Text>
        <Text size={2} role='status' style={muted}>{status}</Text>
      </div>
    </div>
  );

  return (
    <MyContextMenu trigger={card} label='Q3 report.pdf' size='sm'>
      <MenuItem onClick={() => setStatus('Opened in a new tab')}>Open</MenuItem>
      <MenuItem onClick={() => setStatus('Renamed just now')}>Rename</MenuItem>
      <MyMenuSubmenu summary='Share'>
        <MenuItem onClick={() => setStatus('Link copied')}>Copy link</MenuItem>
        <MenuItem onClick={() => setStatus('Sent by email')}>Email</MenuItem>
      </MyMenuSubmenu>
      <Separator />
      <MenuItem style={{ color: 'var(--color-error)' }} onClick={() => setStatus('Moved to trash')}>Delete</MenuItem>
    </MyContextMenu>
  );
}
