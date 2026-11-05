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

export default function DialogTitleHierarchy() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Review plan change</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby='plan-change-title' style={{ display: 'grid', gap: 'var(--spacing-12)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading as='h2' size={6} id='plan-change-title'>Switch to the Business plan</Heading>
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
        <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
          <section style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
            <Heading as='h3' size={4}>What changes</Heading>
            <Text size={2} style={{ color: 'var(--label-secondary)' }}>SSO, audit log and priority support are enabled immediately.</Text>
          </section>
          <section style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
            <Heading as='h3' size={4}>Billing</Heading>
            <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>You pay a prorated $36.40 today, then $79 per month from April 1.</Text>
          </section>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
          <DialogClose asChild>
            <Button variant='secondary' appearance='ghost'>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Upgrade</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
