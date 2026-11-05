import { useId, useState, type CSSProperties, type FormEvent } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  HelperText,
  Icon,
  IconButton,
  Label,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const takenEmails = ['ada@northwind.dev', 'grace@northwind.dev'];

const checkEmail = (email: string) => new Promise<boolean>((resolve) => {
  setTimeout(() => resolve(!takenEmails.includes(email.toLowerCase())), 600);
});

export default function ServerValidationError() {
  const titleId = useId();
  const emailId = useId();
  const errorId = useId();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('linus@northwind.dev');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  const changeOpen = (next: boolean) => {
    setError('');
    setOpen(next);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = String(new FormData(event.currentTarget).get('email'));

    setPending(true);
    const available = await checkEmail(next);
    setPending(false);

    if (!available) {
      setError(`${next} already belongs to another account.`);
      return;
    }
    setEmail(next);
    setOpen(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--spacing-6)',
        boxSizing: 'border-box',
        width: '100%',
        padding: 'var(--spacing-8)',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      <div style={{ display: 'grid', minWidth: 0 }}>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>Sign-in email</Text>
        <Text size={3} fontWeight={500} style={{ overflowWrap: 'anywhere' }}>{email}</Text>
      </div>
      <Dialog open={open} onChangeOpen={changeOpen}>
        <DialogTrigger asChild>
          <Button size='sm' variant='secondary' appearance='ghost'>Change</Button>
        </DialogTrigger>
        <DialogContent aria-labelledby={titleId}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={titleId} as='h2' size={4} fontWeight={600}>Change sign-in email</Heading>
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
          <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-3)', marginBlockStart: 'var(--spacing-8)' }}>
            <Label htmlFor={emailId}>New email</Label>
            <TextField error={error !== ''}>
              <TextFieldInput
                id={emailId}
                name='email'
                type='email'
                defaultValue='grace@northwind.dev'
                required
                aria-invalid={error !== ''}
                aria-describedby={error ? errorId : undefined}
                onChange={() => setError('')}
              />
            </TextField>
            {error && <HelperText id={errorId} error>{error}</HelperText>}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-9)' }}>
              <DialogClose asChild>
                <Button type='button' variant='secondary' appearance='ghost'>Cancel</Button>
              </DialogClose>
              <Button type='submit' disabled={pending} style={{ minWidth: '11ch' }}>{pending ? 'Checking…' : 'Save email'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
