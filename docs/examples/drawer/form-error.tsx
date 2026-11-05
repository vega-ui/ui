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
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const isValidIban = (value: string) => {
  const iban = value.replace(/\s/g, '').toUpperCase();
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(iban)) return false;

  const rearranged = iban.slice(4) + iban.slice(0, 4);
  const digits = rearranged.replace(/[A-Z]/g, (letter) => String(letter.charCodeAt(0) - 55));
  let remainder = 0;

  for (const digit of digits) {
    remainder = (remainder * 10 + Number(digit)) % 97;
  }

  return remainder === 1;
};

export default function FormError() {
  const titleId = useId();
  const ibanId = useId();
  const errorId = useId();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [payout, setPayout] = useState('Not set');

  const changeOpen = (next: boolean) => {
    setError('');
    setOpen(next);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const iban = String(new FormData(event.currentTarget).get('iban'));

    if (!isValidIban(iban)) {
      setError('This IBAN is not valid. Check the country code and the digits.');
      return;
    }
    setPayout(iban);
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
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>Payout account</Text>
        <Text size={3} fontWeight={500} style={{ fontVariantNumeric: 'tabular-nums', overflowWrap: 'anywhere' }}>{payout}</Text>
      </div>
      <Drawer open={open} onChangeOpen={changeOpen}>
        <DrawerTrigger asChild>
          <Button size='sm' variant='secondary' appearance='ghost'>Edit</Button>
        </DrawerTrigger>
        <DrawerContent aria-labelledby={titleId} style={{ width: 420 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={titleId} as='h2' size={4} fontWeight={600}>Payout account</Heading>
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
          <form noValidate onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-3)', marginBlockStart: 'var(--spacing-8)' }}>
            <Label htmlFor={ibanId}>IBAN</Label>
            <TextField error={error !== ''}>
              <TextFieldInput
                id={ibanId}
                name='iban'
                defaultValue='DE89 3704 0044 0532 0130 01'
                autoComplete='off'
                aria-invalid={error !== ''}
                aria-describedby={error ? errorId : undefined}
                onChange={() => setError('')}
              />
            </TextField>
            {error && <HelperText id={errorId} error>{error}</HelperText>}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-9)' }}>
              <DrawerClose asChild>
                <Button type='button' variant='secondary' appearance='ghost'>Cancel</Button>
              </DrawerClose>
              <Button type='submit'>Save</Button>
            </div>
          </form>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
