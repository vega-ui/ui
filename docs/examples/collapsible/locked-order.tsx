import { useState } from 'react';
import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Label,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';

export default function LockedOrder() {
  const [locked, setLocked] = useState(true);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: 420 }}>
      <div style={{ display: 'flex', gap: 'var(--spacing-6)', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text size={3} fontWeight={500}>Order #10482</Text>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setLocked(!locked)}>
          {locked ? 'Unlock order' : 'Lock order'}
        </Button>
      </div>
      <fieldset disabled={locked} aria-describedby='order-lock-reason' style={{ border: 0, margin: 0, padding: 0, display: 'grid', gap: 'var(--spacing-6)' }}>
        <Text id='order-lock-reason' size={2} style={{ color: 'var(--label-secondary)' }}>
          {locked ? 'The order has shipped. Unlock it to change the delivery notes.' : 'Delivery notes can be edited.'}
        </Text>
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button size='sm' variant='secondary' appearance='ghost' style={{ justifySelf: 'start' }}>Delivery notes</Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor='order-notes'>Notes for the courier</Label>
              <TextField>
                <TextFieldInput id='order-notes' defaultValue='Leave at the reception desk' />
              </TextField>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </fieldset>
    </div>
  );
}
