import type { CSSProperties } from 'react';
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
import { KeyboardIcon, XIcon } from '@vega-ui/icons';

export default function PolymorphicTrigger() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <IconButton variant='secondary' appearance='ghost' aria-label='Keyboard shortcuts'>
          <Icon><KeyboardIcon /></Icon>
        </IconButton>
      </DialogTrigger>
      <DialogContent aria-labelledby='shortcuts-title'>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id='shortcuts-title' as='h2' size={4} fontWeight={600}>Keyboard shortcuts</Heading>
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
        <Text size={3}>Ctrl+K opens search, Ctrl+/ toggles the sidebar.</Text>
        <DialogClose asChild>
          <Button style={{ marginBlockStart: 'var(--spacing-12)' }}>Got it</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
