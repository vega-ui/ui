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
import type { CSSProperties } from 'react';

export default function DescriptiveCopyInADialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Transfer ownership</Button>
      </DialogTrigger>
      <DialogContent
        aria-labelledby='transfer-title'
        aria-describedby='transfer-description'
        style={{ display: 'grid', gap: 'var(--spacing-12)' }}
      >
        <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading as='h2' size={5} id='transfer-title'>Transfer ownership?</Heading>
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
          <Text asChild id='transfer-description' size={3} style={{ '--t-color': 'var(--label-secondary)' } as CSSProperties}>
            <p>
              Dana Novak becomes the owner of the Acme workspace and gets access to billing. You stay an admin
              and can be removed by the new owner.
            </p>
          </Text>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
          <DialogClose asChild>
            <Button variant='secondary' appearance='ghost'>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Transfer</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
