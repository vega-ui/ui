import { useId, useState, type FormEvent } from 'react';
import {
  Button,
  HelperText,
  Icon,
  IconButton,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { LinkIcon } from '@vega-ui/icons';

const parseUrl = (value: string) => {
  const withProtocol = /^[a-z]+:\/\//i.test(value) ? value : `https://${value}`;

  try {
    const url = new URL(withProtocol);
    if (!url.hostname.includes('.')) return null;
    return url.href;
  } catch {
    return null;
  }
};

export default function LinkError() {
  const fieldId = useId();
  const errorId = useId();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [href, setHref] = useState('');

  const changeOpen = (next: boolean) => {
    setError('');
    setOpen(next);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = parseUrl(String(new FormData(event.currentTarget).get('url')).trim());

    if (!url) {
      setError('Enter a full address, for example northwind.dev/pricing.');
      return;
    }
    setHref(url);
    setOpen(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-6)',
        boxSizing: 'border-box',
        width: '100%',
        padding: 'var(--spacing-4)',
        paddingInlineEnd: 'var(--spacing-8)',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      <Popover role='dialog' placement='bottom-start' open={open} onChangeOpen={changeOpen}>
        <PopoverTrigger asChild>
          <IconButton aria-label='Insert link' variant='secondary' appearance='ghost' style={{ flexShrink: 0 }}>
            <Icon><LinkIcon /></Icon>
          </IconButton>
        </PopoverTrigger>
        <PopoverContent aria-label='Insert link'>
          <form noValidate onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-3)', width: 280 }}>
            <Label htmlFor={fieldId}>Link address</Label>
            <TextField size='sm' error={error !== ''}>
              <TextFieldInput
                id={fieldId}
                name='url'
                inputMode='url'
                defaultValue='northwind'
                autoFocus
                aria-invalid={error !== ''}
                aria-describedby={error ? errorId : undefined}
                onChange={() => setError('')}
              />
            </TextField>
            {error && <HelperText id={errorId} error size='sm'>{error}</HelperText>}
            <Button type='submit' size='sm' style={{ justifySelf: 'end', marginBlockStart: 'var(--spacing-5)' }}>Insert</Button>
          </form>
        </PopoverContent>
      </Popover>
      <Text size={2} style={{ minWidth: 0, color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>{href ? `Linked to ${href}` : 'No link yet'}</Text>
    </div>
  );
}
