import type { CSSProperties } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const compact = { flexShrink: 0, '--button-height': '24px', '--button-br-ratio': 0.5 } as CSSProperties;

export default function SquareCloseButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary' appearance='ghost'>What’s new</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby='whats-new-title'>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id='whats-new-title' as='h2' size={4} fontWeight={600}>What’s new in 2.4</Heading>
          <DialogClose asChild>
            <Button square aria-label='Close' variant='secondary' appearance='ghost' style={compact}>
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </Button>
          </DialogClose>
        </div>
        <Text size={3}>
          Shared libraries, faster exports, and a new dark theme. Press Escape or the cross to return to your work.
        </Text>
      </DialogContent>
    </Dialog>
  );
}
