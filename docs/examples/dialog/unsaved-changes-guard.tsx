import { useId, useState, type CSSProperties } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  HelperText,
  Icon,
  IconButton,
  Label,
  Text,
  TextArea,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

export default function UnsavedChangesGuard() {
  const titleId = useId();
  const fieldId = useId();
  const warningId = useId();
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState('Call back after the Friday standup.');
  const [draft, setDraft] = useState(saved);
  const [confirming, setConfirming] = useState(false);

  const dirty = draft !== saved;

  const changeOpen = (next: boolean) => {
    if (next) {
      setDraft(saved);
      setConfirming(false);
      setOpen(true);
      return;
    }
    if (dirty && !confirming) {
      setConfirming(true);
      return;
    }
    setOpen(false);
  };

  const save = () => {
    setSaved(draft);
    setOpen(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--spacing-6)',
        boxSizing: 'border-box',
        width: '100%',
        padding: 'var(--spacing-8)',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      <div style={{ display: 'grid', minWidth: 0 }}>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>Note for Maria Chen</Text>
        <Text size={3} style={{ overflowWrap: 'anywhere' }}>{saved}</Text>
      </div>
      <Dialog open={open} onChangeOpen={changeOpen}>
        <DialogTrigger asChild>
          <Button size='sm' variant='secondary' appearance='ghost'>Edit</Button>
        </DialogTrigger>
        <DialogContent aria-labelledby={titleId}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={titleId} as='h2' size={4} fontWeight={600}>Note for Maria Chen</Heading>
            <DialogClose asChild>
              <IconButton
                aria-label='Close'
                variant='secondary'
                appearance='ghost'
                style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
              >
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </IconButton>
            </DialogClose>
          </div>
          <div style={{ display: 'grid', gap: 'var(--spacing-3)', marginBlockStart: 'var(--spacing-8)' }}>
            <Label htmlFor={fieldId}>Note</Label>
            <TextArea
              id={fieldId}
              rows={4}
              fullWidth
              value={draft}
              aria-describedby={confirming ? warningId : undefined}
              onChange={(event) => {
                setDraft(event.currentTarget.value);
                setConfirming(false);
              }}
            />
            {confirming && (
              <HelperText id={warningId} role='status'>You have unsaved changes. Close again to discard them.</HelperText>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-12)' }}>
            <DialogClose asChild>
              <Button variant='secondary' appearance='ghost'>{confirming ? 'Discard' : 'Cancel'}</Button>
            </DialogClose>
            <Button disabled={!dirty} onClick={save}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
