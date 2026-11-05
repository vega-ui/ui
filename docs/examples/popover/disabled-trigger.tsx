import { useId, useState } from 'react';
import {
  Button,
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
  HelperText,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';

const actions = ['Download', 'Move to archive', 'Share'];

const files = ['Contract – Kestrel Robotics.pdf', 'Invoice INV-2041.pdf', 'Brand guidelines.fig'];

export default function DisabledTrigger() {
  const hintId = useId();
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');

  const toggle = (file: string, checked: boolean) => {
    if (checked) {
      setSelected([...selected, file]);
      return;
    }
    setSelected(selected.filter((item) => item !== file));
  };

  const run = (action: string) => {
    setStatus(`${action}: ${selected.length} file(s)`);
    setOpen(false);
  };

  const none = selected.length === 0;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <div
        style={{
          display: 'grid',
          gap: 'var(--spacing-6)',
          padding: 'var(--spacing-8)',
          background: 'var(--surface-primary)',
          border: '1px solid var(--separator-opaque)',
          borderRadius: 'var(--radius-5)',
        }}
      >
        {files.map((file) => (
          <Checkbox key={file} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', minWidth: 0 }}>
            <CheckboxInput checked={selected.includes(file)} onChange={(event) => toggle(file, event.currentTarget.checked)} />
            <CheckboxIndicator>
              <CheckboxCheckedIcon />
              <CheckboxIndeterminateIcon />
            </CheckboxIndicator>
            <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file}</span>
          </Checkbox>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <Popover placement='bottom-start' open={open} onChangeOpen={setOpen}>
          <PopoverTrigger asChild>
            <Button variant='secondary' appearance='ghost' disabled={none} aria-describedby={none ? hintId : undefined} style={{ flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>
              {none ? 'Bulk actions' : `Bulk actions (${selected.length})`}
            </Button>
          </PopoverTrigger>
          <PopoverContent style={{ padding: 'var(--spacing-2)' }}>
            <div role='group' aria-label='Bulk actions' style={{ display: 'grid', minWidth: 180 }}>
              {actions.map((action) => (
                <Button key={action} variant='secondary' appearance='transparent' style={{ justifyContent: 'flex-start' }} onClick={() => run(action)}>
                  {action}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        {none && <HelperText id={hintId}>Select at least one file.</HelperText>}
        {!none && <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{status}</Text>}
      </div>
    </div>
  );
}
