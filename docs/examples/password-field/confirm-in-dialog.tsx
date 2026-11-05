import type { CSSProperties, FormEvent } from 'react';
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
  PasswordField,
  PasswordFieldHiddenIcon,
  PasswordFieldInput,
  PasswordFieldShownIcon,
  PasswordFieldToggleIconButton,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';
import { useId, useState } from 'react';

export default function ConfirmInDialog() {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  const changeOpen = (next: boolean) => {
    setOpen(next);
    setError('');
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const password = String(new FormData(event.currentTarget).get('password'));
    if (password !== 'vega-demo') {
      setError('Wrong password. Hint: vega-demo');
      return;
    }

    setStatus('Recovery codes regenerated.');
    changeOpen(false);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'center', width: '100%' }}>
      <Dialog open={open} onChangeOpen={changeOpen}>
        <DialogTrigger asChild>
          <Button variant='secondary' appearance='ghost'>Regenerate recovery codes</Button>
        </DialogTrigger>
        <DialogContent aria-labelledby={`${id}-title`} aria-describedby={`${id}-text`} style={{ width: 'min(400px, 100%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={`${id}-title`} as='h2' size={4} fontWeight={600}>Confirm it’s you</Heading>
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
          <Text id={`${id}-text`} size={3} style={{ color: 'var(--label-secondary)', marginBlockStart: 'var(--spacing-2)' }}>
            Old recovery codes stop working right away.
          </Text>
          <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', marginBlockStart: 'var(--spacing-8)' }}>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor={`${id}-password`}>Password</Label>
              <PasswordField error={error !== ''}>
                <PasswordFieldInput
                  id={`${id}-password`}
                  name='password'
                  autoComplete='current-password'
                  required
                  autoFocus
                  aria-invalid={error !== ''}
                  aria-describedby={`${id}-error`}
                />
                <PasswordFieldToggleIconButton aria-label='Show password'>
                  <PasswordFieldShownIcon />
                  <PasswordFieldHiddenIcon />
                </PasswordFieldToggleIconButton>
              </PasswordField>
              <HelperText id={`${id}-error`} error>{error}</HelperText>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
              <DialogClose asChild>
                <Button type='button' variant='secondary' appearance='ghost'>Cancel</Button>
              </DialogClose>
              <Button type='submit'>Confirm</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <Text size={2} role='status' style={{ color: 'var(--label-secondary)', textAlign: 'center' }}>{status}</Text>
    </div>
  );
}
