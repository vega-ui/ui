import type { CSSProperties } from 'react';
import {
  Alert,
  AlertContent,
  AlertIcon,
  AlertMain,
  AlertTitle,
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

const destructive = {
  '--button-background-color': 'var(--color-red-accent-500)',
  '--button-background-color-hover': 'var(--color-red-accent-600)',
  '--button-background-color-active': 'var(--color-red-accent-700)',
} as CSSProperties;

export default function DeleteDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Delete project</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby='delete-project-title' aria-describedby='delete-project-warning' style={{ maxWidth: 460 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id='delete-project-title' as='h2' size={4} fontWeight={600}>Delete “Mobile app”?</Heading>
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
        <Text size={3} asChild>
          <p style={{ marginBlock: 'var(--spacing-4) var(--spacing-8)', color: 'var(--label-secondary)' }}>The project, its 14 environments and all deployment history will be removed.</p>
        </Text>
        <Alert id='delete-project-warning' variant='warning'>
          <AlertIcon />
          <AlertMain>
            <AlertTitle>3 services still use this project</AlertTitle>
            <AlertContent>Billing API, Notifications and Search will stop receiving configuration updates.</AlertContent>
          </AlertMain>
        </Alert>
        <form method='dialog' style={{ display: 'flex', gap: 'var(--spacing-4)', justifyContent: 'flex-end', marginBlockStart: 'var(--spacing-12)' }}>
          <Button type='submit' variant='secondary' appearance='ghost'>Cancel</Button>
          <Button type='submit' style={destructive}>Delete project</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
