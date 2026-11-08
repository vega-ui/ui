import { useId, type CSSProperties } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  IconButton,
  Label,
  TextArea,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const fullScreen = { width: '100%', maxWidth: 'none', height: '100%', maxHeight: 'none', margin: 0, overflow: 'auto', borderRadius: 0 } as CSSProperties;

export default function FullScreenDialog() {
  const titleId = useId();
  const subjectId = useId();
  const bodyId = useId();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Compose message</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby={titleId} style={fullScreen}>
        <div style={{ display: 'grid', maxWidth: 720, marginInline: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={titleId} as='h2' size={4} fontWeight={600}>New message to the design team</Heading>
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
          <form method='dialog' style={{ display: 'grid', gap: 'var(--spacing-8)', marginBlockStart: 'var(--spacing-8)' }}>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor={subjectId}>Subject</Label>
              <TextField>
                <TextFieldInput id={subjectId} name='subject' required autoFocus />
              </TextField>
            </div>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor={bodyId}>Message</Label>
              <TextArea id={bodyId} name='body' rows={12} fullWidth required />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBlockStart: 'var(--spacing-4)' }}>
              <Button type='submit'>Send</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
