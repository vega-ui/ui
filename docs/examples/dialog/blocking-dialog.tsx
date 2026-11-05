import { useId, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  Heading,
  Text,
} from '@vega-ui/react';

export default function BlockingDialog() {
  const titleId = useId();
  const descriptionId = useId();
  const [choice, setChoice] = useState('');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'center', width: '100%' }}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='secondary' appearance='ghost'>Simulate session timeout</Button>
        </DialogTrigger>
        <DialogContent
          closedBy='none'
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          onClose={(event) => setChoice(event.currentTarget.returnValue)}
        >
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Your session is about to expire</Heading>
          <Text id={descriptionId} size={3} style={{ display: 'block', marginBlockStart: 'var(--spacing-4)', color: 'var(--label-secondary)' }}>
            You have been inactive for 25 minutes. Unsaved changes in the editor will be lost when you sign out.
          </Text>
          <form method='dialog' style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-12)' }}>
            <Button type='submit' value='sign-out' variant='secondary' appearance='ghost'>Sign out</Button>
            <Button type='submit' value='stay' autoFocus>Stay signed in</Button>
          </form>
        </DialogContent>
      </Dialog>
      <Text size={2} style={{ color: 'var(--label-secondary)', minHeight: '1lh' }}>{choice ? `returnValue: ${choice}` : ''}</Text>
    </div>
  );
}
