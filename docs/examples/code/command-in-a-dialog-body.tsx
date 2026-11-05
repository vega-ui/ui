import {
  Button,
  Code,
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

export default function CommandInADialogBody() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Connect the CLI</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby='connect-cli-title' style={{ display: 'grid', gap: 'var(--spacing-12)' }}>
        <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading as='h2' size={5} id='connect-cli-title'>Connect the CLI</Heading>
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
          <Text asChild size={3}>
            <p>
              Run <Code>vega login</Code>, then link this project with <Code>vega link --project web-app</Code>.
            </p>
          </Text>
          <Text asChild size={2} style={{ color: 'var(--label-secondary)' }}>
            <p>
              The token is stored in <Code size={2}>~/.vega/credentials</Code> and expires after 30 days.
            </p>
          </Text>
        </div>
        <DialogClose asChild>
          <Button style={{ justifySelf: 'end' }}>Done</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
