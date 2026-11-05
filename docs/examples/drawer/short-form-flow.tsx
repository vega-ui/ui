import { useId, useState, type CSSProperties, type FormEvent } from 'react';
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  Heading,
  HelperText,
  Icon,
  IconButton,
  Label,
  Text,
  TextArea,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

export default function ShortFormFlow() {
  const titleId = useId();
  const emailsId = useId();
  const emailsHintId = useId();
  const messageId = useId();
  const [invited, setInvited] = useState<string[]>([]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    const emails = String(data.get('emails')).split(',').map((email) => email.trim());

    setInvited([...invited, ...emails]);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'center', width: '100%' }}>
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Invite members</Button>
        </DrawerTrigger>
        <DrawerContent aria-labelledby={titleId} style={{ width: 420 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={titleId} as='h2' size={4} fontWeight={600}>Invite members</Heading>
            <DrawerClose asChild>
              <IconButton
                aria-label='Close'
                variant='secondary'
                appearance='ghost'
                style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
              >
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </IconButton>
            </DrawerClose>
          </div>
          <form method='dialog' onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-8)', marginBlockStart: 'var(--spacing-8)' }}>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor={emailsId}>Emails</Label>
              <TextField>
                <TextFieldInput
                  id={emailsId}
                  name='emails'
                  type='email'
                  multiple
                  required
                  autoFocus
                  placeholder='maria@northwind.dev, tom@northwind.dev'
                  aria-describedby={emailsHintId}
                />
              </TextField>
              <HelperText id={emailsHintId}>Separate several addresses with commas.</HelperText>
            </div>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor={messageId}>Personal note (optional)</Label>
              <TextArea id={messageId} name='message' rows={3} fullWidth />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-4)' }}>
              <DrawerClose asChild>
                <Button type='button' variant='secondary' appearance='ghost'>Cancel</Button>
              </DrawerClose>
              <Button type='submit'>Send invites</Button>
            </div>
          </form>
        </DrawerContent>
      </Drawer>
      <Text size={2} style={{ minHeight: '1lh', textAlign: 'center', overflowWrap: 'anywhere', color: 'var(--label-secondary)' }}>
        {invited.length > 0 ? `Pending invites: ${invited.join(', ')}` : ''}
      </Text>
    </div>
  );
}
