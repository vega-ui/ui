import { useId, useState, type CSSProperties, type FormEvent } from 'react';
import {
  Button,
  Heading,
  Icon,
  IconButton,
  Label,
  Sheet,
  SheetClose,
  SheetContent,
  SheetHandle,
  SheetTrigger,
  Text,
  TextArea,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

export default function SheetWithFormContent() {
  const titleId = useId();
  const tipId = useId();
  const noteId = useId();
  const [summary, setSummary] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    const note = String(data.get('note')).trim();

    setSummary(`Tip $${data.get('tip')}${note ? ` · “${note}”` : ''}`);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'center', width: '100%' }}>
      <Sheet>
        <SheetTrigger asChild>
          <Button>Rate your courier</Button>
        </SheetTrigger>
        <SheetContent aria-labelledby={titleId}>
          <SheetHandle aria-label='Resize sheet' />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={titleId} as='h2' size={4} fontWeight={600}>How was your delivery?</Heading>
            <SheetClose asChild>
              <IconButton
                aria-label='Close'
                variant='secondary'
                appearance='ghost'
                style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
              >
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </IconButton>
            </SheetClose>
          </div>
          <form method='dialog' onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor={tipId}>Tip for Daniel, $</Label>
              <TextField>
                <TextFieldInput id={tipId} name='tip' type='number' inputMode='decimal' min={0} max={50} step={0.5} defaultValue={2} required />
              </TextField>
            </div>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor={noteId}>Note (optional)</Label>
              <TextArea id={noteId} name='note' rows={3} maxLength={200} fullWidth />
            </div>
            <Button type='submit' style={{ marginBlockStart: 'var(--spacing-4)' }}>Send</Button>
          </form>
        </SheetContent>
      </Sheet>
      <Text size={2} style={{ minHeight: '1lh', textAlign: 'center', overflowWrap: 'anywhere', color: 'var(--label-secondary)' }}>{summary ? `Sent: ${summary}` : ''}</Text>
    </div>
  );
}
