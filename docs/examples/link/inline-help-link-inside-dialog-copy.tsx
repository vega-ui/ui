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
  Link,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

export default function InlineHelpLinkInsideDialogCopy() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Publish site</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby='publish-title' aria-describedby='publish-description'>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id='publish-title' as='h2' size={4} fontWeight={600}>Publish to acme.design?</Heading>
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
        <Text id='publish-description' size={3}>
          Everyone with the address can see the site. Review the{' '}
          <Link href='/docs/publishing-policy'>publishing policy</Link>{' '}
          if the site contains customer data.
        </Text>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-12)' }}>
          <DialogClose asChild>
            <Button variant='secondary' appearance='ghost'>Not now</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Publish</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
