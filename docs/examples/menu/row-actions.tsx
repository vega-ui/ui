import { useState } from 'react';
import { Icon, IconButton, Menu, MenuContent, MenuItem, MenuTrigger, Separator, Text } from '@vega-ui/react';
import { EllipsisIcon } from '@vega-ui/icons';

export default function RowActions() {
  const [status, setStatus] = useState('Edited 2 hours ago');

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--spacing-6)',
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: 420,
        padding: 'var(--spacing-6) var(--spacing-6) var(--spacing-6) var(--spacing-8)',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      <div style={{ display: 'grid', minWidth: 0 }}>
        <Text size={3} fontWeight={500}>Q3 report.pdf</Text>
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{status}</Text>
      </div>
      <Menu placement='bottom-end' size='sm'>
        <MenuTrigger asChild>
          <IconButton size='sm' aria-label='Actions for Q3 report.pdf' variant='secondary' appearance='ghost' style={{ flexShrink: 0 }}>
            <Icon><EllipsisIcon /></Icon>
          </IconButton>
        </MenuTrigger>
        <MenuContent>
          <MenuItem onClick={() => setStatus('Renamed just now')}>Rename</MenuItem>
          <MenuItem onClick={() => setStatus('Copy saved as Q3 report (1).pdf')}>Duplicate</MenuItem>
          <MenuItem onClick={() => setStatus('Download started')}>Download</MenuItem>
          <Separator />
          <MenuItem style={{ color: 'var(--color-error)' }} onClick={() => setStatus('Moved to trash')}>Move to trash</MenuItem>
        </MenuContent>
      </Menu>
    </div>
  );
}
