import { useId, type CSSProperties, type ReactNode } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  Text,
  type DialogProps,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

interface MyDialogProps extends DialogProps {
  trigger: ReactNode
  title: ReactNode
  closeLabel: string
}

export function MyDialog({ trigger, title, closeLabel, children, ...props }: MyDialogProps) {
  const titleId = useId();

  return (
    <Dialog {...props}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent aria-labelledby={titleId}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>{title}</Heading>
          <DialogClose asChild>
            <Button
              square
              aria-label={closeLabel}
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--button-height': '24px', '--button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </Button>
          </DialogClose>
        </div>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default function Recipe() {
  return (
    <MyDialog
      trigger={<Button variant='secondary' appearance='ghost'>Remove Maria Chen</Button>}
      title='Remove Maria Chen?'
      closeLabel='Close'
    >
      <Text size={3} style={{ display: 'block', marginBlockStart: 'var(--spacing-4)', color: 'var(--label-secondary)' }}>
        She will lose access to the Design workspace and its 6 projects.
      </Text>
      <form method='dialog' style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-12)' }}>
        <Button type='submit' value='cancel' variant='secondary' appearance='ghost'>Cancel</Button>
        <Button type='submit' value='remove'>Remove</Button>
      </form>
    </MyDialog>
  );
}
