import { HelperText, Icon, IconButton } from '@vega-ui/react';
import { FileTextIcon, Trash2Icon } from '@vega-ui/icons';
import { useState } from 'react';

const initialFiles = [
  { name: 'contract-signed.pdf', locked: true },
  { name: 'brief-v3.docx', locked: false },
  { name: 'moodboard.png', locked: false },
];

export default function FailedRemoveAction() {
  const [files, setFiles] = useState(initialFiles);
  const [error, setError] = useState('');

  const remove = (name: string, locked: boolean) => {
    if (locked) {
      setError(name);
      return;
    }

    setError('');
    setFiles(files.filter((file) => file.name !== name));
  };

  return (
    <ul
      style={{
        display: 'flex',
        flexDirection: 'column',
        margin: 0,
        padding: 'var(--spacing-2) var(--spacing-6)',
        listStyle: 'none',
        width: '100%',
        boxSizing: 'border-box',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
        background: 'var(--surface-primary)',
      }}
    >
      {files.map((file, index) => {
        const failed = error === file.name;
        const errorId = `remove-error-${file.name}`;

        return (
          <li
            key={file.name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-1)',
              paddingBlock: 'var(--spacing-3)',
              borderBlockStart: index === 0 ? undefined : '1px solid var(--separator-opaque)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
              <Icon size='sm' style={{ flexShrink: 0, color: 'var(--label-secondary)' }}><FileTextIcon /></Icon>
              <span style={{ flex: 1, minWidth: 0, overflowWrap: 'anywhere' }}>{file.name}</span>
              <IconButton
                type='button'
                size='sm'
                variant='secondary'
                appearance='transparent'
                aria-label={`Remove ${file.name}`}
                aria-describedby={failed ? errorId : undefined}
                onClick={() => remove(file.name, file.locked)}
              >
                <Icon><Trash2Icon /></Icon>
              </IconButton>
            </div>
            {failed && (
              <HelperText id={errorId} error role='alert' style={{ paddingInlineStart: 'calc(var(--spacing-8) + var(--spacing-4))', paddingBlockEnd: 'var(--spacing-2)' }}>
                Signed contracts cannot be removed. Ask an admin to archive it instead.
              </HelperText>
            )}
          </li>
        );
      })}
    </ul>
  );
}
