import { useId, useState } from 'react';
import {
  Button,
  Heading,
  Sheet,
  SheetContent,
  SheetTrigger,
  Text,
} from '@vega-ui/react';

export default function BlockingStepSheet() {
  const titleId = useId();
  const descriptionId = useId();
  const [answer, setAnswer] = useState('');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'center', width: '100%' }}>
      <Sheet>
        <SheetTrigger asChild>
          <Button>Place order</Button>
        </SheetTrigger>
        <SheetContent
          closedBy='none'
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          onClose={(event) => setAnswer(event.currentTarget.returnValue)}
        >
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Allow substitutions?</Heading>
          <Text id={descriptionId} size={3} style={{ color: 'var(--label-secondary)' }}>
            If an item is out of stock, the store can replace it with a similar one. You can change this later in settings.
          </Text>
          <form method='dialog' style={{ display: 'grid', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-6)' }}>
            <Button type='submit' value='allow'>Allow substitutions</Button>
            <Button type='submit' value='refund' variant='secondary' appearance='ghost'>Refund missing items</Button>
          </form>
        </SheetContent>
      </Sheet>
      <Text size={2} style={{ color: 'var(--label-secondary)', minHeight: '1lh' }}>{answer ? `returnValue: ${answer}` : ''}</Text>
    </div>
  );
}
