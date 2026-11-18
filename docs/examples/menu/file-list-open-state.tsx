import { useState } from 'react';
import { Icon, IconButton, Menu, MenuContent, MenuItem, MenuTrigger, Text } from '@vega-ui/react';
import { EllipsisIcon } from '@vega-ui/icons';

const files = [
  { id: 'brief', name: 'Campaign brief.docx', meta: 'Edited 2 hours ago' },
  { id: 'budget', name: 'Budget 2027.xlsx', meta: 'Edited yesterday' },
  { id: 'deck', name: 'Kickoff deck.key', meta: 'Edited 12 Nov' },
];

export default function FileListOpenState() {
  const [openFile, setOpenFile] = useState<string | null>(null);

  const changeOpen = (id: string, open: boolean) => {
    if (open) {
      setOpenFile(id);
      return;
    }

    setOpenFile((current) => (current === id ? null : current));
  };

  return (
    <ul style={{ display: 'grid', gap: 'var(--spacing-1)', margin: 0, padding: 0, listStyle: 'none', width: '100%', maxWidth: 420 }}>
      {files.map((file) => (
        <li
          key={file.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--spacing-6)',
            padding: 'var(--spacing-4) var(--spacing-4) var(--spacing-4) var(--spacing-8)',
            borderRadius: 'var(--radius-4)',
            background: openFile === file.id ? 'var(--fills-secondary)' : 'transparent',
          }}
        >
          <div style={{ display: 'grid', minWidth: 0 }}>
            <Text size={3} fontWeight={500}>{file.name}</Text>
            <Text size={2} style={{ color: 'var(--label-secondary)' }}>{file.meta}</Text>
          </div>
          <Menu placement='bottom-end' size='sm' open={openFile === file.id} onChangeOpen={(open) => changeOpen(file.id, open)}>
            <MenuTrigger asChild>
              <IconButton size='sm' aria-label={`Actions for ${file.name}`} variant='secondary' appearance='ghost' style={{ flexShrink: 0 }}>
                <Icon><EllipsisIcon /></Icon>
              </IconButton>
            </MenuTrigger>
            <MenuContent>
              <MenuItem>Open</MenuItem>
              <MenuItem>Share</MenuItem>
              <MenuItem>Download</MenuItem>
            </MenuContent>
          </Menu>
        </li>
      ))}
    </ul>
  );
}
