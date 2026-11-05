import { useId, useState, type CSSProperties } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  IconButton,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

export default function CloseWithHandler() {
  const titleId = useId();
  const [reminder, setReminder] = useState('');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'center', width: '100%' }}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='secondary' appearance='ghost'>What’s new in 3.0</Button>
        </DialogTrigger>
        <DialogContent aria-labelledby={titleId}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={titleId} as='h2' size={4} fontWeight={600}>What’s new in 3.0</Heading>
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
          <Text size={3} style={{ display: 'block', marginBlockStart: 'var(--spacing-4)', color: 'var(--label-secondary)' }}>
            Overlays now use the native dialog and popover elements, and the sheet follows your finger without re-rendering.
          </Text>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-12)' }}>
            <DialogClose asChild onClick={() => setReminder('We will remind you tomorrow.')}>
              <Button variant='secondary' appearance='ghost'>Remind me later</Button>
            </DialogClose>
            <DialogClose asChild onClick={() => setReminder('')}>
              <Button>Got it</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
      <Text size={2} style={{ color: 'var(--label-secondary)', minHeight: '1lh' }}>{reminder}</Text>
    </div>
  );
}
